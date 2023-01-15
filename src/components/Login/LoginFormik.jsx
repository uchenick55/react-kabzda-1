import React from "react";
import {Formik, Form, useField, Field, ErrorMessage, useFormikContext} from "formik"; //формик с компонентами и пользовательским хуком
import * as Yup from 'yup' // валидация форм с помошью сторонней библиотеки Yup
import classes from "./Login.module.css"
import DisplayFormikState from "../common/formikCommon/DisplayFormikState"
import {MyTextInput, MyTextArea, MySelect, MyCheckbox} from "../common/formikCommon/MyFields"
import {PointerCursor} from "../Dark_light_theme/globalStyles";
import {Input} from "../common/Validation/customFields";
import {Required} from "../common/Validation/validationField";

let myInitialValues = { // начальные зачения форм
    email: "",
    password: ""
}
let myValidationSchema = Yup.object({ // валидация форм на required, длину и заполнение полей
    email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
    password: Yup.string()
        .required('Required'),
})


const SignupForm = ({postLogin, captchaURL, updateCaptcha}) => { // основная компонента с входным колбэком, чтобы забрать данные с форм
    const myOnSubmit = (values) => { // действия по сабмиту
        postLogin(values) // колбек, который принмает результат ввода формы
    }
    return (
        <>
            <Formik
                initialValues={myInitialValues}
                validationSchema={myValidationSchema}
                onSubmit={myOnSubmit}
            >

                {({
                      values, // значения полей (можно взять любое)
                      handleReset,// обнуление полей
                      errors, // все ошибки ввода
                      isValid
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
                                <MyTextInput // ввод каптчи при 5 неверных попытках вводах формы
                                    label="Captcha"
                                    name='captcha'
                                    type='text'
                                    placeholder='captcha'
                                />
                            </div>
                            }

                            <button type="submit"> {/*кнопка отправить форму*/}
                                Submit
                            </button>
                            <button type='button' onClick={handleReset}>Reset</button>
                            {/*кнопка сбора со значениям по умолчанию*/}
                        </fieldset>
                        <div></div>

                        <DisplayFormikState/> {/*отображение всего стейта формика*/}

                    </Form>

                )}

            </Formik>
        </>
    )
}

export default SignupForm

