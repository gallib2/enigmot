import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import config from '../config';

import PasswordInput from './passwordInput';

import './authForm.scss';
import useErrors from './useErrors';


const AuthForm = (props) => {
    const [generalFieldsError, setGeneralFieldsError] = useState('');
    const { fieldsError, setErrors, validateField, isAllFieldsAreValid } = useErrors();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    
    const setterFieldsRefrence = {
        email: setEmail,
        password: setPassword,
        username: setUsername
    }

    const handleChange = (event) => {
        const field = event.target.name;
        setterFieldsRefrence[field](event.target.value);
        setErrors({ setError: false, errorMsg: '', field });
        setGeneralFieldsError('');
    }

    const handleBlur = (event) => {
        if (!props.toValidate) return;

        const field = event.target.name;
        const value = event.target.value;
        validateField(field, value);
        setGeneralFieldsError('');
    }

    const handleSubmitClick = async (event) => {
        event.preventDefault();

        if(props.toValidate) {
            const isAllvalid = isAllFieldsAreValid({ email, password, username });

            if (!isAllvalid) {
                setGeneralFieldsError(config.texts.errors.generalFieldsError);
                return;
            }
        }

        setGeneralFieldsError('');

        try {
            const dataToSubmit = { email, password }
            if (props.showUserName) {
                dataToSubmit.username = username
            }
            await props.submitFunction(dataToSubmit);
        } catch (err) {
            setGeneralFieldsError(config.texts.errors.generalError);
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-title">{props.title}</div>
            <form className='auth-form' noValidate autoComplete="off" onSubmit={handleSubmitClick}>
                {props.showUserName && <TextField
                    name='username'
                    variant="outlined"
                    label='Username'
                    type='text'
                    value={username}
                    onChange={handleChange}
                    className='signup-text-field'
                    error={fieldsError.usernameIsError}
                    helperText={fieldsError.usernameHelperText}
                    onBlur={handleBlur}
                />}
                <TextField
                    name='email'
                    variant="outlined"
                    label='Email'
                    type='email'
                    value={email}
                    onChange={handleChange}
                    className='auth-text-field'
                    error={fieldsError.emailIsError}
                    helperText={fieldsError.emailHelperText}
                    onBlur={handleBlur}
                />
                <PasswordInput
                    password={password}
                    handlePasswordChange={handleChange}
                    handleBlur={handleBlur}
                    helperText={fieldsError.passwordHelperText}
                    error={fieldsError.passwordIsError}
                />

                <Button type='submit' className='auth-text-field btn'>
                    {props.submitButtonText}
                </Button>
                <div>{generalFieldsError}</div>
                <div className="auth-text-field swip-auth-form" onClick={() => props.swipAuthFormFunc && props.swipAuthFormFunc()}>
                    {props.swipAuthFormText}
                </div>
            </form>
        </div>
    );
}

export default AuthForm;