import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import PasswordInput from './passwordInput';

import './authForm.scss';

const passwordType = 'password'
const textType = 'text'

const AuthForm = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleUserNameChange = (event) => {
        setUsername(event.target.value)
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handleSubmitClick = async (event) => {
        event.preventDefault();

        try {
            console.log('username: ', username)
            console.log('password: ', password)
            const dataToSubmit = { email, password }
            if (props.showUserName) {
                dataToSubmit.username = username
            }
            await props.submitFunction(dataToSubmit);


        } catch (err) {

        }
    }

    return (
        <div className="auth-container">
            <div className="auth-title">{props.title}</div>
            <form className='auth-form' noValidate autoComplete="off" onSubmit={handleSubmitClick}>
                {props.showUserName && <TextField
                    variant="outlined"
                    label='Username'
                    type='text'
                    value={username}
                    onChange={handleUserNameChange}
                    className='signup-text-field'
                />}
                <TextField
                    variant="outlined"
                    label='Email'
                    type='email'
                    value={email}
                    onChange={handleEmailChange}
                    className='auth-text-field'
                />
                <PasswordInput
                    password={password}
                    setPassword={setPassword}
                />

                <Button type='submit' className='auth-text-field btn'>
                    {props.submitButtonText}
                </Button>
                <div className="auth-text-field swip-auth-form" onClick={() => props.swipAuthFormFunc && props.swipAuthFormFunc()}>
                    {props.swipAuthFormText}
                </div>
            </form>
        </div>
    );
}

export default AuthForm;