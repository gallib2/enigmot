import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { logout } from '../authentication/authenticationApi';
import auth from '../authentication/auth';
import {getRiddlesApi} from './homePage.api';
import RiddleItem from '../riddle/riddleItem';

// TODO :
// - get all riddles
// - present the riddles (currently withou sorting)
// - a click on a riddle will enter the canvas (pass the riddle question to the canvas)

const HomePage = (props) => {
    const history = useHistory();
    const [riddles, setRiddles] = useState([]);

    const handleLogout = async (e) => {
        await logout();
        auth.signout();
        history.push('/login');
    }

    useEffect(() => {
        async function getRiddles() {
            const res = await getRiddlesApi();
            setRiddles(res);
        }

        getRiddles();
    }, [])

    return (
        <div>
            <div>hello to home page</div>
            <Button onClick={handleLogout}>Logout</Button>
            <div>
                Riddles:
                <div>
                    {(riddles.map((riddle, index) => {
                        return <RiddleItem key={index} riddle={riddle} />
                    }))}
                </div>
            </div>
        </div>
    );
}

export default HomePage;