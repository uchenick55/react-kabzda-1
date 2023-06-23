import React from "react";
import {Formik, Form, FormikHelpers} from "formik"; //формик с компонентами и пользовательским хуком
import * as Yup from 'yup' // валидация форм с помошью сторонней библиотеки Yup
import {MyTextInput, MyCheckbox} from "../common/formikCommon/MyFieldsBS"
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
//import DisplayFormikState from "../common/formikCommon/DisplayFormikState"
import "bootstrap/dist/css/bootstrap.min.css"
import Col from "react-bootstrap/Col";
import LoginInfoShort from "../Info/LoginInfoShort";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import commonClasses from "../common/CommonClasses/common.module.css"

const myInitialValues = { // начальные зачения форм
    email: "",
    password: "",
    captcha: "",
}
const myValidationSchema = Yup.object({ // валидация форм на required, длину и заполнение полей
    email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
    password: Yup.string()
        .required('Required'),
})

type LoginFormikType = {
    captchaURL: string, // URL каптчи после 5 неправильных вводов
    loginError: string // ошибка авторизации
    postLogin: (values: { email:string, password:string, rememberme?:boolean, captcha?:string }) => void,
    updateCaptcha: () => void,
}
type ValuesType = {
    email: string,
    password: string,
    rememberme?: boolean
    captcha?: string
}
const LoginFormik:React.FC<LoginFormikType> = ({postLogin, captchaURL, updateCaptcha, loginError}) => { // основная компонента с входным колбэком, чтобы забрать данные с форм
    const myOnSubmit = (values:ValuesType, {resetForm}:FormikHelpers<ValuesType>) => { // действия по сабмиту
        postLogin(values) // колбек, который принмает результат ввода формы
        resetForm()// сбросить значение формы после ввода
    }

    const loginForm = <Formik
        initialValues={myInitialValues}
        validationSchema={myValidationSchema}
        onSubmit={myOnSubmit}
    >

        {({
              handleReset,// обнуление полей
          }) => ( // обертка для вывода значений ввода в любом месте формы паралельно (или в итоге)
            <Form> {/*className={classes.LoginForm}*/}
                <Col> {/*lg={6} md={12}*/}

                    <MyTextInput // email
                        label="Email Address"
                        autoFocus={false}
                        name='email'
                        type='email'
                        placeholder='email'
                        leftLabelLength='7rem'
                    />

                    <MyTextInput // password
                        label="Password"
                        autoFocus={false}
                        name="password"
                        type="password"
                        placeholder='password'
                        leftLabelLength='7rem'
                    />

                    <MyCheckbox name='rememberme'>  {/*чекбокс */}
                        запомнить меня
                    </MyCheckbox>

                    {captchaURL && <div>
                        <div>
                            <img src={captchaURL} onClick={updateCaptcha} alt="captcha"/>
                        </div>
                        {/*<label htmlFor="captcha">Captcha</label> {/*альтернатива написания input с обработкой ошибок*/}

                        <MyTextInput // email
                            label="Captcha"
                            autoFocus={false}
                            name='captcha'
                            type='text'
                            placeholder='captcha'
                            leftLabelLength='7rem'
                        />
                    </div>

                    }
                    <ButtonGroup aria-label="Basic example">
                        <Button variant="warning" type='button' onClick={handleReset}>Reset</Button>
                        <Button type="submit"> {/*кнопка отправить форму*/}
                            Submit
                        </Button>
                    </ButtonGroup>

                    {/* <DisplayFormikState/> {/*отображение всего стейта формика*/}
                </Col>
            </Form>
        )}
    </Formik>
    return (
        <>
            <Container className="d-inline-block">
                <h2 className={commonClasses.pageHeader}>Login</h2>

                <Row >
                    <Col>{loginForm}</Col>
                    <Col><LoginInfoShort/></Col>
                </Row>
            </Container>
        </>
    )
}

export default LoginFormik

