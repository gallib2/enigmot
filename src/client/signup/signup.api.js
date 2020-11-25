import axios from 'axios';
import config from '../config';

export async function signupApi(email, username, password) {
    try {
        // const res = await axios.post(`${config.api_route}/user/signup`, 
        // {
        //     username,
        //     password
        // }
        // );

        const data = {email, username, password};
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            // headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: data,
            url: `${config.api_route}/user/signup`,
        };
        const res = await axios(options);

    } catch (err) {
        console.log('error from sign up api: ', err);
    }
}

export async function signinApi(email, username, password) {
    try {
        // const res = await axios.post(`${config.api_route}/user/signup`, 
        // {
        //     username,
        //     password
        // }
        // );

        const data = {email, username, password};
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
        console.log('error from sign up api: ', err);
    }
}