import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { logout } from '../authentication/authenticationApi';
import auth from '../authentication/auth';
import {getRiddlesApi} from './homePage.api';
import RiddleItem from '../riddle/riddleItem';

import './home-page.scss';

import MenuAppBar from './header';

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

    /**<div class="header" style="
    width: 100%;
    height: 30px;
    background-color: aliceblue;
"></div> */

    return (
        <div className='home-page-container'>
            <MenuAppBar
                logOut={handleLogout}
            />
            {/* <div className='header'></div> */}
            {/* <div>hello to home page</div> */}
            {/* <Button onClick={handleLogout}>Logout</Button> */}
            <div className='riddle-box-container'>
                <div className='riddles-boxes'>
                    {(riddles.map((riddle, index) => {
                        return <RiddleItem key={index} riddle={riddle} />
                    }))}
                </div>
            </div>
        </div>
    );
}

export default HomePage;