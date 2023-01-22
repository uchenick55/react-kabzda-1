import React from "react";
import "./krestiki-noliki.css";

const Square = (props) => {
    // отрисовка квадрата (отдельной клетки)
    return (
        <button
            className="square" // класс кнопки/клетки
            onClick={() => {
                // по клику
                props.handleSquare(props.i); // выполнить функцию из пропсов сверху
            }}
        >
            {props.value} {/* значение внутри клетки X, O или пустота (null)*/}
        </button>
    );
};

class Board extends React.Component {
    // все игровое поле из 9 клеток
    renderSquare(i) {
        // обращение к отрисовке отдельной клетки Square
        return (
            <Square // отрисовать Square отдельную клетку
                value={this.props.squares[i]} // значение X, O или пусто (null)
                handleSquare={this.props.handleSquare} // обработчик кликов по кнопке, пришел сверху из пропсов
                i={i} // номер текущей клетки
            />
        );
    }

    render() {
        let status; // существует переменная status
        const Winner = calculateWinner(this.props.squares); // проверка, появился ли победитель
        if (this.props.history.length < 10) {
            status = this.props.xIsNext ? "Сейчас ходит: X " : "Сейчас ходит: O ";
            // задать статусу кто ходит следующим X или O
        }
        if (Winner) {// определен победитель
            status = "Победитель: " + Winner; // вывести победителя
        }
        if (this.props.history.length >= 10 && !Winner) {
            status = "Ничья"; // заполнены все клетки и нет победителя
        }
        return (
            <div>
                <div className="status">{status}</div>
                {/*вывести статус в отрисовке*/}
                <div className="board-row">
                    {this.renderSquare(0)} {/*задание 3 клеток с порядковым номером i*/}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {/*перенос строки, задание еще 3 клеток*/}
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {/*перенос строки, задание еще 3 клеток*/}
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    // функция определения победителя (squares - весь текущий массив клеток)
    const lines = [
        [0, 1, 2], // задание комбинаций a, b, c при которых определяется победитель
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let n = 0; n < lines.length; n = n + 1) {
        // перебор элементов squares
        const [a, b, c] = lines[n]; // переменным a, b, с присваивают поочередно
        // комбинации возможной победы
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            // если комбинации победы совпадают с текущим расположением на поле
            return squares[a]; // выводится текущий игрок (X или O) как победитель
        }
    }
    return null; // если комбинации победы не совпадают, победитель не определен
}

class KrestikiNoliki extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            xIsNext: true, // что вводим X или O (true/false)
            history: [{squaresNew: Array(9).fill(null)}] // массив объектов - истории ходов
        };
    }

    handleSquare = (i) => {
        // обработчик кликов
        let currentStep = this.state.history.length - 1; // текущий ход в массиве ходов (-1 поскольку счет идет с 0)
        let squaresNew = this.state.history[currentStep].squaresNew.slice(); // делаем копию текущего массива

        const Winner = calculateWinner(squaresNew); // попытка определения победитея

        if (squaresNew[i] || Winner) {
            //если текущая кнопка ранее была заполнена, или победитель уже определен
            return; // ничего не делаем
        }
        squaresNew[i] = this.state.xIsNext ? "X" : "O";
        // заносим в массив текущего хода X или O в зависимости от xIsNext
        this.setState({xIsNext: !this.state.xIsNext});
        // передаем ход следующему игроку

        const historyNew2 = this.state.history.concat({squaresNew});
        // добавить в локальный массив historyNew2 данные из основного массива history и новый массив squaresNew

        this.setState({history: historyNew2}); // внести в history обновленный  historyNew2
    };

    newGame = () => {
        this.setState({
            xIsNext: true,
            history: [{squaresNew: Array(9).fill(null)}]
        });

    }

    render() {
        let currentStep = this.state.history.length - 1; // текущий ход в массиве ходов (-1 поскольку счет идет с 0)
        let squaresNew = this.state.history[currentStep].squaresNew.slice(); // делаем копию текущего массива
        return (
            <div>
                <div><h3>Крестики нолики</h3></div>
                <div>
                    <Board
                        squares={squaresNew} // пропсами передаем вглубь текущий массив клеток
                        xIsNext={this.state.xIsNext} // статус кто ходит
                        handleSquare={this.handleSquare} // обработчик кликов
                        history={this.state.history}
                    />
                </div>
                <div>
                    <button className="new-game-button" onClick={this.newGame}>Начать заново</button>
                </div>
            </div>
        );
    }
}

export default KrestikiNoliki;

