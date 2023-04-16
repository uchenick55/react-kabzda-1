import React from "react";
import Login from "./LoginFormikBS";
import {connect} from "react-redux";
import {getCaptchaThunkCreator, postLoginThunkCreator} from "../../redux/auth-reducer";
import {Navigate} from "react-router-dom";

class LoginContainer extends React.Component {

    postLogin = ({email, password, rememberme, captcha}) => { // email, password, rememberme берем из формы login
        //метод для проброса дальше целевой компоненты для вызова postLoginThunkCreator (авторизация на сервере)
        this.props.postLoginThunkCreator(email, password, rememberme, captcha);
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
                       loginError = {this.props.loginError}
                /> {/*Возврат целевой компоненты*/}
            </div>
        )
    }
}

let mapStateToProps = (state) => { // флаги isAuth - "я авторизован?"
    return {
        isAuth: state.auth.isAuth,
        captchaURL: state.auth.captchaURL, // URL каптчи при неправильном вводе 5 раз логина
        loginError: state.auth.loginError // ошибка авторизации
    }
}

let mapDispatchToProps = (dispatch) => {
    return {

        postLoginThunkCreator: (email, password, rememberme, captchaURL) => { // отправить сообщение
            dispatch(postLoginThunkCreator(email, password, rememberme, captchaURL))
        },
        getCaptchaThunkCreator: () => { // отправить сообщение
            dispatch(getCaptchaThunkCreator())
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
