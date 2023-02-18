//Реализация async и await на классовых кмпонентах
import axios from "axios"; // библиотека асинхронных запросов
import React from "react";
import commonClasses from "../common/CommonClasses/common.module.css";
import Button from "react-bootstrap/Button";
import ListGroup from 'react-bootstrap/ListGroup'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'

class News extends React.Component {
    state = {
        // локальный стейт
        data: {hits: []}, // пока пустой массив, сюда придут данные с сервера
        query: "react", // поисковый запрос
        onChangeQuery: "react" // временное значение поиска, обновляется через onChange
    };

    inputOnChange = (event) => {
        //
        this.setState({onChangeQuery: event.currentTarget.value});
        // задаем временное значение стейта по onChange input
    };

    buttonOnClick = () => {
        this.setState({query: this.state.onChangeQuery}); // реакция на кнопку
        //задание в поле поиска query значение из временного onChangeQuery
    };

    callURL = (props) => {
        // вынесли в отдельнюю функцию получение URL запроса
        return `https://hn.algolia.com/api/v1/search?query=${props}`;
    };

    async AsyncF(props) {
        // асинхронный запрос
        const result = await axios(this.callURL(props));
        this.setState({data: result.data}); // задание с массив hits данных с сервера
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
        let hn = <div>
            <h2 className={commonClasses.pageHeader}>Search by HackerNews</h2>

            <form>
                {/* объединяем input и button*/}
                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="введите поисковый запрос"

                        value={this.state.onChangeQuery} // привязали value к значению из стейта
                        onChange={(event) => {
                            // при изменении
                            this.inputOnChange(event); // задаем временное значение стейта по onChange input
                        }}
                    />

                    <Button variant="outline-secondary" // кнопка
                        type='submit'
                        onClick={(e) => {
                            // по клику
                            e.preventDefault(); // отменяем действие по умолчанию (отправка формы)
                            this.buttonOnClick();
                            //задание в поле поиска query значение из временного onChangeQuery
                        }}
                    >
                        Search
                    </Button>
                </InputGroup>
            </form>


{/*                <ListGroup.Item>No style</ListGroup.Item>
                <ListGroup.Item variant="primary">Primary</ListGroup.Item>
                <ListGroup.Item variant="secondary">Secondary</ListGroup.Item>
                <ListGroup.Item variant="success">Success</ListGroup.Item>
                <ListGroup.Item variant="danger">Danger</ListGroup.Item>
                <ListGroup.Item variant="warning">Warning</ListGroup.Item>
                <ListGroup.Item variant="info">Info</ListGroup.Item>
                <ListGroup.Item variant="light">Light</ListGroup.Item>
                <ListGroup.Item variant="dark">Dark</ListGroup.Item>*/}


{/*
            <ul>
*/}
                {this.state.data.hits &&
                <div>
                    {this.state.data.hits.map((
                        //мапим
                        d
                    ) => {return <div key={d.objectID}>  {/* key привязываем к map id*/}
                        <ListGroup>
                            <ListGroup.Item variant="Light" className='my-1' >
                                <div >
                                    <a href={d.url}>
                                        {d.title}
                                        {d.story_title}
                                    </a>
                                </div>

                            </ListGroup.Item>
                        </ListGroup>
                            {/* список ссылок с URL*/}
                        </div>
                    })}
                </div>
                }
{/*
            </ul>
*/}


        </div>
        return (<div>
                {hn}{/*отрисовка результатов поиска*/}
            </div>
        );
    }
}

export default News;
