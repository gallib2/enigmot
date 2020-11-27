import React from 'react';
import {signupApi} from '../authentication/authenticationApi';

import AuthForm from '../authentication/authForm';

import './signup.scss';

const Signup = () => {
    // TODO - login after so redirect to homepage
    return (
        <AuthForm
            title={'Sign Up'}
            showUserName={true}
            submitFunction={signupApi}
            submitButtonText={'Submit'}
        />
    );
}

export default Signup;