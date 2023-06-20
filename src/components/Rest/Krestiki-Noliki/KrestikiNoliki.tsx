import React, {useState} from "react";
import "./krestiki-noliki.css";
import commonClasses from "../../common/CommonClasses/common.module.css";
import Button from "react-bootstrap/Button";

type SquareType = {
    value: "X" | "O" | null, // значение X, O или пусто (null)
    handleSquare: (i: number) => void, // обработчик кликов по кнопке, пришел сверху из пропсов
    i: number// номер текущей клетки
}

const Square: React.FC<SquareType> = ({value, handleSquare, i}) => {
    // отрисовка квадрата (отдельной клетки)
    return (
        <button
            className="square" // класс кнопки/клетки
            onClick={() => {
                // по клику
                handleSquare( i ); // выполнить функцию из пропсов сверху
            }}
        >
            {value} {/* значение внутри клетки X, O или пустота (null)*/}
        </button>
    );
};
type SquaresType = Array<"X" | "O" | null> // пропсами передаем вглубь текущий массив клеток

const xIsNextInitialState = true // начальное значение кто ходит
const historyInitialState = [{squaresNew: Array( 9 ).fill( null )}] // начальное значение массива History

type BoardPropsType = {
    squares: SquaresType // пропсами передаем вглубь текущий массив клеток
    xIsNext: boolean// статус кто ходит
    handleSquare: (i: number) => void // обработчик кликов
    history: typeof historyInitialState
}

const Board: React.FC<BoardPropsType> = ({squares, xIsNext, handleSquare, history}) => {
    // все игровое поле из 9 клеток
    const renderSquare = (i: number) => {
        // обращение к отрисовке отдельной клетки Square
        return (
            <Square // отрисовать Square отдельную клетку
                value={squares[i]} // значение X, O или пусто (null)
                handleSquare={handleSquare} // обработчик кликов по кнопке, пришел сверху из пропсов
                i={i} // номер текущей клетки
            />
        );
    }

    let status; // определеили переменную
    const winner = calculateWinner( squares ); // проверка, появился ли победитель
    if (history.length < 10) {
        status = xIsNext ? "Сейчас ходит: X " : "Сейчас ходит: O ";
        // задать статусу кто ходит следующим X или O
    }
    if (winner) {// определен победитель
        status = "Победитель: " + winner; // вывести победителя
    }
    if (history.length >= 10 && !winner) {
        status = "Ничья"; // заполнены все клетки и нет победителя
    }
    return (
        <div>
            <div className="status">{status}</div>
            {/*вывести статус в отрисовке*/}
            <div className="board-row">
                {renderSquare( 0 )} {/*задание 3 клеток с порядковым номером i*/}
                {renderSquare( 1 )}
                {renderSquare( 2 )}
            </div>
            <div className="board-row">
                {/*перенос строки, задание еще 3 клеток*/}
                {renderSquare( 3 )}
                {renderSquare( 4 )}
                {renderSquare( 5 )}
            </div>
            <div className="board-row">
                {/*перенос строки, задание еще 3 клеток*/}
                {renderSquare( 6 )}
                {renderSquare( 7 )}
                {renderSquare( 8 )}
            </div>
        </div>
    );
}

function calculateWinner(squares: SquaresType) {
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

const KrestikiNoliki: React.FC = () => {

    const [history, setHistory] = useState<typeof historyInitialState>( historyInitialState )// массив объектов - истории ходов

    const [xIsNext, setXisNext] = useState<boolean>( xIsNextInitialState ) // что вводим X или O (true/false)

    const handleSquare = (i: number) => {
        // обработчик кликов
        const currentStep = history.length - 1; // текущий ход в массиве ходов (-1 поскольку счет идет с 0)
        const squaresNew = history[currentStep].squaresNew.slice(); // делаем копию текущего массива

        const winner = calculateWinner( squaresNew ); // попытка определения победитея

        if (squaresNew[i] || winner) {
            //если текущая кнопка ранее была заполнена, или победитель уже определен
            return; // ничего не делаем
        }
        squaresNew[i] = xIsNext ? "X" : "O";
        // заносим в массив текущего хода X или O в зависимости от xIsNext
        setXisNext( !xIsNext );  // передаем ход следующему игроку

        const historyNew2 = history.concat( {squaresNew} );
        // добавить в локальный массив historyNew2 данные из основного массива history и новый массив squaresNew

        setHistory( historyNew2 )
    };

    const newGame = () => { // нажатие кнопки "новая игра"
        setXisNext( xIsNextInitialState ) // начальное значение кто ходит
        setHistory( historyInitialState )// начальное значение массива истории
    }

    const currentStep = history.length - 1; // текущий ход в массиве ходов (-1 поскольку счет идет с 0)
    const squaresNew = history[currentStep].squaresNew.slice(); // делаем копию текущего массива
    return (
        <div>
            <h2 className={commonClasses.pageHeader}>Крестики нолики</h2>
            <div className={commonClasses.center}>
                <Board
                    squares={squaresNew} // пропсами передаем вглубь текущий массив клеток
                    xIsNext={xIsNext} // статус кто ходит
                    handleSquare={handleSquare} // обработчик кликов
                    history={history}
                />

            </div>
            <div className={commonClasses.center}>
                <Button className="new-game-button" onClick={newGame}>Начать заново</Button>
            </div>
        </div>
    );
}

export default KrestikiNoliki;


