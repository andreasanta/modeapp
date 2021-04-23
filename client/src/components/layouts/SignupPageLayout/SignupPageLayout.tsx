import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import MainBody from '../../MainBody'
import { StyledInput } from '../../styles'
import { signupUser } from '../../../store/actions/user/userActions'

import {
    selectUserIsLoggedIn
} from '../../../store/selectors'

const SignupPageLayout = () => {

    const history = useHistory()
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const isLoggedIn = useSelector(selectUserIsLoggedIn)

    const performSignup = () => {
        dispatch(signupUser(email, password))
    }

    if (isLoggedIn)
        history.replace('/profile')


    return (
        <MainBody>
            Email: <StyledInput type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
            Password: <StyledInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={performSignup}>Sign up</button>
        </MainBody>
    );
};

export default SignupPageLayout;
