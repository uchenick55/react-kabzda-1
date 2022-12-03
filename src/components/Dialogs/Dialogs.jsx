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
    let scrollToBottom = function () {
        scroll.scrollToBottom();
    };

    return (
        <div className={classes.dialogs} /*стиль всех диалогов*/>
            <div className={classes.dialogItems} /*стиль элементов диалога*/ >
                {dialogElements} {/*отрисовка диалогов*/}
            </div>

            <div className={classes.messages}/*стиль всех сообщений*/>
                <div>


                    <div>
                        <Element
                            id="containerElement"
                            style={{
                                height: "400px", // высота контейнера с прокруткой
                                overflow: "scroll", // прокрутка внутри контейнера
                                marginBottom: "0px" // нижний оступ
                            }}
                        >
                            <Element name="firstInsideContainer"
                                     style={{}}></Element> {/*якорь для прокрутки вверх внутри скрола*/}
                            {messagesElements} {/*отрисовка сообщений*/}
                            <Element name="secondInsideContainer"
                                     style={{}}></Element>{/*якорь для прокрутки вниз внутри скрола*/}
                        </Element>
                    </div>
                    <PointerCursor>
                        <Link activeClass="active" to="firstInsideContainer" smooth={true} duration={250}
                              containerId="containerElement">
                            Scroll UP {/*ссылка для прокрутки вверх*/}
                        </Link>
                        <Link activeClass="active" to="secondInsideContainer" smooth={true} duration={250}
                              containerId="containerElement">
                            Scroll Down {/*ссылка для прокрутки вниз*/}
                        </Link>
                    </PointerCursor>

                    <NewMessageReduxForm
                        onSubmit={onSendMessageClick}/> {/*вызов формы сообщений с отсылкой на локальный обработчик сабмита*/}

                </div>
            </div>


        </div>
    )
}
export default Dialogs;

