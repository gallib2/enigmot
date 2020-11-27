import axios from 'axios';
import config from '../config';
import auth from './auth';

export async function signupApi({email, username, password}) {
    try {
        const data = {email, username, password};
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            data: data,
            url: `${config.api_route}/user/signup`,
            withCredentials: true
        };
        const res = await axios(options);

    } catch (err) {
         // TODO
        console.log('error from sign up api: ', err);
    }
}

export async function signinApi({email, password}) {
    try {
        const data = {email, password};
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            // headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: data,
            url: `${config.api_route}/user/login`,
            withCredentials: true
        };
        const res = await axios(options);

    } catch (err) {
        // TODO
        console.log('error from sign in api: ', err);
    }
}

// async function isAlreadLoggedIn() {
//     let toRedirectToRefferer = false;
//     if(auth.isAuthenticated || await isLoggedin()) {
//         toRedirectToRefferer = true;
//         auth.authenticte();
//     }
//     setRedirectToRefferer(toRedirectToRefferer)
// }

export async function isLoggedin() {
    try {
        if(auth.isAuthenticated) return true;

        const options = {
            method: 'GET',
            headers: { 'content-type': 'application/json' },
            url: `${config.api_route}/user/login/auth`,
            withCredentials: true
        };
        const res = await axios(options);
        const isAuth = res && res.data && res.data.auth;
        if (isAuth) auth.authenticte();
        return isAuth;

    } catch (err) {
        // TODO
        console.log('error from isLoggedin api: ', err);
        return false;
    }
}

export async function logout() {
    try {
        const data = {};
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            data: data,
            url: `${config.api_route}/user/logout`,
            withCredentials: true
        };
        const res = await axios(options);

    } catch (err) {
         // TODO
        console.log('error from sign up api: ', err);
    }
}