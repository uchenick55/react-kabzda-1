import React, {useEffect} from 'react'; // импорт реакта
import classes from './DialogList.module.css';// css обработка
import DialogItem from "./DialogItem/DialogItem";// подкомпонента отрисовки диалогов через map
import Message from "../Dialog/Message/Message";// подкомпонента отрисовки сообщений через map
import ScrollContainer from "../common/Scroll/ScrollContainer";
import userPhotoAva from "../../assets/images/no-image3.png";
import DialogFormik from "../Dialog/DialogFormik/DialogFormik";
import MessagesElements from "../Dialog/Message/MessagesElements";

const DialogList = ({deleteDialog, dialogUserID, getDialogList, dialogs2, messages2, sendMessage,
                     getDialogLastUpdateTime, myId, deleteMessage}) => { // основная компонента отрисовки диалогов

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

    return (
        <div className={classes.dialogs} /*стиль всех диалогов*/>
            <div>
                <h3 className={classes.dialogListHeader}>dialogList</h3>
                <div className={classes.dialogContainer}>
                    <ScrollContainer // обернуть сообщения скролом
                        child={dialogElements}
                        height={window.screen.availHeight - 277} // высота поля скрола
                        firstInsideContainer={"DialogsUp"}
                        secondInsideContainer={"DialogsDown"}
                        containerElement={"DialogsContainer123"}
                    /> {/*отрисовка диалогов в скрол контейнере*/}</div>

            </div>
            <div>
                <h3 className={classes.messagesHeader}>Messages</h3>

                <ScrollContainer // обернуть сообщения скролом
                    child={<MessagesElements // вынес в отдельную компоненту отрисовку сообщений для ScrollContainer
                        messages2={messages2} // сообщения
                        myId={myId} // мой ID
                        deleteMessage={deleteMessage} // функйцию удаления сообщений
                    />}
                    height={window.screen.availHeight - 300} // высота поля скрола
                    firstInsideContainer={"MessagesUp"}
                    secondInsideContainer={"MessagesDown"}
                    containerElement={"MessagesContainer"}
                /> {/*отрисовка сообщений в скрол контейнере*/}
                <div>
                    <DialogFormik sendMessage={sendMessage}/>{/*вызов формы сообщений*/}
                </div>
            </div>
        </div>
    )
}
export default DialogList;

