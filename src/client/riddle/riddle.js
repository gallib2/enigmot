import React, { useEffect, useState, useRef } from 'react';
import _ from 'lodash';
import { useHistory, useLocation } from 'react-router-dom';
import Canvas from './Canvas';

import './riddle.scss'

import DoneOutlineOutlinedIcon from '@material-ui/icons/DoneOutlineOutlined';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';

const Riddle = () => {
    const history = useHistory();
    const { state } = useLocation();
    console.log('state: ', state); // TODO G 

    const [isCollpased, setIsCollapsed] = useState(true);
    const [buttonExpandClassName, setButtonExpandClassName] = useState('btn collapsed');
    const [questionContainerClassName, setQuestionContainerClassName] = useState('question-container collapsed');
    const [questionHeight, setQuestionHeight] = useState('100px');

    const questionContainer = useRef();

    useEffect(() => {
        const isRiddleExists = !_.isEmpty(state) && !_.isEmpty(state.riddle);
        if (!isRiddleExists) backToHomePage();
    }, [])

    const backToHomePage = () => {
        history.push('/');
    }

    const getMaxHeight = () => {
        const height = questionContainer.current.scrollHeight + 50;

        return `${height}px`
    }

    const toggle = () => {
        if (isCollpased) {
            // should expand
            setButtonExpandClassName('btn expand');
            setQuestionContainerClassName('question-container expand');
            setQuestionHeight(getMaxHeight);
            setIsCollapsed(false);
        } else {
            setButtonExpandClassName('btn collapsed');
            setQuestionContainerClassName('question-container collapsed');
            setQuestionHeight('100px')
            setIsCollapsed(true);
        }
    }

    return (
        <div className="riddle-container" style={{ "width": "100%", "height": "100vh", "overflow": "hidden" }}>
            <div className={'arrow-back'}><ArrowBackOutlinedIcon onClick={backToHomePage} /></div>
            <div className={questionContainerClassName} style={{ maxHeight: questionHeight }}>
                <div className='content'>
                    <div className='title'>
                        <div className={buttonExpandClassName} onClick={toggle}>
                            <ArrowForwardIosOutlinedIcon fontSize='small' />
                        </div>
                        <div className='title-text'> {state.riddle.question && state.riddle.question.title} </div>
                    </div>
                    <div className='question' ref={questionContainer}> {state.riddle.question && state.riddle.question.content} </div>
                </div>
                {/* <div className={buttonExpandClassName} onClick={toggle}>
                    <ArrowForwardIosOutlinedIcon fontSize='small'/>
                </div> */}
            </div>
            {/* <DoneOutlineOutlinedIcon onClick={markAsSolve} /> */}
            <Canvas
                riddle={state.riddle}
            />
        </div>
    );
}

export default Riddle;