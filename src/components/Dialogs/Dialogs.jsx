import React from 'react'; // импорт реакта
import classes from './Dialogs.module.css';// css обработка
import DialogItem from "./DialogItem/DialogItem";// подкомпонента отрисовки диалогов через map
import Message from "./Message/Message";// подкомпонента отрисовки сообщений через map
import {Field, reduxForm} from "redux-form";// reduxForm для ввода новых сообщений

const newMessageForm = (props) => {// компонента формы
    return (
        <form onSubmit={props.handleSubmit} /*привязка сабмита формы к внутренней функции reduxForm - handleSubmit*/>
            <div>
                <div>
                    <Field
                        name={"newMessageData"}// имя поля формы и возвращаемого свойства объекта после сабмита формы
                        component={"input"}// компонент - ввод
                        type={"textarea"}// тип - текстовое поле
                        placeholder={"newMessage"}// текст подсказка при пустом поле
                    />
                </div>
                <div>
                    <button>Submit</button> {/*кнопка*/}
                </div>
            </div>
        </form>
    )
}

// оберточная компонента формы, задает имя подстейта "newMessageForm"
const NewMessageReduxForm = reduxForm({form: "newMessageForm"})(newMessageForm)

const Dialogs = (props) => { // основная компонента отрисовки диалогов

    let dialogElements = props.state.dialogs.map((d) => // подкомпонента отрисовки всех диалогов через map
        <DialogItem name={d.name} id={d.id} avaSrc={d.avaSrc}/>);

    let messagesElements = props.state.messages.map((m) => // подкомпонента отрисовки всех сообщений через map
        <Message message={m.message}/> );

    let onSendMessageClick = (formDataNewMessage) => {// функция отправления данных формы нового сообщения в стейт
        props.sendMessage(formDataNewMessage.newMessageData);
    };

    return (
        <div className={classes.dialogs} /*стиль всех диалогов*/>
            <div className={classes.dialogItems} /*стиль элементов диалога*/ >
                {dialogElements} {/*отрисовка диалогов*/}
            </div>

            <div className={classes.messages}/*стиль всех сообщений*/>
                <div>
                    {messagesElements} {/*отрисовка сообщений*/}
                    <NewMessageReduxForm onSubmit={onSendMessageClick} /> {/*вызов формы сообщений с отсылкой на локальный обработчик сабмита*/}
                </div>
            </div>
        </div>
    )
}
export default Dialogs;

