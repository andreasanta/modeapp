import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getUser, getTransactions } from '../store/actions/user/userActions';

export const useCheckForUser = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);
};

export const useCheckTransactions = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTransactions());
    }, [dispatch]);
};
