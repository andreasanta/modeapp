import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import MainBody from '../../MainBody'
import TransactionList from '../../TransactionList'
import { StyledInput } from '../../styles'
import { IUser } from '../../../@types'

import { topupBalance, transfer } from '../../../store/actions/user/userActions'

interface ProfilePageLayoutProps {
    user: IUser;
}

const ProfilePageLayout = ({ user }: ProfilePageLayoutProps) => {
    const { email, balance } = user;

    const dispatch = useDispatch()
    const [topup, setTopup] = useState(0)
    const [amount, setAmount] = useState(0)
    const [destEmail, setDestEmail] = useState('')

    const executeTopup = () => {
        dispatch(topupBalance(topup))
    }

    const executeTransfer = () => {
        dispatch(transfer(destEmail, amount))
    }

    return (
        <MainBody>
            <h1>Hello, {email}</h1>
            <h2>Your current balance is £ {balance.toFixed(2)}</h2>
            <fieldset>
                <legend>Top Up</legend>
                Amount: <StyledInput type="number" value={topup} onChange={(e) => setTopup(parseInt(e.target.value))}/><br/>
                <button onClick={executeTopup}>Top Up</button>
            </fieldset>
            <p>&nbsp;</p>
            <fieldset>
                <legend>Transfer</legend>
                Amount: <StyledInput type="number" value={amount} onChange={(e) => setAmount(parseInt(e.target.value))}/><br/>
                Destination e-mail: <StyledInput type="email" value={destEmail} onChange={(e) => setDestEmail(e.target.value)}/><br/>
                <button onClick={executeTransfer}>Transfer</button>
            </fieldset>

            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <h3>Transactions List</h3>
            <TransactionList />
        </MainBody>
    );
};

export default ProfilePageLayout;
