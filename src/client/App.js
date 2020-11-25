import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Canvas from './Canvas';
import Riddle from './riddle';
import Signup from './signup/signup'

function App() {
  return (
    <div className="App">
      {/* <div style={{width: '100%', position: "fixed", top:'0px', backgroundColor:'white'}}>hello</div> */}
      <Signup/>
        {/* <Riddle/> */}
      {/* <Canvas/> */}
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
