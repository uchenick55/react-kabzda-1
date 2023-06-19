import React, {memo} from "react";
import {Formik, Form} from "formik"; //формик с компонентами и пользовательским хуком
import * as Yup from 'yup' // валидация форм с помошью сторонней библиотеки Yup
//import DisplayFormikState from "../../../common/formikCommon/DisplayFormikState"
import Button from "react-bootstrap/Button";
import sendSwg from "../../../assets/images/swg/send-svg2.svg"
import classes from "./Msg2SendMessageRender.module.css"
import {ImageMemo, MyTextInputMemo} from "../../common/BootstrapMemo/BootstrapMemo";

const myInitialValues = { // начальные зачения форм
    newMessage: "",
}
const myValidationSchema = Yup.object( { // валидация форм на required, длину и заполнение полей
} )

type DialogFormikType = {
    Msg2SendMessage: (messageBody: string) => void,

}
type valuesType = {
    newMessage: string
}
const Msg2SendMessageRender: React.FC<DialogFormikType> = memo (({Msg2SendMessage}) => { // основная компонента с входным колбэком, чтобы забрать данные с форм
    console.log( "ввод новых сообщений" )
    const myOnSubmit = (values: valuesType, {resetForm}: any) => { // действия по сабмиту
        Msg2SendMessage( values.newMessage ) // колбек, который принмает результат ввода формы
        resetForm()// сбросить значение формы после ввода
    }

    return <div>
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

