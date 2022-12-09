import React, {useEffect} from 'react'; // импорт реакта
import classes from './Dialogs.module.css';// css обработка
import DialogItem from "./DialogItem/DialogItem";// подкомпонента отрисовки диалогов через map
import Message from "./Message/Message";// подкомпонента отрисовки сообщений через map
import {Field, reduxForm, reset} from "redux-form";
import {Input, Textarea} from "../common/Validation/customFields";
import {maxLengthCreator, Required} from "../common/Validation/validationField";
import {bedug_mode} from "../../redux/store-redux";
import ScrollContainer from "../common/Scroll/ScrollContainer";


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

const Dialogs = ({getDialogList, dialogs2, messages2, dispatch, sendMessage, getDialogLastUpdateTime, myID, deleteMessage}) => { // основная компонента отрисовки диалогов

    let dialogElements = dialogs2.map((d) => // подкомпонента отрисовки всех диалогов через map
        <DialogItem userName={d.userName} userId={d.userId} userPhoto={d.userPhoto}/>);

    let messagesElements = messages2.map((m) => // подкомпонента отрисовки всех сообщений через map
        <Message message={m.message} myID={myID} userId={m.userId} Date={m.Date} MessageId={m.id}
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
    }, []) // useEffect без зависимостей

    return (
        <div className={classes.dialogs} /*стиль всех диалогов*/>
            <div>
                <ScrollContainer // обернуть диалоги скролом
                    child={dialogElements}
                    height={window.screen.availHeight - 280} // высота поля скрола
                    firstInsideContainer={"DialogsUp"}
                    secondInsideContainer={"DialogsDown"}
                    containerElement={"DialogsContainer"}
                /> {/*отрисовка диалогов в скрол контейнере*/}
            </div>
            <div>
                <ScrollContainer // обернуть сообщения скролом
                    child={messagesElements}
                    height={window.screen.availHeight - 280} // высота поля скрола
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

