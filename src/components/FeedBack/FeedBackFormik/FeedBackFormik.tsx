import React from "react";
import {Formik, Form, FormikHelpers} from "formik"; //формик с компонентами и пользовательским хуком
import * as Yup from 'yup' // валидация форм с помошью сторонней библиотеки Yup
//import DisplayFormikState from "../../common/formikCommon/DisplayFormikState"
import {MyTextInput} from "../../common/formikCommon/MyFieldsBS"
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import {ApiFeedBackDataType} from "../../common/types/commonTypes";

const myInitialValues = { // начальные зачения форм
    name: "",
    email: "",
    message: "",
}
const myValidationSchema = Yup.object({ // валидация форм на required, длину и заполнение полей
    email: Yup.string()
        .email('Invalid email address'),
    message: Yup.string()
        .required('Required'),
})

type FeedBackFormikType = {
    sendFeedBack: (data:ApiFeedBackDataType) => void,
}
const FeedBackFormik:React.FC<FeedBackFormikType> = ({sendFeedBack}) => { // основная компонента с входным колбэком, чтобы забрать данные с форм
    const myOnSubmit = (
        values:ApiFeedBackDataType,
        {resetForm}:FormikHelpers<{ name: string; email: string; message: string; }>
    ) => { // действия по сабмиту
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
                                    autoFocus={false}
                                    name='name'
                                    type='text'
                                    placeholder='имя'
                                    leftLabelLength='7rem'

                                />

                                <MyTextInput // email
                                    label="Email"
                                    autoFocus={false}
                                    name='email'
                                    type='email'
                                    placeholder='email'
                                    leftLabelLength='7rem'
                                />

                                <MyTextInput // сообщение
                                    label="Сообщение * "
                                    autoFocus={false}
                                    name='message'
                                    type='textarea'
                                    placeholder='сообщение'
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

