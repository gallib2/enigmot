import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './authForm.scss';

const AuthForm = (props) => {
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

        try {
            console.log('username: ', username)
            console.log('password: ', password)
            const dataToSubmit = {email, password}
            if(props.showUserName) {
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
                    label='Username'
                    type='text'
                    value={username}
                    onChange={handleUserNameChange}
                    className='signup-text-field'
                />}
                <TextField
                    label='Email'
                    type='email'
                    value={email}
                    onChange={handleEmailChange}
                    className='auth-text-field'
                />
                <TextField
                    label='Password'
                    type='password'
                    value={password}
                    onChange={handlePasswordChange}
                    className='auth-text-field'
                />
                <Button type='submit'>
                    {props.submitButtonText}
                </Button>
            </form>
        </div>
    );
}

export default AuthForm;