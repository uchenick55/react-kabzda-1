import React from "react";
import {Formik, Form, FormikHelpers} from "formik"; //формик с компонентами и пользовательским хуком
import * as Yup from 'yup' // валидация форм с помошью сторонней библиотеки Yup
import Button from "react-bootstrap/Button";
import sendSwg from "../../../../assets/images/swg/send-svg2.svg"
import classes from "../msg2.module.css"
import {ImageMemo, MyTextInputMemo} from "../../../common/BootstrapMemo/BootstrapMemo";
//import DisplayFormikState from "../../../common/formikCommon/DisplayFormikState"

const myInitialValues = { // начальные зачения форм
    newMessage: "",
}
const myValidationSchema = Yup.object( { // валидация форм на required, длину и заполнение полей
} )

type DialogFormikType = {
    isMobile: boolean // флаг, это мобильное разрешение?
    Msg2SendMessage: (messageBody: string) => void,
}
type ValuesType = {
    newMessage: string
}
const Msg2SendMessageRender: React.FC<DialogFormikType> = (({Msg2SendMessage, isMobile}) => { // основная компонента с входным колбэком, чтобы забрать данные с форм
    console.log( "поле ввода новых сообщений" )
    const myOnSubmit = (values: ValuesType, {resetForm}: FormikHelpers<{ newMessage: string; }>) => { // действия по сабмиту
        Msg2SendMessage( values.newMessage ) // колбек, который принмает результат ввода формы
        resetForm()// сбросить значение формы после ввода
    }

    return <div className={`${classes.Fixed} ${classes.messages2PrintMessage} ${isMobile ?
        classes.MobileMessagesLeft : classes.DesktopMessagesLeft}`}>
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
                        <div className='col-9'>
                            <MyTextInputMemo // сообщение в MyPostsBS
                                label=""
                                autoFocus={false}
                                name='newMessage'
                                type='text'
                                placeholder='Введите ваше сообщение'
                                leftLabelLength={""}
                                // autoFocus={true}
                            />
                        </div>
                        <Button variant={"light"} className={"mx-2"}
                                type="submit" //кнопка отправить форму
                                disabled={!values.newMessage} //скрыть кнопку отправки если нет текста на отправку
                        >

                            <ImageMemo src={sendSwg} className={classes.sendSwg} alt={'Отправить сообщение'}
                                       title={'Отправить сообщение'}/>
                        </Button>
                    </div>
                    {/*   <DisplayFormikState/> {/*отображение всего стейта формика*/}
                </Form>
            )}
        </Formik>
    </div>
})

export default Msg2SendMessageRender

