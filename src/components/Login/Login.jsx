import React from "react";
import {Field, reduxForm} from "redux-form";
import classes from './Login.module.css'

const LoginForm = props => {
    const {handleSubmit} = props;
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <div>
                    <Field
                        name="login"
                        component = "input"
                        type = "text"
                        placeholder = "login"
                    />
                </div>
                <div>
                    <Field
                        name="password"
                        component = "input"
                        type = "text"
                        placeholder = "password"
                    />
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </div>
        </form>
    )
}

let LoginReduxForm=reduxForm({form: 'login'})(LoginForm)

let onSubmit = (formData) => {
    alert(formData)
}

let Login = () => {
    return(
        <div className={classes.loginCommon}>
            <h2>Войдите в аккаунт</h2>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>

    )
}

export default Login