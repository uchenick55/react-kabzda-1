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

const DialogFormik = ({sendMessage}) => { // основная компонента с входным колбэком, чтобы забрать данные с форм
    const myOnSubmit = (values, {resetForm}) => { // действия по сабмиту
        sendMessage(values.newMessage) // колбек, который принмает результат ввода формы
        resetForm()// сбросить значение формы после ввода
    }
    const scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );

/*
    alert( 'Высота с учётом прокрутки: ' + scrollHeight );
*/
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
                        <Row>
                            <Stack direction="horizontal" gap={3} className="mx-1">
                                <Col sm>
                                    <MyTextInput // сообщение в MyPostsBS
                                        label=""
                                        name='newMessage'
                                        type='text'
                                        placeholder='Введите ваше сообщение'
                                        autoFocus={true}
                                    />
                                </Col>
{/*                               <Col>
                                   <div className="vr" //разделитель поля поиска и кнопки поиска
                                   />
                               </Col>*/}
                                <Col >
                                    <Button
                                        type="submit" //кнопка отправить форму
                                        onClick={()=>{window.scrollTo(0, scrollHeight)}}
                                    >
                                        Submit
                                    </Button>
                                </Col>
                                {/* <DisplayFormikState/> {/*отображение всего стейта формика*/}
                            </Stack>
                        </Row>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default DialogFormik

