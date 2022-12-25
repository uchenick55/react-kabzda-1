import React from "react"; // импорт реакта
import {Field, reduxForm} from "redux-form";// reduxForm для ввода новых постов
import classes from './FeedBack.module.css'
import {Input, Textarea} from "../common/Validation/customFields";
import {email, Required} from "../common/Validation/validationField";

const FeedBackForm2 = ({handleSubmit}) => { // компонента формы
    return (
        <form onSubmit={handleSubmit}/*привязка сабмита формы к внутренней функции reduxForm - handleSubmit*/>
            <div>
                <div>
                    <Field
                        name="name"// имя поля формы и возвращаемого свойства объекта после сабмита формы
                        component={Input}// компонент - ввод
                        placeholder="Ваше имя (не обязательно)" // текст подсказка при пустом поле
                        validate={[]}
                    />
                </div>
                <div>
                    <Field
                        name="email"// имя поля формы и возвращаемого свойства объекта после сабмита формы
                        component={Input}// компонент - ввод
                        placeholder="Ваш Email (не обязательно)" // текст подсказка при пустом поле
                        validate={[email]}
                    />
                </div>
                <div>
                    <Field
                        name="message"// имя поля формы и возвращаемого свойства объекта после сабмита формы
                        component={Textarea}// компонент - ввод
                        placeholder="Введите сообщение" // текст подсказка при пустом поле
                        validate={[Required]}
                    />
                </div>
                <div>
                    <button type="submit">Отправить сообщение</button>
                    {/*кнопка*/}
                </div>
            </div>
        </form>
    )
}

// оберточная компонента формы, задает имя подстейта "FeedBackForm2"
let FeedBackReduxForm = reduxForm({form: 'FeedBackForm2'})(FeedBackForm2)

let FeedBackForm = ({sendFeedBack}) => {

    let onSubmit = (formData) => { // функция реакции на сабмит формы с данными от формы formData
        let data = {name: formData.name, email: formData.email, message: formData.message}
        sendFeedBack(data)//вызов функции из контейнера на диспатч санки feedBack
    }
    return (
        <div className={classes.FeedBackCommon}/*стиль*/ >
            <h3>Обратная связь</h3>{/*h3 заголовок*/}
            <div className={classes.FeedBackForm2}>
                <div><FeedBackReduxForm
                    onSubmit={onSubmit}
                />{/*вызов формы логина с отсылкой на локальный обработчик сабмита*/}
                </div>
            </div>
        </div>
    )
}

export default FeedBackForm
