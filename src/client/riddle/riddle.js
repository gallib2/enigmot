import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useHistory, useLocation } from 'react-router-dom';
import Canvas from './Canvas';

const Riddle = () => {
    const history = useHistory();
    const {state} = useLocation();
    console.log('state: ', state);

    useEffect(() => {
        const isRiddleExists = !_.isEmpty(state) && !_.isEmpty(state.riddle);
        if(!isRiddleExists) backToHomePage();
    }, [])

    const backToHomePage = () => {
        history.push('/');
    }

    return (
        <div className="riddle-container" style={{"width": "100%", "height": "100vh", "overflow": "hidden"}}>
            <div> {state.riddle.question && state.riddle.question.title} </div>
            <div> {state.riddle.question && state.riddle.question.content} </div>
            <button onClick={backToHomePage}> back </button>
            <button> mark as solved </button>
            <Canvas
                riddle = {state.riddle}
            />
        </div>
    );
}

export default Riddle;