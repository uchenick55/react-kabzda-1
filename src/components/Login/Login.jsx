import React from 'react';
import {Field, reduxForm} from 'redux-form'

let LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={"login"} component={"input"} placeholder={"login"}/>
            </div>
            <div>
                <Field name={"password"} component={"input"} placeholder={"password"}/>
            </div>
            <div>
                <Field name={"rememberMe"} component={"input"} type={"checkbox"}/>
            </div>
            <div>
                <button>Submit</button>
            </div>
        </form>
    )
}

let LoginReduxForm = reduxForm({form: 'contact'})(LoginForm)

let onSubmit = (formData) => {
    return (
        console.log(formData)
    )
}

let Login = () => {
    return (<div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}
export default Login
