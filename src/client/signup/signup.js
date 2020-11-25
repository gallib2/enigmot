import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {signupApi, signinApi} from './signup.api';

import './signup.scss';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleUserNameChange = (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handleSubmitClick = async (event) => {
        event.preventDefault();

        console.log('username: ', username)
        console.log('password: ', password)
        // const res = await signupApi(email, username, password);
        const res = await signinApi(email, username, password);

        console.log('from handle submit: ', res);
    }

    return (
        <div className="signup-container">
            <div className="signup-title">Sign Up</div>
            <form className='signup-form' noValidate autoComplete="off" onSubmit={handleSubmitClick}>
                <TextField
                    label='Username'
                    type='text'
                    value={username}
                    onChange={handleUserNameChange}
                    className='signup-text-field'
                />
                <TextField
                    label='Email'
                    type='email'
                    value={email}
                    onChange={handleEmailChange}
                    className='signup-text-field'
                />
                <TextField
                    label='Password'
                    type='password'
                    value={password}
                    onChange={handlePasswordChange}
                    className='signup-text-field'
                />
                <Button type='submit'>
                    SUBMIT
                </Button>
            </form>
        </div>
    );
}

export default Signup;