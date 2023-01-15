import React from "react";
import {Formik, Form, useField, Field, ErrorMessage, useFormikContext} from "formik"; //формик с компонентами и пользовательским хуком
import * as Yup from 'yup' // валидация форм с помошью сторонней библиотеки Yup
import classes from "../common/formikCommon/formik1.module.css"
import DisplayFormikState from "../common/formikCommon/DisplayFormikState"
import {MyTextInput, MyTextArea, MySelect, MyCheckbox} from "../common/formikCommon/MyFields"

let myInitialValues = { // начальные зачения форм
    firstName: "firstNameasdasd",
    lastName: 'lastName',
    email: "email@email.em",
    acceptedTerms: true,
    jobType: "product",
    message: "Textarea Field",
 //   comments: "MyTextArea",
    picked: "One",
    password:"asd"
}
let myValidationSchema = Yup.object({ // валидация форм на required, длину и заполнение полей
    firstName: Yup.string()
        .max(15, "Must be 15 character or less")
        .required('Required'),
    lastName: Yup.string()
        .max(20, "Must be 20 character or less")
        .required('Required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
    comments: Yup.string()
        .max(50, 'Must be 50 characters or less')
        .required('Required'),
    acceptedTerms: Yup.boolean()
        .required('Required')
        .oneOf([true], 'You must accept the terms and conditions.'),
    jobType: Yup.string()
        .oneOf(
            ['designer', 'development', 'product', 'other'],
            'Invalid Job Type'
        )
        .required('Required'),
    message: Yup.string()
        .max(50, 'Must be 50 characters or less')
        .required('Required'),
    picked: Yup.string()
        .required('Required'),
    password: Yup.string()
        .required('Required'),
})


const SignupForm = ({onSubmitForm}) => { // основная компонента с входным колбэком, чтобы забрать данные с форм
    const myOnSubmit = (values) => { // действия по сабмиту
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2)); // после отправки формы вывести alert
            onSubmitForm(values) // колбек, который принмает результат ввода формы
        }, 400)
    }
    return (
        <>
            <h1>Subscribe!</h1>
            <Formik
                initialValues={myInitialValues}
                validationSchema={myValidationSchema}
                onSubmit={myOnSubmit}
            >
                {({
                      values, // значения полей (можно взять любое)
                      handleReset,// обнуление полей
                      errors, // все ошибки ввода
                      isValid
                  }) => ( // обертка для вывода значений ввода в любом месте формы паралельно (или в итоге)

                    <Form>

                        <label htmlFor="firstName">First
                            Name</label>{/* альтернатива написания input с обработкой ошибок*/}
                        <Field name="firstName" type="text" placeholder='firstName'/>
                        <div className={classes.errorText}>
                            <ErrorMessage name="firstName"/>
                        </div>

                        <label htmlFor="message">Textarea
                            Field</label>{/* альтернатива написания Textarea с обработкой ошибок*/}
                        <Field name="message" as="textarea" className="form-textarea" placeholder='textarea'/>
                        <div className={classes.errorText}>
                            <ErrorMessage name="message"/>
                        </div>

                        <MyTextInput // password
                            label="Password"
                            name="password"
                            type="password"
                            placeholder='password'
                        />

                        <MyTextInput // firstNamr
                            label="First Name"
                            name='firstName'
                            type='firstName'
                            placeholder='Jane'
                        />

                        <div>firstName: {values.message}</div>
                        {/*отображение вводимого значения values.message помимо самого поля*/}

                        <div id="my-radio-group">Picked</div>
                        {/*радиокнопки в группе*/}
                        <div role="group" aria-labelledby="my-radio-group">
                            <label>
                                <Field type="radio" name="picked" value="One"/>
                                One
                            </label>
                            <label>
                                <Field type="radio" name="picked" value="Two"/>
                                Two
                            </label>
                            <div className={classes.errorText}>
                                <ErrorMessage name="picked"/>
                            </div>

                        </div>


                        <MyTextInput // lastName
                            label="Last Name"
                            name='lastName'
                            type='text'
                            placeholder='Doe'
                        />

                        <MyTextInput // email
                            label="Email Address"
                            name='email'
                            type='email'
                            placeholder='jane@formik.com'
                        />

                        <MyTextArea // MyTextArea
                            label="MyTextArea"
                            name='comments'
                            type='text'
                            placeholder='Your comments to Subscribe'
                        />

                        <MySelect label='Job Type' name='jobType'>  {/*отрисовка select с option*/}
                            <option value=''>Select a job type</option>
                            <option value='designer'>Designer</option>
                            <option value='development'>Developer</option>
                            <option value='product'>Product Manager</option>
                            <option value='other'>Other</option>
                        </MySelect>

                        <MyCheckbox name='acceptedTerms'>  {/*чекбокс */}
                            I accept the terms and conditions
                        </MyCheckbox>

                        <button type="submit"> {/*кнопка отправить форму*/}
                            Submit
                        </button>
                        <button type='button' onClick={handleReset}>Reset</button>
                        {/*кнопка сбора со значениям по умолчанию*/}
                        <DisplayFormikState/> {/*отображение всего стейта формика*/}

                    </Form>
                )}
            </Formik>
        </>
    )
}

export default SignupForm

