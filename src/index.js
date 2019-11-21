import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import MyVariableAndDigit from "./App";
// import Box from "./App";
import BoxWithVariable from "./App"
import calculate from "./App"
import parseCalculationString from "./App"

// ReactDOM.render(<App/>, document.getElementById('root'));
// ReactDOM.render(<MyVariableAndDigit/>, document.getElementById("root"));
// ReactDOM.render(<Box/>, document.getElementById("root"));
ReactDOM.render(<BoxWithVariable/>, document.getElementById("root"));




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
