import React from 'react';
import Canvas from './Canvas';

const Riddle = (props) => {

    return (
        <div className="riddle-container" style={{"width": "100%", "height": "100vh", "overflow": "hidden"}}>
            <div> the question </div>
            <button> mark as solved </button>
            <Canvas/>
        </div>
    );
}

export default Riddle;