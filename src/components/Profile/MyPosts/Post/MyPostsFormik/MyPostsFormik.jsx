import React from "react";
import {Formik, Form} from "formik"; //формик с компонентами и пользовательским хуком
import * as Yup from 'yup' // валидация форм с помошью сторонней библиотеки Yup
import classes from "./MyPosts.module.css"
//import DisplayFormikState from "../../../../common/formikCommon/DisplayFormikState"
import {MyTextArea} from "../../../../common/formikCommon/MyFields"

let myInitialValues = { // начальные зачения форм
    newPost: "123",
}
let myValidationSchema = Yup.object({ // валидация форм на required, длину и заполнение полей
    newPost: Yup.string()
        .required('Required'),


})

const MyPostsFormik  = ({addPost}) => { // основная компонента с входным колбэком, чтобы забрать данные с форм
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
                            <MyTextArea // сообщение в MyPosts
                                label=""
                                name='newPost'
                                type='textarea'
                                placeholder='Введите ваше сообщение'
                            />

                            <button type="submit" > {/*кнопка отправить форму*/}
                                Submit
                            </button>
                            <button type='button' onClick={handleReset}>Reset</button>
                            {/*кнопка сброса к значениям по умолчанию*/}
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

