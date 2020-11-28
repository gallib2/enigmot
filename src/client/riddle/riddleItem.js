import React, { useEffect, useState } from 'react';
import { useHistory, Route, useRouteMatch, Link } from 'react-router-dom';
import Riddle from './riddle';

import './riddleItem.scss';

const RiddleItem = ({ riddle }) => {
    const [solvedText, setSolvedText] = useState('mark as solved');
    const [isSolved, setIsSolved] = useState(false);
    const [solvedClassName, setSolvedClassName] = useState('unsolved');
    const history = useHistory();

    useEffect(() => {
        if (riddle.is_solved) {
            markSolveStatus({ text: 'mark as unsolved', solved: true, className: 'solved' });
        }
    }, [])

    const markSolveStatus = ({ text, solved, className }) => {
        setSolvedText(text);
        setIsSolved(solved);
        setSolvedClassName(className);
    }

    const handleMarkAsSolved = (event) => {
        event.stopPropagation();
        if (isSolved) {
            // switch to unsolved
            markSolveStatus({ text: 'mark as solved', solved: false, className: 'unsolved' })
            // TODO - send data to db
        } else {
            markSolveStatus({ text: 'mark as unsolved', solved: true, className: 'solved' });
            // TODO - send data to db
        }
    }

    const handleRiddleClick = () => {
        // return <Link to={`${url}/riddle`}/>
        history.push({
            pathname: '/riddle',
            state: {riddle}
        })
    }

    return (
        <div className='riddle-item-container' onClick={handleRiddleClick}>
            <div className='riddle-item-title'>{riddle.question.title}</div>
            <div className='riddle-item-content'>{riddle.question.content}</div>
            <div className='solved-container'>
                <button className='riddle-item-btn' onClick={handleMarkAsSolved}>{solvedText}</button>
                <span className={`riddle-item-solved ${solvedClassName}`}></span>
            </div>
        </div>
    )
}

export default RiddleItem;