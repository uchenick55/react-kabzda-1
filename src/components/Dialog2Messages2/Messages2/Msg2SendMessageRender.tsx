import React from "react";
import {Formik, Form} from "formik"; //формик с компонентами и пользовательским хуком
import * as Yup from 'yup' // валидация форм с помошью сторонней библиотеки Yup
//import DisplayFormikState from "../../../common/formikCommon/DisplayFormikState"
import {MyTextInput} from "../../common/formikCommon/MyFieldsBS"
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import sendSwg from "../../../assets/images/swg/send-svg2.svg"
import classes from "./Msg2SendMessageRender.module.css"

let myInitialValues = { // начальные зачения форм
    newMessage: "",
}
let myValidationSchema = Yup.object({ // валидация форм на required, длину и заполнение полей
})

type DialogFormikType = {
    Msg2SendMessage: (messageBody: string) =>void,

}
type valuesType = {
    newMessage:string
}
const Msg2SendMessageRender:React.FC<DialogFormikType> = ({Msg2SendMessage}) => { // основная компонента с входным колбэком, чтобы забрать данные с форм
    const myOnSubmit = (values:valuesType, {resetForm}:any) => { // действия по сабмиту
        Msg2SendMessage(values.newMessage) // колбек, который принмает результат ввода формы
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
                                    autoFocus={false}
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
                                        disabled={!values.newMessage} //скрыть кнопку отправки если нет текста на отправку
                                >

                                    <Image src={sendSwg} className={classes.sendSwg} alt={'Отправить сообщение'}
                                           title={'Отправить сообщение'}/>
                                </Button>
                            </div>
                        </div>
                        {/*   <DisplayFormikState/> {/*отображение всего стейта формика*/}
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default React.memo(Msg2SendMessageRender)

