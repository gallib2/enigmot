import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { logout } from './authentication/authenticationApi';
import auth from './authentication/auth';

// TODO :
// - get all riddles
// - present the riddles (currently withou sorting)
// - a click on a riddle will enter the canvas (pass the riddle question to the canvas)

const HomePage = (props) => {
    const history = useHistory();

    const handleLogout = async (e) => {
        await logout();
        auth.signout();
        history.push('/login');
    }

    return (
        <div>
            <div>hello to home page</div>
            <Button onClick={handleLogout}>Logout</Button>
        </div>
    );
}

export default HomePage;