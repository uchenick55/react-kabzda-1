import React from "react";
import {Formik, Form} from "formik"; //формик с компонентами и пользовательским хуком
import * as Yup from 'yup' // валидация форм с помошью сторонней библиотеки Yup
import classes from "./Login.module.css"
import {MyTextInput, MyCheckbox} from "../common/formikCommon/MyFieldsBS"
import {PointerCursor} from "../Dark_light_theme/globalStyles";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
//import DisplayFormikState from "../common/formikCommon/DisplayFormikState"
import "bootstrap/dist/css/bootstrap.min.css"
import Col from "react-bootstrap/Col";
import LoginInfoShort from "../Info/LoginInfoShort";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

let myInitialValues = { // начальные зачения форм
    email: "",
    password: "",
    captcha: "",
}
let myValidationSchema = Yup.object({ // валидация форм на required, длину и заполнение полей
    email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
    password: Yup.string()
        .required('Required'),
})

const LoginFormik = ({postLogin, captchaURL, updateCaptcha, loginError}) => { // основная компонента с входным колбэком, чтобы забрать данные с форм
    const myOnSubmit = (values, {resetForm}) => { // действия по сабмиту
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

                    <div className={classes.legendStyle}>Войдите в аккаунт</div>

                    <MyTextInput // email
                        label="Email Address"
                        name='email'
                        type='email'
                        placeholder='email'
                        leftLabelLength='7rem'
                    />

                    <MyTextInput // password
                        label="Password"
                        name="password"
                        type="password"
                        placeholder='password'
                        leftLabelLength='7rem'
                    />

                    <MyCheckbox name='rememberme'>  {/*чекбокс */}
                        запомнить меня
                    </MyCheckbox>

                    {captchaURL && <div>
                        <PointerCursor>
                            <img src={captchaURL} onClick={updateCaptcha} alt="captcha"></img>
                        </PointerCursor>
                        {/*<label htmlFor="captcha">Captcha</label> {/*альтернатива написания input с обработкой ошибок*/}

                        <MyTextInput // email
                            label=""
                            name='captcha'
                            type='text'
                            placeholder='captcha'
                        />
                    </div>

                    }
                    <ButtonGroup aria-label="Basic example">
                        <Button type="submit"> {/*кнопка отправить форму*/}
                            Submit
                        </Button>
                        <Button type='button' onClick={handleReset}>Reset</Button>
                    </ButtonGroup>


                    {/*кнопка сброса к значениям по умолчанию*/}
                    <div className={classes.errorText}>{loginError && loginError}</div>
                    <div/>

                    {/* <DisplayFormikState/> {/*отображение всего стейта формика*/}
                </Col>
            </Form>
        )}
    </Formik>
    return (
        <>
            <Container class="d-inline-block">
                <Row >
                    <Col>{loginForm}</Col>
                    <Col><LoginInfoShort/></Col>
                </Row>
            </Container>
        </>
    )
}

export default LoginFormik

