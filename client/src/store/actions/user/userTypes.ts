import { IUser } from '../../../@types';

export interface ISetUserAction {
    readonly type: 'SET_USER'
    payload: IUser
}

export interface ILogoutAction {
    readonly type: 'LOGOUT'
}

export interface ISetUserLoadingAction {
    readonly type: 'SET_USER_LOADING'
}

export interface ISetUserLoadedAction {
    readonly type: 'SET_USER_LOADED'
}

export interface ISetUserLoadingTransactionsAction {
    readonly type: 'SET_USER_TRANSACTIONS_LOADING'
}

export interface ISetUserErrorAction {
    readonly type: 'SET_USER_ERROR'
}

export interface ISetUserBalanceAction {
    readonly type: 'SET_USER_BALANCE'
    payload: number
}

export interface ISetUserTransactionsAction {
    readonly type: 'SET_USER_TRANSACTIONS'
    payload: any[]
}

export interface ITopupAction {
    readonly type: 'BALANCE_TOPUP'
    payload: number
}

export type UserAction =
    | ISetUserAction
    | ILogoutAction
    | ISetUserLoadingAction
    | ISetUserErrorAction
    | ISetUserBalanceAction
    | ISetUserTransactionsAction
    | ITopupAction
    | ISetUserLoadingTransactionsAction
    | ISetUserLoadedAction
