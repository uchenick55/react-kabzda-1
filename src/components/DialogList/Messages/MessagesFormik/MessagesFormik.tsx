import React from "react";
import {Formik, Form} from "formik"; //формик с компонентами и пользовательским хуком
import * as Yup from 'yup' // валидация форм с помошью сторонней библиотеки Yup
import DisplayFormikState from "../../../common/formikCommon/DisplayFormikState"
import {MyTextInput} from "../../../common/formikCommon/MyFieldsBS"
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import sendSwg from "../../../../assets/images/swg/send-svg2.svg"
import classes from "./MessagesFormik.module.css"

let myInitialValues = { // начальные зачения форм
    newMessage: "",
}
let myValidationSchema = Yup.object({ // валидация форм на required, длину и заполнение полей
})

type DialogFormikType = {
    sendMessage: (NewMessage: string) =>void,
    scrollBottom:() =>void

}
type valuesType = {
    newMessage:string
}
const MessagesFormik:React.FC<DialogFormikType> = ({sendMessage, scrollBottom}) => { // основная компонента с входным колбэком, чтобы забрать данные с форм
    const myOnSubmit = (values:valuesType, {resetForm}:any) => { // действия по сабмиту
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
                    values,
                  }) => ( // обертка для вывода значений ввода в любом месте формы паралельно (или в итоге)
                    <Form>
                        <div className='d-flex d-inline-block justify-content-center align-items-center'>
                            <div  className='col-9'>
                                <MyTextInput // сообщение в MyPostsBS
                                    label=""
                                    autoFocus={true}
                                    name='newMessage'
                                    type='text'
                                    placeholder='Введите ваше сообщение'
                                    leftLabelLength={""}
                                   // autoFocus={true}
                                />
                            </div>
                            <div>
                                <Button variant={"light"} className={"mx-2"}
                                        type="submit" //кнопка отправить форму
                                        onClick={scrollBottom} /*прокрутка вниз при добавлении нового сообщения*/
                                        disabled={!values.newMessage} //скрыть кнопку отправки если нет текста на отправку
                                >

                                    <Image src={sendSwg} className={classes.sendSwg} alt={'Отправить сообщение'}
                                           title={'Отправить сообщение'}/>
                                </Button>
                            </div>
                        </div>
                         <DisplayFormikState/> {/*отображение всего стейта формика*/}
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default MessagesFormik

