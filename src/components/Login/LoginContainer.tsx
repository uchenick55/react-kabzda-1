import React from "react";
import Login from "./LoginFormikBS";
import {useDispatch, useSelector} from "react-redux";
import type {} from 'redux-thunk/extend-redux';
import {getCaptchaThunkCreator, postLoginThunkCreator} from "../../redux/auth-reducer";
import {Navigate} from "react-router-dom";
import {GlobalStateType} from "../../redux/store-redux";

const LoginContainer: React.FC = () => {

    const dispatch = useDispatch()

    const postLogin = (values: { email: string, password: string, rememberme?: boolean, captcha?: string }) => {
        // email, password, rememberme берем из формы login

        //функция для проброса дальше целевой компоненты для вызова postLoginThunkCreator (авторизация на сервере)
        dispatch( postLoginThunkCreator( values.email, values.password, values.rememberme, values.captcha ));
    }
    const captchaURL: string = useSelector((state: GlobalStateType) => state.auth.captchaURL )
    const isAuth:boolean = useSelector((state: GlobalStateType) => state.auth.isAuth )
    const loginError:string = useSelector((state: GlobalStateType) => state.app.notify[0]?.message )

    const updateCaptcha = () => {

        dispatch(  getCaptchaThunkCreator())
    }

    if (isAuth) { // условие что я авторизован
        return <Navigate to='../dialog2'/>; // редирект на страницу Profile
    }

    return <Login postLogin={postLogin}
                   captchaURL={captchaURL}
                   updateCaptcha={updateCaptcha}
                   loginError={loginError}
            />
}
export default LoginContainer
