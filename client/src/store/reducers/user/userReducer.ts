import { UserAction } from '../../actions/user/userTypes';

export interface IUserState {
    email: string
    balance: number
    isLoggedIn: boolean
    isLoading: boolean
    isLoadingTransactions: boolean
    transactions: any[]
    error: string | null
}

const initialState: IUserState = {
    email: '',
    balance: 0,
    isLoggedIn: false,
    isLoading: true,
    isLoadingTransactions: true,
    transactions: [],
    error: null
};

const userReducer = (
    state: IUserState = initialState,
    action: UserAction,
) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                ...action.payload,
                error: null,
                isLoggedIn: true,
                isLoading: false,
            };
        case 'SET_USER_LOADING':
            return {
                ...state,
                error: null,
                isLoading: true,
            };
        case 'SET_USER_LOADED':
                return {
                    ...state,
                    error: null,
                    isLoading: false,
                };
        case 'SET_USER_ERROR':
            return {
                ...state,
                error: 'Unable to load user',
                isLoading: false,
            };
        case 'LOGOUT':
            return {
                ...initialState,
                error: null,
                isLoading: false,
            };
        case 'SET_USER_BALANCE':
            return {
                ...state,
                balance: action.payload,
                error: null,
                isLoading: false,
            }
        case 'SET_USER_TRANSACTIONS_LOADING':
            return {
                ...state,
                isLoadingTransactions: true
            }
        case 'SET_USER_TRANSACTIONS':
            return {
                ...state,
                transactions: action.payload,
                error: null,
                isLoadingTransactions: false
            }
        default:
            return state;
    }
};

export default userReducer;
