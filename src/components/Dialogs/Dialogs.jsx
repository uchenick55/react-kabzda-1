import React from 'react'; // импорт реакта
import classes from './Dialogs.module.css';// css обработка
import DialogItem from "./DialogItem/DialogItem";// подкомпонента отрисовки диалогов через map
import Message from "./Message/Message";// подкомпонента отрисовки сообщений через map
import {Field, reduxForm, reset} from "redux-form";
import {Textarea} from "../common/Validation/customFields";
import {maxLengthCreator, Required} from "../common/Validation/validationField";
import {bedug_mode} from "../../redux/store-redux";
import Scroll, {animateScroll as scroll} from "react-scroll";
import {PointerCursor} from "../Dark_light_theme/globalStyles";
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

const Dialogs = ({state, myID, sendDialogsThunkCreator, dispatch}) => { // основная компонента отрисовки диалогов

    let dialogElements = state.dialogs.map((d) => // подкомпонента отрисовки всех диалогов через map
        <DialogItem name={d.name} id={d.id} avaSrc={d.avaSrc}/>);

    let messagesElements = state.messages2.map((m) => // подкомпонента отрисовки всех сообщений через map
        <Message message={m.message}/>);

    let onSendMessageClick = (formDataNewMessage) => {// функция отправления данных формы нового сообщения в стейт
        dispatch(reset('newMessageForm'))
        sendDialogsThunkCreator(formDataNewMessage.newMessageData, myID);
    };
    let Link = Scroll.Link;
    let Element = Scroll.Element;

    return (
        <div className={classes.dialogs} /*стиль всех диалогов*/>
            <div className={classes.dialogItems} /*стиль элементов диалога*/ >
                {dialogElements} {/*отрисовка диалогов*/}
            </div>

            <div className={classes.messages}/*стиль всех сообщений*/>
                <div>
                    <div>

                    </div>
                    <ScrollContainer  child={messagesElements} height={"380px"} /> {/*заключение контента с скролл*/}
                    
                    <NewMessageReduxForm
                        onSubmit={onSendMessageClick}/> {/*вызов формы сообщений с отсылкой на локальный обработчик сабмита*/}

                </div>
            </div>


        </div>
    )
}
export default Dialogs;

