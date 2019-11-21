import React from 'react';
import logo from './logo.svg';
import './App.css';

// exercise 1
class Box extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'Hi Hubert',
        };
    }


    click = () => {

        alert(this.state.value)


    };

    changeNameValue = () => {
        document.getElementById("buttonName").value = "HELLO HUBI";
    }


    render() {
        return (
            <div>
                <input type="button" id={"buttonName"} value={"Hello World!"} onClick={this.changeNameValue}/>
            </div>
        );
    }
}


// Exercise 2
class MyVariableAndDigit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number1: '',
            number2: 5,
            value: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.doAction2 = this.doAction2.bind(this);
    }

    handleChange = (event) => {
        this.setState({value: event.target.value});
    };

    doAction2(event) {
        this.setState({value: parseInt(this.state.value) + parseInt(this.state.value)});
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <input type='text' value={this.state.value}
                       onChange={this.handleChange}/>
                <input type="button" onClick={this.doAction2} value="Add+5"/>

            </div>
        );
    }
}


// // Exercise 3
//
class BoxWithVariable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            userInput: '',


        };
        this.handleChange = this.handleChange.bind(this);
        this.calculate = this.calculate.bind(this);
        this.parseCalculationString = this.parseCalculationString.bind(this);


    }

    handleChange = (event) => {
        this.setState({value: event.target.value});
    };
    parseCalculationString = (s) => {
        // --- Parse a calculation string into an array of numbers and operators
        // ch=znak
        let calculation = [],
            current = '';


        for (let i = 0, ch; ch = s.charAt(i); i++) {
            if ('+-/*^'.indexOf(ch) > -1) {
                if (current == '' && ch == '') {
                    current = '';
                } else {
                    calculation.push(parseFloat(current), ch);
                    current = '';
                }
            } else {
                current += s.charAt(i);
                //current = current + s.charAt(i)
            }
        }
        if (current != '') {
            calculation.push(parseFloat(current));
        }

        return calculation;
    };

    calculate = (calc) => {
        let operators = [{'^': (a, b) => Math.pow(a, b)},
                {'*': (a, b) => a * b, '/': (a, b) => a / b},
                {'+': (a, b) => a + b, '-': (a, b) => a - b}],
            newCalc = [],
            currentOperator;
        for (let i = 0; i < operators.length; i++) {
            for (let j = 0; j < calc.length; j++) {
                if (operators[i][calc[j]]) {
                    currentOperator = operators[i][calc[j]];
                } else if (currentOperator) {
                    newCalc[newCalc.length - 1] =
                        currentOperator(newCalc[newCalc.length - 1], calc[j]);
                    currentOperator = null;
                } else {
                    newCalc.push(calc[j]);
                }
                console.log(newCalc);
            }
            calc = newCalc;
            newCalc = [];
        }
        if (calc.length > 1) {
            console.log('Error');
            return calc;
        } else {
            return calc[0];
        }
    };
    doCalculate = (event) => {
        this.setState({value: this.calculate(this.parseCalculationString(this.state.value))});
        event.preventDefault();
    };
    render() {
        return (
            <div>
                <input type='text' id="userInput" value={this.state.value} onChange={this.handleChange}/>
                <input type="button" value="Calculate" id="calculate" onClick={this.doCalculate}/>
            </div>
        );
    }
}

export default BoxWithVariable;




