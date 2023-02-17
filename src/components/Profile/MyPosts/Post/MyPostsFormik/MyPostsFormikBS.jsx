import React from "react";
import {Formik, Form} from "formik"; //формик с компонентами и пользовательским хуком
import * as Yup from 'yup' // валидация форм с помошью сторонней библиотеки Yup
import classes from "./MyPosts.module.css"
//import DisplayFormikState from "../../../../common/formikCommon/DisplayFormikState"
import {MyTextInput} from "../../../../common/formikCommon/MyFieldsBS"
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

let myInitialValues = { // начальные зачения форм
    newPost: "",
}
let myValidationSchema = Yup.object({ // валидация форм на required, длину и заполнение полей
})

const MyPostsFormik = ({addPost}) => { // основная компонента с входным колбэком, чтобы забрать данные с форм
    const myOnSubmit = (values, {resetForm}) => { // действия по сабмиту
        addPost(values.newPost) // колбек, который принмает результат ввода формы
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
                    <Form className={classes.MyPosts}>
                        <div>
                            <MyTextInput // сообщение в MyPostsBS
                                label="Пост"
                                name='newPost'
                                type='textarea'
                                placeholder='Введите ваше сообщение'
                            />

                            {/*кнопка сброса к значениям по умолчанию*/}
                            <Stack direction="vertical" gap={1} className={'mt-2'}>
                                <Button type="submit1"> {/*кнопка отправить форму*/}
                                    Submit
                                </Button>
                                <Button
                                    variant="warning"
                                    type='button'
                                    onClick={handleReset}
                                >Reset
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

export default MyPostsFormik

