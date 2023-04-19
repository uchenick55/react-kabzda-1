import React, {useEffect} from 'react'; // импорт реакта
//import classes from './DialogList.module.css';// css обработка
//import DialogItem from "./DialogItem";// подкомпонента отрисовки диалогов через map
//import userPhotoAva from "../../assets/images/no-image3.png";
import MessagesContainer from "./Messages/MessagesContainer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const DialogList = ({getDialogList, getDialogLastUpdateTime}) => { // основная компонента отрисовки диалогов

    useEffect(() => { // при очередном ререндере
        const id = setInterval(() => { // задать цикл с интервалом в 1 сек
            getDialogLastUpdateTime() // получить время обновления текущего диалога
            getDialogList()// получить диалогЛист (мне кто то написал, или я начал диалог)
        }, 1000)
        return (() => {
            clearInterval(id)
        }) // для сброса цикла при очередном рендере
    }, [getDialogLastUpdateTime, getDialogList]) // useEffect без зависимостей


    return (
        <Row>
            {/* <Col><DialogListRender/></Col>
            {/*отрисовка диалоглиста*/}

            <Col>
                <MessagesContainer/> {/*отрисовка сообщений*/}
            </Col>
        </Row>
    )
}
export default DialogList;

