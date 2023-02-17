import React from "react";
import {Formik, Form} from "formik"; //формик с компонентами и пользовательским хуком
import * as Yup from 'yup' // валидация форм с помошью сторонней библиотеки Yup
//import DisplayFormikState from "../../common/formikCommon/DisplayFormikState"
import {MyTextInput} from "../../../common/formikCommon/MyFieldsBS"
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

let myInitialValues = { // начальные зачения форм
    newMessage: "",
}
let myValidationSchema = Yup.object({ // валидация форм на required, длину и заполнение полей
})

const DialogFormik = ({sendMessage, scrollBottom}) => { // основная компонента с входным колбэком, чтобы забрать данные с форм
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
                    <Form>
                        <div class='d-flex d-inline-block justify-content-center align-items-center'>
                            <div  class='col-9'>
                                <MyTextInput // сообщение в MyPostsBS
                                    label=""
                                    name='newMessage'
                                    type='text'
                                    placeholder='Введите ваше сообщение'
                                    autoFocus={true}
                                />
                            </div>
                            <div>
                                <Button
                                    type="submit" //кнопка отправить форму
                                    onClick={scrollBottom} /*прокрутка вниз при добавлении нового сообщения*/
                                >
                                    Submit
                                </Button>
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

