import React from "react";
import {Formik, Form} from "formik"; //формик с компонентами и пользовательским хуком
import * as Yup from 'yup' // валидация форм с помошью сторонней библиотеки Yup
//import DisplayFormikState from "../../common/formikCommon/DisplayFormikState"
import {MyTextInput} from "../../common/formikCommon/MyFieldsBS"
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";

let myInitialValues = { // начальные зачения форм
    name: "",
    email: "",
    message: "",
}
let myValidationSchema = Yup.object({ // валидация форм на required, длину и заполнение полей
    email: Yup.string()
        .email('Invalid email address'),
    message: Yup.string()
        .required('Required'),
})

const FeedBackFormik = ({sendFeedBack}) => { // основная компонента с входным колбэком, чтобы забрать данные с форм
    const myOnSubmit = (values, {resetForm}) => { // действия по сабмиту
        sendFeedBack(values) // колбек, который принмает результат ввода формы
        resetForm()// сбросить значение формы после ввода
    }

    return (<div>
            <Formik
                initialValues={myInitialValues}
                validationSchema={myValidationSchema}
                onSubmit={myOnSubmit}
            >

                {({
                      handleReset,// обнуление полей
                  }) => ( // обертка для вывода значений ввода в любом месте формы паралельно (или в итоге)
                    <Form>
                        <div>
                            <div>
                                <MyTextInput // сообщение в MyPostsBS
                                    label="Ваше имя"
                                    name='name'
                                    type='text'
                                    placeholder='имя'
                                    leftLabelLength='7rem'

                                />

                                <MyTextInput // email
                                    label="Email"
                                    name='email'
                                    type='email'
                                    placeholder='email'
                                    leftLabelLength='7rem'
                                />

                                <MyTextInput // сообщение
                                    label="Сообщение * "
                                    name='message'
                                    type='textarea'
                                    placeholder='сообщение'
                                    //  autoFocus={true}
                                    leftLabelLength='7rem'
                                />

                                <Row className="mx-1">

                                    <Button type="submit"> {/*кнопка отправить форму*/}
                                        Submit
                                    </Button>
                                </Row>
                            </div>
                        </div>
                        {/* <DisplayFormikState/> {/*отображение всего стейта формика*/}
                    </Form>
                )}
            </Formik>
        </div>

    )
}

export default FeedBackFormik

