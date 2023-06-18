//Реализация async и await на классовых кмпонентах
import React, {useEffect, useState} from "react";
import commonClasses from "../common/CommonClasses/common.module.css";
import Button from "react-bootstrap/Button";
import ListGroup from 'react-bootstrap/ListGroup'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import {getNewsThunkCreator} from "../../redux/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {HitsItemType} from "../../types/commonTypes";
import {GlobalStateType} from "../../redux/store-redux";

const RenderInputBtn:React.FC = () => {
    console.log("RenderInputBtn")
    const dispatch = useDispatch()

    const query: string = useSelector((state:GlobalStateType) => state.tasks.newsData.query)// получить query

    const [onChangeQuery, setOnChangeQuery] = useState<string>( query)// временное значение поиска, обновляется через onChange

    const buttonOnClick = () => {
        dispatch( getNewsThunkCreator(onChangeQuery))
    };

    useEffect(()=>{ // при начальной загрузке получить данные по тестовому запросу
        dispatch( getNewsThunkCreator(query))
    },[])

    return <div>

        <form>
            {/* объединяем input и button*/}
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="введите поисковый запрос"
                    value={onChangeQuery} // привязали value к значению из стейта
                    onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                        // при изменении
                        setOnChangeQuery( event.currentTarget.value  ); // задаем временное значение стейта по onChange input
                    }}
                />

                <Button variant="outline-secondary" // кнопка
                        type='submit'
                        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {// по клику
                            e.preventDefault(); // отменяем действие по умолчанию (отправка формы)
                            //задание в поле поиска query значение из временного onChangeQuery
                            buttonOnClick();
                        }}
                >
                    Search
                </Button>
            </InputGroup>
        </form>
    </div>
}

const RenderSearchList:React.FC = () => {
    console.log("RenderSearchList")
    const data: Array<HitsItemType> = useSelector((state:GlobalStateType) => state.tasks.newsData.serverData)
    return <div>
        {data &&
        <div>
            {data.map( ( //мапим
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
        </div>}
    </div>
}
const News: React.FC = () => {
    console.log( "News" )
    return <div>
        <h2 className={commonClasses.pageHeader}>Search by HackerNews</h2>
        <RenderInputBtn/>{/*отрисовка кнопки и поля поиска*/}
        <RenderSearchList/>{/* отрисовка результатов поиска*/}
    </div>
}

export default News;
