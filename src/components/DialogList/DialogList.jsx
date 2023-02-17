import React, {useEffect} from 'react'; // импорт реакта
import classes from './DialogList.module.css';// css обработка
import DialogItem from "./DialogItem";// подкомпонента отрисовки диалогов через map
import ScrollContainer from "../common/Scroll/ScrollContainer";
import userPhotoAva from "../../assets/images/no-image3.png";
import MessagesContainer from "./Messages/MessagesContainer";
import commonClasses from "../common/CommonClasses/common.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const DialogList = ({deleteDialog, dialogUserID, getDialogList, dialogs2,
                     getDialogLastUpdateTime}) => { // основная компонента отрисовки диалогов

    let dialogElements = dialogs2.map((d) => // подкомпонента отрисовки всех диалогов через map
        {
            let userPhoto = d.userPhoto ? d.userPhoto : userPhotoAva; // если аватарки с сервера нет, подставить заглушку
            return <DialogItem key={d.userId} userName={d.userName} userId={d.userId}
                               userPhoto={userPhoto} dialogUserID={dialogUserID}
                               deleteDialog={deleteDialog} dialogId={d.dialogId}
            />
        }
    );

    useEffect(() => { // при очередном ререндере
        const id = setInterval(() => { // задать цикл с интервалом в 1 сек
            getDialogLastUpdateTime() // получить время обновления текущего диалога
            getDialogList()// получить диалогЛист (мне кто то написал, или я начал диалог)
        }, 1000)
        return (() => {
            clearInterval(id)
        }) // для сброса цикла при очередном рендере
    }, [getDialogLastUpdateTime, getDialogList]) // useEffect без зависимостей

    const DialogListRender = () => {
        return <div>
            <h3 className={classes.dialogListHeader}>dialogList</h3>
            <div className={classes.dialogContainer}>
                {dialogElements} {/*отрисовка диалогов*/}
            </div>
        </div>
    }

    return (
        <Row>
{/*
            <h2 className={commonClasses.pageHeader}>Dialogs</h2>
*/}

                {/* <Col><DialogListRender/></Col> {/*отрисовка диалоглиста*/}

            <Col>
                <MessagesContainer/> {/*отрисовка сообщений*/}
            </Col>
        </Row>
    )
}
export default DialogList;

