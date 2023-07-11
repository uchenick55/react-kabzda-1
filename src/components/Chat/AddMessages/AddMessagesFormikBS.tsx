import React from "react";
import {Formik, Form, FormikHelpers} from "formik"; //формик с компонентами и пользовательским хуком
import * as Yup from 'yup' // валидация форм с помошью сторонней библиотеки Yup
//import DisplayFormikState from "../../../../common/formikCommon/DisplayFormikState"
import {MyTextInput} from "../../common/formikCommon/MyFieldsBS"
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import {ChannelStatusType} from "../../api/chat-api";

const myInitialValues = { // начальные зачения форм
    newMessage: "",
}
const myValidationSchema = Yup.object({ // валидация форм на required, длину и заполнение полей
})

type MyPostsFormikType = {
    sendMessage: (newMessage:string) => void,
    channelStatus: ChannelStatusType
}
type ValuesType = {
    newMessage: string
}
const AddMessagesFormik:React.FC<MyPostsFormikType> = ({sendMessage, channelStatus}) => { // основная компонента с входным колбэком, чтобы забрать данные с форм
    const myOnSubmit = (values:ValuesType, {resetForm}:FormikHelpers<{ newMessage: string; }>) => { // действия по сабмиту
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

                {({values}) => (
                    <Form>
                        <div>
                            <MyTextInput // сообщение в MyPostsBS
                                label="Новое сообщение"
                                autoFocus={false}
                                name='newMessage'
                                type='text'
                                placeholder='Введите ваше сообщение'
                                leftLabelLength={""}
                                isDisabled = {channelStatus!=="ready"}  // деактивировать поле ввода, если статус нанала не ready
                            />


                            {/*кнопка сброса к значениям по умолчанию*/}
                            <Stack direction="vertical" gap={1} className={'mt-2'}>
                                <Button //кнопка отправить форму
                                    disabled={ // деактивировать кнопку отправки
                                        channelStatus!=="ready" || // если статус канала не равен ready
                                        values.newMessage.length===0 // или поле ввода пустое
                                    }
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            </Stack>

                        </div>
                        <div/>
                        {/*  <DisplayFormikState/> {/*отображение всего стейта формика*/}
                    </Form>

                )}

            </Formik>
        </>
    )
}

export default AddMessagesFormik
