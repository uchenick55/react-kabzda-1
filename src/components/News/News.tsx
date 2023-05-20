//Реализация async и await на классовых кмпонентах
import axios from "axios"; // библиотека асинхронных запросов
import React, {useEffect, useState} from "react";
import commonClasses from "../common/CommonClasses/common.module.css";
import Button from "react-bootstrap/Button";
import ListGroup from 'react-bootstrap/ListGroup'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'

type HitsItemType = {
    "created_at": string,
    "title": string,
    "url": string,
    "author": string,
    "points": number,
    "story_text": null | string,
    "comment_text": string,
    "num_comments": number,
    "story_id": null | number,
    "story_title": null | string,
    "story_url": null | string,
    "parent_id": null | number,
    "created_at_i": number,
    "relevancy_score": number,
    "_tags": Array<string>,
    "objectID": any,
    "_highlightResult": {
        "title": {
            "value": JSX.Element,
            "matchLevel": string,
            "fullyHighlighted": boolean,
            "matchedWords": Array<string>
        },
        "url": {
            "value": string,
            "matchLevel": string,
            "matchedWords": []
        },
        "author": {
            "value": string,
            "matchLevel": string,
            "matchedWords": []
        }
    }
}

const News: React.FC = ({}) => {
    const [data, setData] = useState( {hits: [] as Array<HitsItemType>} )// пока пустой массив, сюда придут данные с сервера
    const [query, setQuery] = useState<string>( "react" )// поисковый запрос
    const [onChangeQuery, setOnChangeQuery] = useState<string>( "react" )// временное значение поиска, обновляется через onChange

    const inputOnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        //
        setOnChangeQuery( event.currentTarget.value )
        // задаем временное значение стейта по onChange input
    };

    const buttonOnClick = () => {
        setQuery( onChangeQuery ) // реакция на кнопку
        //задание в поле поиска query значение из временного onChangeQuery
    };

    const callURL = (query: string) => {
        // вынесли в отдельнюю функцию получение URL запроса
        return `https://hn.algolia.com/api/v1/search?query=${query}`;
    };

    const AsyncF = async (query: string) => {
        // асинхронный запрос
        const result = await axios( callURL( query ) );
        setData( result.data )// задание с массив hits данных с сервера
    }

    useEffect( () => {
        AsyncF( query )// вызов асинхронного запроса по начальному значению поиска query и при его изменениях
    }, [query] )

    const hn = <div>
        <h2 className={commonClasses.pageHeader}>Search by HackerNews</h2>

        <form>
            {/* объединяем input и button*/}
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="введите поисковый запрос"
                    value={onChangeQuery} // привязали value к значению из стейта
                    onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                        // при изменении
                        inputOnChange( event ); // задаем временное значение стейта по onChange input
                    }}
                />

                <Button variant="outline-secondary" // кнопка
                        type='submit'
                        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                            // по клику
                            e.preventDefault(); // отменяем действие по умолчанию (отправка формы)
                            buttonOnClick();
                            //задание в поле поиска query значение из временного onChangeQuery
                        }}
                >
                    Search
                </Button>
            </InputGroup>
        </form>

        {data.hits &&
        <div>
            {data.hits.map( (
                //мапим
                d: HitsItemType
            ) => {
                return <div key={d.objectID}>  {/* key привязываем к map id*/}
                    <ListGroup>
                        <ListGroup.Item variant="Light" className='my-1'>
                            <div>
                                <a href={d.url}>
                                    {d.title}
                                    {d.story_title}
                                </a>
                            </div>

                        </ListGroup.Item>
                    </ListGroup>
                    {/* список ссылок с URL*/}
                </div>
            } )}
        </div>
        }

    </div>
    return <div>
        {hn}{/*отрисовка результатов поиска*/}
    </div>
}

export default News;
