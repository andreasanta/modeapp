import axios from 'axios';

import { IUser } from '../../../@types';
import {
    ISetUserAction,
    ILogoutAction,
    ISetUserLoadingAction,
    ISetUserErrorAction,
    UserAction,
    ISetUserBalanceAction,
    ISetUserTransactionsAction,
    ISetUserLoadingTransactionsAction,
    ISetUserLoadedAction
} from './userTypes';
import { ThunkAction } from 'redux-thunk';

export const setUser = (user: IUser): ISetUserAction => ({
    type: 'SET_USER',
    payload: user,
});

export const setUserBalance = (balance: number): ISetUserBalanceAction => ({
    type: 'SET_USER_BALANCE',
    payload: balance,
});

export const setTransactions = (transactions: any[]) : ISetUserTransactionsAction => ({
    type: 'SET_USER_TRANSACTIONS',
    payload: transactions
})

export const logout = (): ILogoutAction => ({
    type: 'LOGOUT',
});

export const setUserLoading = (): ISetUserLoadingAction => ({
    type: 'SET_USER_LOADING',
});

export const setUserLoaded = (): ISetUserLoadedAction => ({
    type: 'SET_USER_LOADED',
});

export const setUserTransactionsLoading = (): ISetUserLoadingTransactionsAction => ({
    type: 'SET_USER_TRANSACTIONS_LOADING',
});

export const setUserError = (): ISetUserErrorAction => ({
    type: 'SET_USER_ERROR',
});

export const getUser = (): ThunkAction<
    Promise<UserAction>,
    {},
    {},
    UserAction
> => async (dispatch) => {
    dispatch(setUserLoading())

    try {
        const response = await axios.get('/user')

        const { email, balance } = response.data

        if (
            typeof email === 'string' &&
            typeof balance === 'number'
        ) {
            const user: IUser = {
                email,
                balance
            };

            return dispatch(setUser(user))
        }

        return dispatch(setUserError())
    } catch (error) {
        return dispatch(setUserError())
    }
};

export const loginUser = (emailInput: string, passwordInput: string): ThunkAction<
    Promise<UserAction>,
    {},
    {},
    UserAction
> => async (dispatch) => {
    dispatch(setUserLoading())

    try {
        const response = await axios.post('/auth/login',
        {
            email: emailInput,
            password: passwordInput
        })

        const { email, balance } = response.data;

        if (
            typeof email === 'string' &&
            typeof balance === 'number'
        ) {
            const user: IUser = {
                email,
                balance
            }

            return dispatch(setUser(user))
        }

        return dispatch(setUserError())
    } catch (error) {
        return dispatch(setUserError())
    }
}

export const signupUser = (emailInput: string, passwordInput: string): ThunkAction<
    Promise<UserAction>,
    {},
    {},
    UserAction
> => async (dispatch) => {
    dispatch(setUserLoading())

    try {
        const response = await axios.post('/auth/signup',
        {
            email: emailInput,
            password: passwordInput
        })
        
        return dispatch(setUserLoaded())
    } catch (error) {
        return dispatch(setUserError())
    }
}

export const topupBalance = (amount : number): ThunkAction<
    Promise<UserAction>,
    {},
    {},
    UserAction
> => async (dispatch) => {
    dispatch(setUserLoading())

    try {
        const response = await axios.post('/user/topup',
        {
            amount,
        })

        const { balance } = response.data;

        if (
            typeof balance === 'number'
        ) {

            return dispatch(setUserBalance(balance))
        }

        return dispatch(setUserError())
    } catch (error) {
        return dispatch(setUserError())
    }
}


export const transfer = (email : string, amount : number): ThunkAction<
    Promise<UserAction>,
    {},
    {},
    UserAction
> => async (dispatch) => {
    dispatch(setUserLoading())

    try {
        const response = await axios.post('/user/transfer',
        {
            email,
            amount
        })

        const { balance } = response.data;

        if (
            typeof balance === 'number'
        ) {

            return dispatch(setUserBalance(balance))
        }

        return dispatch(setUserError())
    } catch (error) {
        return dispatch(setUserError())
    }
}

export const getTransactions = (): ThunkAction<
    Promise<UserAction>,
    {},
    {},
    UserAction
> => async (dispatch) => {
    dispatch(setUserTransactionsLoading())

    try {
        const response = await axios.get('/user/transactions')

        return dispatch(setTransactions(response.data))

    } catch (error) {
        return dispatch(setUserError())
    }
}