import React from 'react'; // импорт реакта
import classes from './Dialogs.module.css';// css обработка
import DialogItem from "./DialogItem/DialogItem";// подкомпонента отрисовки диалогов через map
import Message from "./Message/Message";// подкомпонента отрисовки сообщений через map
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../common/Validation/customFields";
import {maxLengthCreator, Required} from "../common/Validation/validationField";
import {bedug_mode} from "../../redux/store-redux";
// reduxForm для ввода новых сообщений

const newMessageForm = ({handleSubmit }) => {// компонента формы
    return (
        <form onSubmit={handleSubmit} /*привязка сабмита формы к внутренней функции reduxForm - handleSubmit*/>
            <div>
                <div>
                    <Field
                        name={"newMessageData"}// имя поля формы и возвращаемого свойства объекта после сабмита формы
                        component={Textarea}//настраиваемый компонент текстовое поле для вывода ошибок ввода
                        validate={[Required, maxLengthCreator(30)]}
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

const Dialogs = ({state, myID, sendDialogsThunkCreator}) => { // основная компонента отрисовки диалогов

    let dialogElements = state.dialogs.map((d) => // подкомпонента отрисовки всех диалогов через map
        <DialogItem name={d.name} id={d.id} avaSrc={d.avaSrc}/>);

    let messagesElements = state.messages.map((m) => // подкомпонента отрисовки всех сообщений через map
        <Message message={m.message}/> );

    let onSendMessageClick = (formDataNewMessage) => {// функция отправления данных формы нового сообщения в стейт
       // sendMessage(formDataNewMessage.newMessageData);
        sendDialogsThunkCreator(formDataNewMessage.newMessageData, myID);
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

