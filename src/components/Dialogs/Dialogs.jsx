import React, {useEffect} from 'react'; // импорт реакта
import classes from './Dialogs.module.css';// css обработка
import DialogItem from "./DialogItem/DialogItem";// подкомпонента отрисовки диалогов через map
import Message from "./Message/Message";// подкомпонента отрисовки сообщений через map
import {Field, reduxForm, reset} from "redux-form";
import {Input} from "../common/Validation/customFields";
import {maxLengthCreator} from "../common/Validation/validationField";
import ScrollContainer from "../common/Scroll/ScrollContainer";
import userPhotoAva from "../../assets/images/no-image3.png";


const newMessageForm = ({handleSubmit}) => {// компонента формы
    return (
        <form onSubmit={handleSubmit} /*привязка сабмита формы к внутренней функции reduxForm - handleSubmit*/>
            <div className={classes.FieldButtonGreed}>
                <div className={classes.FieldLeft}>
                    <Field
                        name={"newMessageData"}// имя поля формы и возвращаемого свойства объекта после сабмита формы
                        component={Input}//настраиваемый компонент текстовое поле для вывода ошибок ввода
                        validate={[maxLengthCreator(100)]}//Required убрал
                        placeholder={"newMessage"}// текст подсказка при пустом поле
                    />
                </div>
                <div className={classes.buttonRight}>
                    <button type="submit">Submit</button>
                </div>
            </div>
        </form>
    )
}

// оберточная компонента формы, задает имя подстейта "newMessageForm"
const NewMessageReduxForm = reduxForm({form: "newMessageForm"})(newMessageForm)

const Dialogs = ({deleteDialog, dialogUserID, getDialogList, dialogs2, messages2, dispatch, sendMessage, getDialogLastUpdateTime, myID, deleteMessage}) => { // основная компонента отрисовки диалогов

    let dialogElements = dialogs2.map((d) => // подкомпонента отрисовки всех диалогов через map
        {
            let userPhoto = d.userPhoto ? d.userPhoto : userPhotoAva; // если аватарки с сервера нет, подставить заглушку
            return <DialogItem key={d.userId} userName={d.userName} userId={d.userId}
                               userPhoto={userPhoto} dialogUserID={dialogUserID}
                               deleteDialog={deleteDialog} dialogId={d.dialogId}
            />
        }
    );

    let messagesElements = messages2.map((m) => // подкомпонента отрисовки всех сообщений через map
        <Message key={m.id+m.message} message={m.message} myID={myID} userId={m.userId} Date={m.Date} MessageId={m.id}
                 deleteMessage={deleteMessage}/>);

    let onSendMessageClick = (formDataNewMessage) => {// функция отправления данных формы нового сообщения в стейт
        dispatch(reset('newMessageForm'))
        sendMessage(formDataNewMessage.newMessageData);
    };

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
                        height={window.screen.availHeight - 282} // высота поля скрола
                        firstInsideContainer={"DialogsUp"}
                        secondInsideContainer={"DialogsDown"}
                        containerElement={"DialogsContainer123"}
                    /> {/*отрисовка диалогов в скрол контейнере*/}</div>

            </div>
            <div>
                <h3 className={classes.messagesHeader}>Messages</h3>

                <ScrollContainer // обернуть сообщения скролом
                    child={messagesElements}
                    height={window.screen.availHeight - 282} // высота поля скрола
                    firstInsideContainer={"MessagesUp"}
                    secondInsideContainer={"MessagesDown"}
                    containerElement={"MessagesContainer"}
                /> {/*отрисовка сообщений в скрол контейнере*/}
                <div><NewMessageReduxForm
                    onSubmit={onSendMessageClick}/> {/*вызов формы сообщений с отсылкой на локальный обработчик сабмита*/}
                </div>
            </div>
        </div>
    )
}
export default Dialogs;

