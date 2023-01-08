import React from "react"; // импорт реакта
import {Field, reduxForm, reset} from "redux-form";// reduxForm для ввода новых постов
import classes from './Login.module.css'
import styles from './../common/Validation/customFields.module.css'
import {Input} from "../common/Validation/customFields";
import {email, Required} from "../common/Validation/validationField";
import {PointerCursor} from "../Dark_light_theme/globalStyles";

const LoginForm = ({handleSubmit, error, captchaURL, updateCaptcha}) => { // компонента формы
    return (
        <form onSubmit={handleSubmit}/*привязка сабмита формы к внутренней функции reduxForm - handleSubmit*/>
            <fieldset >
                <legend><div className={classes.legendStyle}>Войдите в аккаунт</div></legend>
                <div className={classes.fieldSetStyle}>
                    <div>
                        <Field
                            name="email"// имя поля формы и возвращаемого свойства объекта после сабмита формы
                            component={Input}// компонент - ввод
                            placeholder="email" // текст подсказка при пустом поле
                            validate={[Required, email]}
                        />
                    </div>
                    <div>
                        <Field
                            name="password"// имя поля формы и возвращаемого свойства объекта после сабмита формы
                            component={Input}// компонент - ввод
                            placeholder="password"// текст подсказка при пустом поле
                            validate={[Required]}
                        />
                    </div>
                    <div>
                        <Field
                            name="rememberme"// имя поля формы и возвращаемого свойства объекта после сабмита формы
                            component="input"// компонент - ввод
                            type="checkbox"// тип - чекбокс
                        />
                        <label> запомнить меня</label>
                    </div>
                    {captchaURL &&
                        <div>
                            <PointerCursor>
                                <img src={captchaURL} onClick={updateCaptcha} alt="captcha"></img>
                            </PointerCursor>
                            <Field
                                name="captcha"// имя поля формы и возвращаемого свойства объекта после сабмита формы
                                component={Input}// компонент - ввод
                                placeholder="captcha" // текст подсказка при пустом поле
                                validate={[Required]}
                            />
                        </div>
                    }
                    <div>
                        <button type="submit">Submit</button>
                        {/*кнопка*/}
                    </div>
                    <div className={styles.commonError}>
                        {/*стилизация красным сообщение об общей ошибке с сервера при неверном логине или пароле*/}
                        {error} {/*вывод сообщения ошибки после диспатча stopSubmit из auth-reducer.jsx */}
                    </div>

                </div>
            </fieldset>
        </form>
    )
}

// оберточная компонента формы, задает имя подстейта "LoginForm"
let LoginReduxForm = reduxForm({form: 'LoginForm'})(LoginForm)

let Login = ({postLogin, captchaURL, updateCaptcha, dispatch}) => {

    let resetFormFields = () => { // альтернативный вариант сброса формы, можно подключить к сабмиту
        dispatch(reset('LoginForm')) // сброс полей формы после ввода

    }
    let onSubmit = (formData) => { // функция реакции на сабмит формы с данными от формы formData
        const rememberme = !formData.rememberme ? false : formData.rememberme // если галочка rememberme не стоит, то false
        postLogin(formData.email, formData.password, rememberme, formData.captcha)//вызов postLoginThunkCreator выше из LoginContainer
        resetFormFields() // сбросить поля формы после отправки данных полей
    }
    return (
        <div className={classes.loginCommon}/*стиль*/ >
            <div className={classes.LoginForm}>
                <div><LoginReduxForm
                    onSubmit={onSubmit}
                    captchaURL={captchaURL} // отображение каптчи, если она не пустая
                    updateCaptcha={updateCaptcha}
                />{/*вызов формы логина с отсылкой на локальный обработчик сабмита*/}
                </div>
            </div>

        </div>

    )
}

export default Login
