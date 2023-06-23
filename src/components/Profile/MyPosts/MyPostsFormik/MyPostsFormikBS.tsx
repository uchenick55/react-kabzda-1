import React from "react";
import {Formik, Form, FormikHelpers} from "formik"; //формик с компонентами и пользовательским хуком
import * as Yup from 'yup' // валидация форм с помошью сторонней библиотеки Yup
import classes from "./MyPosts.module.css"
//import DisplayFormikState from "../../../../common/formikCommon/DisplayFormikState"
import {MyTextInput} from "../../../common/formikCommon/MyFieldsBS"
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";

const myInitialValues = { // начальные зачения форм
    newPost: "",
}
const myValidationSchema = Yup.object({ // валидация форм на required, длину и заполнение полей
})

type MyPostsFormikType = {
    addPost: (newPostData: string) => void

}
type ValuesType = {
    newPost: string
}
const MyPostsFormik:React.FC<MyPostsFormikType> = ({addPost}) => { // основная компонента с входным колбэком, чтобы забрать данные с форм
    const myOnSubmit = (values:ValuesType, {resetForm}:FormikHelpers<{ newPost: string; }>) => { // действия по сабмиту
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
                    <Form>
                        <div>
                            <MyTextInput // сообщение в MyPostsBS
                                label="Пост"
                                autoFocus={false}
                                name='newPost'
                                type='text'
                                placeholder='Введите ваше сообщение'
                                leftLabelLength={""}
                            />

                            {/*кнопка сброса к значениям по умолчанию*/}
                            <Stack direction="vertical" gap={1} className={'mt-2'}>
                                <Button type="submit"> {/*кнопка отправить форму*/}
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
