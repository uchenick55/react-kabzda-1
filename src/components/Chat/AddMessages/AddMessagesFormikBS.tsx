import React from "react";
import {Formik, Form, FormikHelpers} from "formik"; //формик с компонентами и пользовательским хуком
import * as Yup from 'yup' // валидация форм с помошью сторонней библиотеки Yup
//import DisplayFormikState from "../../../../common/formikCommon/DisplayFormikState"
import {MyTextInput} from "../../common/formikCommon/MyFieldsBS"
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";

const myInitialValues = { // начальные зачения форм
    newMessage: "",
}
const myValidationSchema = Yup.object({ // валидация форм на required, длину и заполнение полей
})

type MyPostsFormikType = {
    sendMessage: (newMessage:string) => void,
    isDisabled: boolean

}
type ValuesType = {
    newMessage: string
}
const AddMessagesFormik:React.FC<MyPostsFormikType> = ({sendMessage, isDisabled}) => { // основная компонента с входным колбэком, чтобы забрать данные с форм
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

                {() => (
                    <Form>
                        <div>
                            <MyTextInput // сообщение в MyPostsBS
                                label="Новое сообщение"
                                autoFocus={false}
                                name='newMessage'
                                type='text'
                                placeholder='Введите ваше сообщение'
                                leftLabelLength={""}
                                isDisabled = {false}
                            />


                            {/*кнопка сброса к значениям по умолчанию*/}
                            <Stack direction="vertical" gap={1} className={'mt-2'}>
                                <Button type="submit"> {/*кнопка отправить форму*/}
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
