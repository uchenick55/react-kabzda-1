import React from "react";
import {Formik, Form} from "formik"; //формик с компонентами и пользовательским хуком
import * as Yup from 'yup' // валидация форм с помошью сторонней библиотеки Yup
import classes from "./Dialog.module.css"
//import DisplayFormikState from "../../common/formikCommon/DisplayFormikState"
import {MyTextInput} from "../../common/formikCommon/MyFields"

let myInitialValues = { // начальные зачения форм
    newMessage: "",
}
let myValidationSchema = Yup.object({ // валидация форм на required, длину и заполнение полей
})

const DialogFormik = ({sendMessage}) => { // основная компонента с входным колбэком, чтобы забрать данные с форм
    const myOnSubmit = (values, {resetForm}) => { // действия по сабмиту
        sendMessage(values.newMessage) // колбек, который принмает результат ввода формы
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
                    <Form className={classes.MyPosts}>
                        <div className={classes.fieldButtonGrid}>
                            <div>
                                <MyTextInput // сообщение в MyPosts
                                    label=""
                                    name='newMessage'
                                    type='text'
                                    placeholder='Введите ваше сообщение'
                                    autoFocus ={true}
                                />
                            </div>
                            <div>
                                <button type="submit"> {/*кнопка отправить форму*/}
                                    Submit
                                </button>
                            </div>
                        </div>
                        {/* <DisplayFormikState/> {/*отображение всего стейта формика*/}
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default DialogFormik

