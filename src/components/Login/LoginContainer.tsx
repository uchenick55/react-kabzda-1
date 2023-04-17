import React from "react";
import Login from "./LoginFormikBS";
import {connect} from "react-redux";
import {getCaptchaThunkCreator, postLoginThunkCreator} from "../../redux/auth-reducer";
import {Navigate} from "react-router-dom";
import {GlobalStateType} from "../../redux/store-redux";

type LoginContainerPropsType = {
    isAuth: boolean
    captchaURL: string, // URL каптчи после 5 неправильных вводов
    loginError: string // ошибка авторизации
    postLoginThunkCreator:(email:string, password:string, rememberme?:boolean, captcha?:string)=>void,
    getCaptchaThunkCreator: () => void
}
class LoginContainer extends React.Component<LoginContainerPropsType> {

    postLogin = (values: { email:string, password:string, rememberme?:boolean, captcha?:string }) => { // email, password, rememberme берем из формы login
        //метод для проброса дальше целевой компоненты для вызова postLoginThunkCreator (авторизация на сервере)
        this.props.postLoginThunkCreator( values.email, values.password, values.rememberme, values.captcha );
    }

    updateCaptcha = () => {
        this.props.getCaptchaThunkCreator()
    }

    render() {
        if (this.props.isAuth) { // условие что я авторизован
            return <Navigate to='../profile'/>; // редирект на страницу Profile
        }

        return (
            <div>
                <Login postLogin={this.postLogin}
                       captchaURL={this.props.captchaURL}
                       updateCaptcha={this.updateCaptcha}
                       loginError={this.props.loginError}
                /> {/*Возврат целевой компоненты*/}
            </div>
        )
    }
}
type mapStateToPropsType = {
    isAuth: boolean
    captchaURL: string, // URL каптчи после 5 неправильных вводов
    loginError: string // ошибка авторизации
}

let mapStateToProps = (state:GlobalStateType) => { // флаги isAuth - "я авторизован?"
    return {
        isAuth: state.auth.isAuth,
        captchaURL: state.auth.captchaURL, // URL каптчи при неправильном вводе 5 раз логина
        loginError: state.auth.loginError // ошибка авторизации
    }
}
type mapDispatchToPropsType = {
    postLoginThunkCreator:(email:string, password:string, rememberme?:boolean, captcha?:string)=>void,
    getCaptchaThunkCreator: () => void

}

export default connect<
    mapStateToPropsType, mapDispatchToPropsType, unknown, GlobalStateType
    >( mapStateToProps, {postLoginThunkCreator, getCaptchaThunkCreator } )( LoginContainer )
