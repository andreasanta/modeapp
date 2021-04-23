import db from '../../config/database'
import _ from 'lodash'

import { ITransaction } from '../../@types'
export { ITransaction } from '../../@types'

const Transactions = () => db<Transaction>('transactions')

export default class Transaction implements ITransaction
{
    id: number | undefined
    src_user_id: number | undefined
    dst_user_id: number
    created_at: Date
    amount: number

    constructor()
    {
        this.id = undefined
        this.src_user_id = undefined
        this.dst_user_id = 0
        this.created_at = new Date()
        this.amount = 0
    }  

    private static afterLoad(data : any) : any {

        if (data)
            data.amount = parseFloat(data.amount)
            
        return data
    }

    static async findById(id : number) : Promise<Transaction | undefined> {
        const userData = await Transactions().where('id', id).first()
        return userData ? Object.assign(new Transaction(), this.afterLoad(userData)) : undefined
    }

    static async findByUserId(userId : number) : Promise<Transaction[] | undefined> {
        try { 
            const transactionsList = await Transactions()
                                        .leftJoin('users as us', 'transactions.src_user_id', 'us.id')
                                        .leftJoin('users as ud', 'transactions.dst_user_id', 'ud.id')
                                        .where('transactions.src_user_id', userId).orWhere('transactions.dst_user_id', userId)
                                        .orderBy('transactions.created_at', 'desc')
                                        .select(
                                            'transactions.id',
                                            'us.email as source_email',
                                            'ud.email as destination_email',
                                            'transactions.amount as amount',
                                            'transactions.created_at as created_at'
                                        )

            return transactionsList.map((t : Transaction) => Object.assign(new Transaction(), this.afterLoad(t)))
        }
        catch (e)
        {
            console.error(e)
            return []
        }
    }

    async save(trx : any) : Promise<number | undefined> {
        try {
            this.id = await Transactions()
                        .transacting(trx)
                        .returning('id')
                        .insert(_.omit(this, ['id']))
        }
        catch (e)
        {
            console.error(e)
        } 

        return this.id
    } 

}

