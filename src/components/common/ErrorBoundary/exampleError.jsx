import React from "react";

//import ErrorBoundary from "./ErrorBoundary";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {error: null, errorInfo: null};
    }

    componentDidCatch(error, errorInfo) {
        //Засетать в локал стейт ошибки из вложенных компонентах, если появятся при рендере
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
    }

    render() {
        if (this.state.errorInfo) {
            return (
                <div>
                    <h2>Something went wrong.</h2>
                    <details>
                        {this.setState.error && this.state.error.toString()}
                        <br/>
                        {this.state.errorInfo.componentStack}
                    </details>
                </div>
            );
        }
        // При отсутствии ошибок рендерить тело children (дочернюю компоненту)
        return this.props.children;
    }
}

class BuggyCounter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {counter: 0};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(({counter}) => ({counter: counter + 1}));
    }

    render() {
        if (this.state.counter === 5) {
            // Симуляция ошибки JS
            throw new Error("I crashed!!");
        }
        return <h1 onClick={this.handleClick}>{this.state.counter}</h1>;
    }
}

function App() {
    return (
        <div>
            <p>
                <b>
                    Это пример error Boundaries в React 16
                    <br/> <br/>
                    Нажмите на номер для увеличения счетчика
                    <br/>
                    Счетчик запрограммирован выдать ошибку, когда достигнет 5.
                </b>
            </p>
            <hr/>
            <ErrorBoundary>
                <p>
                    Эти два счетчика внутри одного обработчика ошибок. Когда выдаст ошибку
                    один, обработчик заменит их оба
                </p>
                <BuggyCounter/>
                <BuggyCounter/>
            </ErrorBoundary>

            <p>
                Эти два счетчика внутри одного обработчика ошибок. Когда выдаст ошибку
                один, обработчик заменит их оба
            </p>
            <ErrorBoundary>
                <BuggyCounter/>{" "}
            </ErrorBoundary>
            <ErrorBoundary>
                <BuggyCounter/>{" "}
            </ErrorBoundary>
        </div>
    );
}

export default App;
