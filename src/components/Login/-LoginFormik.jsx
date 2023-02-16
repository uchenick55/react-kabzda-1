import React from "react";
import {Formik, Form} from "formik"; //формик с компонентами и пользовательским хуком
import * as Yup from 'yup' // валидация форм с помошью сторонней библиотеки Yup
import classes from "./Login.module.css"
import {MyTextInput, MyCheckbox} from "../common/formikCommon/MyFields"
import {PointerCursor} from "../Dark_light_theme/globalStyles";
//import DisplayFormikState from "../common/formikCommon/DisplayFormikState"

let myInitialValues = { // начальные зачения форм
    email: "",
    password: "",
    captcha: "",
}
let myValidationSchema = Yup.object({ // валидация форм на required, длину и заполнение полей
    email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
    password: Yup.string()
        .required('Required'),
})

const LoginFormik = ({postLogin, captchaURL, updateCaptcha, loginError}) => { // основная компонента с входным колбэком, чтобы забрать данные с форм
    const myOnSubmit = (values, {resetForm}) => { // действия по сабмиту
        postLogin(values) // колбек, который принмает результат ввода формы
        resetForm()// сбросить значение формы после ввода
    }
    return (
        <>
            <Formik
                initialValues={myInitialValues}
                validationSchema={myValidationSchema}
                onSubmit={myOnSubmit}
            >

                {({
                      handleReset,// обнуление полей
                  }) => ( // обертка для вывода значений ввода в любом месте формы паралельно (или в итоге)
                    <Form className={classes.LoginForm}>
                        <fieldset>
                            <legend>
                                <div className={classes.legendStyle}>Войдите в аккаунт</div>
                            </legend>
                            <MyTextInput // email
                                label="Email Address"
                                name='email'
                                type='email'
                                placeholder='email'
                            />

                            <MyTextInput // password
                                label="Password"
                                name="password"
                                type="password"
                                placeholder='password'
                            />

                            <MyCheckbox name='rememberme'>  {/*чекбокс */}
                                запомнить меня
                            </MyCheckbox>

                            {captchaURL &&
                            <div>
                                <PointerCursor>
                                    <img src={captchaURL} onClick={updateCaptcha} alt="captcha"></img>
                                </PointerCursor>
                                {/*<label htmlFor="captcha">Captcha</label> {/*альтернатива написания input с обработкой ошибок*/}

                                <MyTextInput // email
                                    label=""
                                    name='captcha'
                                    type='text'
                                    placeholder='captcha'
                                />

                            </div>
                            }

                            <button type="submit" > {/*кнопка отправить форму*/}
                                Submit
                            </button>
                            <button type='button' onClick={handleReset}>Reset</button>
                            {/*кнопка сброса к значениям по умолчанию*/}
                            <div className={classes.errorText}>{loginError && loginError}</div>
                        </fieldset>
                        <div/>

                        {/* <DisplayFormikState/> {/*отображение всего стейта формика*/}

                    </Form>

                )}

            </Formik>
        </>
    )
}

export default LoginFormik

