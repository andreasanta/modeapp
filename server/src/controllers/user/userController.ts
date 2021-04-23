import { Request, Response } from 'express'
import User from '../../models/user/User'
import Transaction from '../../models/user/Transaction'
import _ from 'lodash'

const getUser = (req: Request, res: Response) => {

    if (!req.isAuthenticated())
        return res.sendStatus(401)

    res.json(_.omit(req.user, ['password']))
}

const topup = async (req: Request, res: Response) => {

    if (!req.isAuthenticated())
        return res.sendStatus(401)

    const newBalance = await (req.user as User).topup(req.body.amount)
    res.json({balance: newBalance})
}

const transfer = async (req: Request, res: Response) => {

    if (!req.isAuthenticated())
        return res.sendStatus(401)

    const newBalance = await (req.user as User).transfer(req.body.amount, req.body.email)
    res.json({balance: newBalance})
}

const transactions = async (req: Request, res: Response) => {

    if (!req.isAuthenticated())
        return res.sendStatus(401)

    const convertedUser = (req.user as User)

    if (convertedUser.id)
        res.json(await Transaction.findByUserId(convertedUser.id))
    else
        res.sendStatus(500)
}

export default {
    getUser,
    topup,
    transfer,
    transactions
}
