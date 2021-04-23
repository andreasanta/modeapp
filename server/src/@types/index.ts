export interface IUser {
    id: number | undefined
    password: string
    email: string
    created_at: Date
    updated_at: Date
    balance: number
}

export interface ITransaction {
    id: number | undefined
    src_user_id: number | undefined
    dst_user_id: number
    created_at: Date
    amount: number
}
