import db from '../../config/database'
import bcrypt from 'bcrypt'
import _ from 'lodash'

import { IUser } from '../../@types'
export { IUser } from '../../@types'

import Transaction from './Transaction'

const Users = () => db<User>('users')

export default class User implements IUser
{
    id: number | undefined;
    password: string;
    email: string;
    created_at: Date;
    updated_at: Date;
    balance: number;

    constructor()
    {
        this.id = undefined
        this.password = ''
        this.email = ''
        this.created_at = new Date()
        this.updated_at = new Date()
        this.balance = 0
    }  

    private static afterLoad(data : any) : any {
        if (data)
            data.balance = parseFloat(data.balance)
            
        return data
    }

    static async findById(id : number) : Promise<User | undefined> {
        const userData = await Users().where('id', id).first()
        return userData ? Object.assign(new User(), this.afterLoad(userData)) : undefined
    }

    static async findByEmail(email : string) : Promise<User | undefined> {
        try { 
            const userData = await Users().where('email', email).first()
            return Object.assign(new User(), this.afterLoad(userData))
        }
        catch (e)
        {
            console.error(e)
            return undefined
        }
    }

    setPassword(password : string)
    {
        this.password = bcrypt.hashSync(password, 12)
    }

    validPassword(password : string) : boolean
    {
        return bcrypt.compareSync(password, this.password);
    } 

    async save() : Promise<number | undefined> {
        try {
            this.id = await Users()
                        .returning('id')
                        .insert(_.omit(this, ['id']))
        }
        catch (e)
        {
            console.error(e)
        } 

        return this.id
    }

    async topup(amount : number) : Promise<number | undefined>
    {
        // can't transact on new records
        if (!this.id)
            return undefined

        await db.transaction(async (trx) => {

            try {

                // lock record in transaction
                const self = Object.assign(new User(), User.afterLoad(await Users().transacting(trx).forUpdate().where('id', this.id).first()))
                if (!self)
                    return false

                // *1 forces conversion to int, there is a bug in TS that concatenates strings instead
                this.balance = (self.balance * 1 + amount * 1)

                await Users().transacting(trx).where('id', this.id).increment('balance', amount)
                
                const balanceTrx = new Transaction()
                balanceTrx.amount = amount
                balanceTrx.dst_user_id = this.id as number

                await balanceTrx.save(trx)
            }
            catch (e)
            {
                console.error(e)
                this.balance -= amount
                return false
            }
        },
        {
            isolationLevel: 'serializable'
        })

        return this.balance
    }

    async transfer(amount : number, destUserEmail : string) : Promise<number | undefined>
    {
        // can't transact on new records
        if (!this.id)
            return undefined

        await db.transaction(async (trx) => {

            try {

                // can't transact to non existing user
                const recipient = await Users().transacting(trx).forUpdate().where('email', destUserEmail).first()
                if (!recipient)
                {
                    return false
                }

                const self = await Users().transacting(trx).forUpdate().where('id', this.id).first()
                if (!self || self.balance - amount < 0)
                {
                    return false
                }

                // At this point both source and dest records are locked
                // And just in case we're in a serializable transaction
                // We might relax this after some teast to read committed
                
                this.balance -= amount
                await Users().transacting(trx).where('id', recipient.id).increment('balance', amount)
                await Users().transacting(trx).where('id', this.id).decrement('balance', amount)
    
                const balanceTrx = new Transaction()
                balanceTrx.amount = amount
                balanceTrx.src_user_id = this.id as number
                balanceTrx.dst_user_id = recipient.id as number

                await balanceTrx.save(trx)
            }
            catch (e)
            {
                this.balance += amount
                console.error(e)
                return false
            }
        }, {
            isolationLevel: 'serializable'
        })

        return this.balance
    }

}

