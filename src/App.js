import React from 'react';
import './App.css';

class DigitButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onClick(this.props.digit);
    }

    render() {
        return <button onClick={this.handleClick}>{this.props.digit}</button>;
    }
}

class OperationButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onClick(this.props.operation);
    }

    render() {
        return <button onClick={this.handleClick}>{this.props.operation}</button>;
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);

        this.handleDigitClick = this.handleDigitClick.bind(this);
        this.handleOperationClick = this.handleOperationClick.bind(this);
        this.handleResultClick = this.handleResultClick.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            operation: "",
            result: '',
        };
    }

    handleDigitClick(digit) {
        console.log(`APP: Digit clicked: ${digit}`);
        this.setState(prevState => ({
            result: prevState.result + digit
        }));
    }

    handleOperationClick(operation) {
        console.log(`APP: Operation clicked: ${operation}`);
        this.setState(prevState => ({
            result: prevState.result + operation
        }));
    }

    handleChange = (event) => {
        this.setState({result: event.target.value});
    };

    handleResultClick = (event) => {
        this.setState({result: this.calculate(this.parseCalculationString(this.state.result))});
        event.preventDefault();
    };
    parseCalculationString = (s) => {
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
            return calc[0].toString();
        }
    };

    render() {
        return (
            <div>
                <table>
                    <tbody>
                    <tr>
                        <td colSpan="4"><input type="text" onChange={this.handleChange} value={this.state.result}/></td>
                    </tr>
                    <tr>
                        <td><DigitButton onClick={this.handleDigitClick} digit={1}/></td>
                        <td><DigitButton onClick={this.handleDigitClick} digit={2}/></td>
                        <td><DigitButton onClick={this.handleDigitClick} digit={3}/></td>
                        <td><OperationButton onClick={this.handleOperationClick} operation="+"/></td>
                    </tr>
                    <tr>
                        <td><DigitButton onClick={this.handleDigitClick} digit={4}/></td>
                        <td><DigitButton onClick={this.handleDigitClick} digit={5}/></td>
                        <td><DigitButton onClick={this.handleDigitClick} digit={6}/></td>
                        <td><OperationButton onClick={this.handleOperationClick} operation="-"/></td>
                    </tr>
                    <tr>
                        <td><DigitButton onClick={this.handleDigitClick} digit={7}/></td>
                        <td><DigitButton onClick={this.handleDigitClick} digit={8}/></td>
                        <td><DigitButton onClick={this.handleDigitClick} digit={9}/></td>
                        <td><OperationButton onClick={this.handleOperationClick} operation="*"/></td>
                    </tr>
                    <tr>
                        <td colSpan="2"><DigitButton onClick={this.handleDigitClick} digit={0}/></td>
                        <td><input type="button" value="=" onClick={this.handleResultClick} operation="="/></td>
                        <td><OperationButton onClick={this.handleOperationClick} operation="/"/></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}


export default App;
