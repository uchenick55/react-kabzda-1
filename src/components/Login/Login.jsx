import React from "react"; // импорт реакта
import {Field, reduxForm} from "redux-form";// reduxForm для ввода новых постов
import classes from './Login.module.css'
import styles from './../common/Validation/customFields.module.css'
import {Input} from "../common/Validation/customFields";
import {email, Required} from "../common/Validation/validationField"; // css обработка

const LoginForm = ({handleSubmit, error}) => { // компонента формы
    return (
        <form onSubmit={handleSubmit}/*привязка сабмита формы к внутренней функции reduxForm - handleSubmit*/>
            <div>
                <div>
                    <Field
                        name="email"// имя поля формы и возвращаемого свойства объекта после сабмита формы
                        component ={Input}// компонент - ввод
                        placeholder = "email" // текст подсказка при пустом поле
                        validate={[Required, email]}
                    />
                </div>
                <div>
                    <Field
                        name="password"// имя поля формы и возвращаемого свойства объекта после сабмита формы
                        component ={Input}// компонент - ввод
                        placeholder = "password"// текст подсказка при пустом поле
                        validate={[Required]}
                    />
                </div>
                <div>
                    <Field
                        name="rememberme"// имя поля формы и возвращаемого свойства объекта после сабмита формы
                        component = "input"// компонент - ввод
                        type = "checkbox"// тип - чекбокс
                    />
                    <label> запомнить меня</label>
                </div>
                <div>
                    <button type="submit">Submit</button> {/*кнопка*/}
                </div>
                <div className={styles.commonError}>
                    {/*стилизация красным сообщение об общей ошибке с сервера при неверном логине или пароле*/}
                    {error} {/*вывод сообщения ошибки после диспатча stopSubmit из auth-reducer.jsx */}
                </div>
            </div>
        </form>
    )
}

// оберточная компонента формы, задает имя подстейта "LoginForm"
let LoginReduxForm=reduxForm({form: 'loginForm'})(LoginForm)

let Login = ({postLogin}) => {
    let onSubmit = (formData) => { // функция реакции на сабмит формы с данными от формы formData
        const rememberme= !formData.rememberme?false:formData.rememberme // если галочка rememberme не стоит, то false
        postLogin(formData.email, formData.password, rememberme)//вызов postLoginThunkCreator выше из LoginContainer
    }
    return(
        <div className={classes.loginCommon}/*стиль*/ >
            <h3>Войдите в аккаунт</h3>{/*h3 заголовок*/}
            <LoginReduxForm onSubmit={onSubmit} />{/*вызов формы логина с отсылкой на локальный обработчик сабмита*/}
        </div>

    )
}

export default Login
