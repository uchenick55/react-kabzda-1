//Реализация async и await на классовых кмпонентах
import axios from "axios"; // библиотека асинхронных запросов
import React from "react"; // пишем в любой компоненте с JSX

class News extends React.Component {
    state = {
        // локальный стейт
        data: { hits: [] }, // пока пустой массив, сюда придут данные с сервера
        query: "react", // поисковый запрос
        onChangeQuery: "react" // временное значение поиска, обновляется через onChange
    };

    inputOnChange = (event) => {
        //
        this.setState({ onChangeQuery: event.currentTarget.value });
        // задаем временное значение стейта по onChange input
    };

    buttonOnClick = () => {
        this.setState({ query: this.state.onChangeQuery }); // реакция на кнопку
        //задание в поле поиска query значение из временного onChangeQuery
    };

    callURL = (props) => {
        // вынесли в отдельнюю функцию получение URL запроса
        return `https://hn.algolia.com/api/v1/search?query=${props}`;
    };

    async AsyncF(props) {
        // асинхронный запрос
        const result = await axios(this.callURL(props));
        this.setState({ data: result.data }); // задание с массив hits данных с сервера
    }

    componentDidMount() {
        this.AsyncF(this.state.query);
        // вызов асинхронного запроса по начальному значению поиска query
    }

    componentDidUpdate(prevProps, prevState) {
        // при ререндере
        if (this.state.query !== prevState.query) {
            // если запрос query изменился
            this.AsyncF(this.state.query); // запрос по новым данным
        }
    }

    render() {
        return (
            <div>
                <h3>Search by HackerNews</h3>
                <form>
                    {/* объединяем input и button*/}
                    <input // поле поиска
                        value={this.state.onChangeQuery} // привязали value к значению из стейта
                        onChange={(event) => {
                            // при изменении
                            this.inputOnChange(event); // задаем временное значение стейта по onChange input
                        }}
                    />
                    <button // кнопка
                        onClick={(e) => {
                            // по клику
                            e.preventDefault(); // отменяем действие по умолчанию (отправка формы)
                            this.buttonOnClick();
                            //задание в поле поиска query значение из временного onChangeQuery
                        }}
                    >
                        Search
                    </button>
                </form>

                <ul>
                    {this.state.data.hits ? ( // если массив hits не пустой
                        <div>
                            {this.state.data.hits.map((
                                //мапим
                                d
                            ) => (
                                <li key={d.objectID}>
                                    {" "}
                                    {/* key привязываем к map id*/}
                                    <a href={d.url} >
                                        {d.title}
                                        {d.story_title}
                                    </a>
                                    {/* список ссылок с URL*/}
                                </li>
                            ))}
                        </div>
                    ) : null}{" "}
                    {/* ничего не выводим, если массив hits пустой*/}
                </ul>
            </div>
        );
    }
}
export default News;
