import axios from 'axios';
import config from '../config';

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