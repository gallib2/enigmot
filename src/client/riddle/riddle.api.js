import axios from 'axios';
import config from '../config';

export async function savePaint({paint, riddleId}) {
    try {
        const data = {paint, riddleId};
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            data: data,
            url: `${config.api_route}/riddles/save`,
            withCredentials: true
        };

        const res = await axios(options);

    } catch (err) {
         // TODO
        console.log('error from sign up api: ', err);
    }
}

export async function markSolveState({solveState}) {
    try {
        const data = {solveState};
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            // headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: data,
            url: `${config.api_route}/riddles/solve`,
            withCredentials: true
        };
        const res = await axios(options);

    } catch (err) {
        // TODO
        console.log('error from sign in api: ', err);
    }
}
