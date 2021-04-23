import { RootState } from '../../reducers';
import { IUser } from '../../../@types';

export const selectUser = (state: RootState): IUser => ({
    email: state.user.email,
    balance: state.user.balance,
})

export const selectUserIsLoggedIn = (state: RootState) =>
    state.user.isLoggedIn

export const selectUserIsLoading = (state: RootState) =>
    state.user.isLoading

export const selectTransactionsLoading = (state: RootState) =>
    state.user.isLoadingTransactions

export const selectTransactions = (state: RootState) =>
    state.user.transactions
