import React from "react";
import {Formik, Form} from "formik"; //формик с компонентами и пользовательским хуком
import * as Yup from 'yup' // валидация форм с помошью сторонней библиотеки Yup
import classes from "./FeedBackFormik.module.css"
//import DisplayFormikState from "../../common/formikCommon/DisplayFormikState"
import {MyTextArea, MyTextInput} from "../../common/formikCommon/MyFields"

let myInitialValues = { // начальные зачения форм
    newMessage: "",
}
let myValidationSchema = Yup.object({ // валидация форм на required, длину и заполнение полей
})

const FeedBackFormik = ({sendFeedBack}) => { // основная компонента с входным колбэком, чтобы забрать данные с форм
    const myOnSubmit = (values, {resetForm}) => { // действия по сабмиту
        sendFeedBack(values) // колбек, который принмает результат ввода формы
        resetForm()// сбросить значение формы после ввода
    }

    return (
        <fieldset>
                <legend>
                    <div className={classes.legendStyle}>Обратная связь</div>
                </legend>
            <Formik
                initialValues={myInitialValues}
                validationSchema={myValidationSchema}
                onSubmit={myOnSubmit}
            >

                {({
                      handleReset,// обнуление полей
                  }) => ( // обертка для вывода значений ввода в любом месте формы паралельно (или в итоге)
                    <Form>
                        <div className={classes.fieldButtonGrid}>
                            <div>
                                <MyTextInput // сообщение в MyPosts
                                    label="Ваше имя"
                                    name='name'
                                    type='text'
                                    placeholder='имя'
                                />
                                <MyTextInput // email
                                    label="Email"
                                    name='email'
                                    type='email'
                                    placeholder='email'
                                />
                               <MyTextArea // сообщение в MyPosts
                                   label="Введите сообщение*"
                                   name='message'
                                   type='textarea'
                                   placeholder='сообщение'
                                   autoFocus={true}
                               />
                                <button type="submit"> {/*кнопка отправить форму*/}
                                    Submit
                                </button>
                            </div>
                        </div>
                        {/* <DisplayFormikState/> {/*отображение всего стейта формика*/}
                    </Form>
                )}
            </Formik>
        </fieldset>
    )
}

export default FeedBackFormik

