import React, {useEffect} from 'react'; // импорт реакта
import classes from './Dialogs.module.css';// css обработка
import DialogItem from "./DialogItem/DialogItem";// подкомпонента отрисовки диалогов через map
import Message from "./Message/Message";// подкомпонента отрисовки сообщений через map
import {Field, reduxForm, reset} from "redux-form";
import {Textarea} from "../common/Validation/customFields";
import {maxLengthCreator, Required} from "../common/Validation/validationField";
import {bedug_mode} from "../../redux/store-redux";
import ScrollContainer from "../common/Scroll/ScrollContainer";


const newMessageForm = ({handleSubmit}) => {// компонента формы
    return (
        <form onSubmit={handleSubmit} /*привязка сабмита формы к внутренней функции reduxForm - handleSubmit*/>
            <div>
                <div>
                    <Field
                        name={"newMessageData"}// имя поля формы и возвращаемого свойства объекта после сабмита формы
                        component={Textarea}//настраиваемый компонент текстовое поле для вывода ошибок ввода
                        validate={[Required, maxLengthCreator(60)]}
                        placeholder={"newMessage"}// текст подсказка при пустом поле
                    />
                </div>
                <div>
                    <button>Submit</button>
                    {/*кнопка*/}
                </div>
            </div>
        </form>
    )
}

// оберточная компонента формы, задает имя подстейта "newMessageForm"
const NewMessageReduxForm = reduxForm({form: "newMessageForm"})(newMessageForm)

const Dialogs = ({ dialogs, messages2, dispatch, sendMessage, getDialogs, getDialogLastUpdateTime}) => { // основная компонента отрисовки диалогов

    let dialogElements = dialogs.map((d) => // подкомпонента отрисовки всех диалогов через map
        <DialogItem name={d.name} id={d.id} avaSrc={d.avaSrc}/>);

    let messagesElements = messages2.map((m) => // подкомпонента отрисовки всех сообщений через map
        <Message message={m.message}/>);

    let onSendMessageClick = (formDataNewMessage) => {// функция отправления данных формы нового сообщения в стейт
        dispatch(reset('newMessageForm'))
        sendMessage(formDataNewMessage.newMessageData);
    };

    useEffect(()=>{
        const id = setInterval(()=>{
            getDialogs()
            getDialogLastUpdateTime()
         //   getDialogLastUpdateTime()
        }, 1000)
        return (()=>{clearInterval(id)})
    }, [])

    return (
        <div className={classes.dialogs} /*стиль всех диалогов*/>
            <div className={classes.dialogItems} /*стиль элементов диалога*/ >
                <ScrollContainer
                    child={dialogElements}
                    height={"470px"}
                    firstInsideContainer={"DialogsUp"}
                    secondInsideContainer={"DialogsDown"}
                    containerElement={"DialogsContainer"}
                /> {/*отрисовка диалогов в скрол контейнере*/}
            </div>
            <div className={classes.messages}/*стиль всех сообщений*/>
                <div>
                    <ScrollContainer
                        child={messagesElements}
                        height={"360px"}
                        firstInsideContainer={"MessagesUp"}
                        secondInsideContainer={"MessagesDown"}
                        containerElement={"MessagesContainer"}
                    /> {/*отрисовка сообщений в скрол контейнере*/}
                    <NewMessageReduxForm
                        onSubmit={onSendMessageClick}/> {/*вызов формы сообщений с отсылкой на локальный обработчик сабмита*/}
                </div>
            </div>


        </div>
    )
}
export default Dialogs;

