import React from "react"; // импорт реакта
import {Field, reduxForm} from "redux-form";// reduxForm для ввода новых постов
import classes from './Login.module.css' // css обработка

const LoginForm = props => { // компонента формы
    return (
        <form onSubmit={props.handleSubmit}/*привязка сабмита формы к внутренней функции reduxForm - handleSubmit*/>
            <div>
                <div>
                    <Field
                        name="login"// имя поля формы и возвращаемого свойства объекта после сабмита формы
                        component = "input"// компонент - ввод
                        type = "text"// тип - текст
                        placeholder = "login" // текст подсказка при пустом поле
                    />
                </div>
                <div>
                    <Field
                        name="password"// имя поля формы и возвращаемого свойства объекта после сабмита формы
                        component = "input"// компонент - ввод
                        type = "text"// тип - текст
                        placeholder = "password"// текст подсказка при пустом поле
                    />
                </div>
                <div>
                    <Field
                        name="rememberme"// имя поля формы и возвращаемого свойства объекта после сабмита формы
                        component = "input"// компонент - ввод
                        type = "checkbox"// тип - чекбокс
                    />
                </div>
                <div>
                    <button type="submit">Submit</button> {/*кнопка*/}
                </div>
            </div>
        </form>
    )
}

// оберточная компонента формы, задает имя подстейта "LoginForm"
let LoginReduxForm=reduxForm({form: 'loginForm'})(LoginForm)

let onSubmit = (formData) => { // функция реакции на сабмит формы
    console.log(formData)
}

let Login = () => {
    return(
        <div className={classes.loginCommon}/*стиль*/ >
            <h3>Войдите в аккаунт</h3>{/*h3 заголовок*/}
            <LoginReduxForm onSubmit={onSubmit} />{/*вызов формы логина с отсылкой на локальный обработчик сабмита*/}
        </div>

    )
}

export default Login