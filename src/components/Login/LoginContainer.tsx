import React from "react";
import Login from "./LoginFormikBS";
import {connect} from "react-redux";
import {getCaptchaThunkCreator, postLoginThunkCreator} from "../../redux/auth-reducer";
import {Navigate} from "react-router-dom";
import {GlobalStateType} from "../../redux/store-redux";

const LoginContainer: React.FC<mapStateToPropsType & mapDispatchToPropsType> = (
    {postLoginThunkCreator, captchaURL, getCaptchaThunkCreator, isAuth, loginError}) => {

    const postLogin = (values: { email: string, password: string, rememberme?: boolean, captcha?: string }) => {
        // email, password, rememberme берем из формы login
        //функция для проброса дальше целевой компоненты для вызова postLoginThunkCreator (авторизация на сервере)
        postLoginThunkCreator( values.email, values.password, values.rememberme, values.captcha );
    }

    const updateCaptcha = () => {
        getCaptchaThunkCreator()
    }

    if (isAuth) { // условие что я авторизован
        return <Navigate to='../dialog2'/>; // редирект на страницу Profile
    }

    return (
        <div>
            <Login postLogin={postLogin}
                   captchaURL={captchaURL}
                   updateCaptcha={updateCaptcha}
                   loginError={loginError}
            /> {/*Возврат целевой компоненты*/}
        </div>
    )
}

let mapStateToProps = (state: GlobalStateType) => { // флаги isAuth - "я авторизован?"
    return {
        isAuth: state.auth.isAuth as boolean, // флаг авторизации
        captchaURL: state.auth.captchaURL as string, // URL каптчи при неправильном вводе 5 раз логина
        loginError: state.auth.loginError as string, // ошибка авторизации
    }
}
type mapStateToPropsType = ReturnType<typeof mapStateToProps>

type mapDispatchToPropsType = {
    postLoginThunkCreator: (email: string, password: string, rememberme?: boolean, captcha?: string) => void, // отправить данные логина
    getCaptchaThunkCreator: () => void // получить каптчу
}

export default connect<mapStateToPropsType, mapDispatchToPropsType, unknown, GlobalStateType>( mapStateToProps, {
    postLoginThunkCreator,
    getCaptchaThunkCreator
} )( LoginContainer )
