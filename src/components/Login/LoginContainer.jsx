import React from "react";
import Login from "./LoginFormik";
import {connect} from "react-redux";
import {getCaptchaThunkCreator, postLoginThunkCreator} from "../../redux/auth-reducer";
import {Navigate} from "react-router-dom";
import {getFriendsThunkCreator} from "../../redux/sidebar-reducer";

class LoginContainer extends React.Component {

    postLogin = (email, password, rememberme, captcha) => { // email, password, rememberme берем из формы login
        //метод для проброса дальше целевой компоненты для вызова postLoginThunkCreator (авторизация на сервере)
        this.props.postLoginThunkCreator(email, password, rememberme, captcha);
    }

    updateCaptcha = () => {
        this.props.getCaptchaThunkCreator()
    }

    render() {
        if (this.props.isAuth) { // условие что я авторизован
            this.props.getFriendsThunkCreator( // получить список друзей
                this.props.friendsCurrentPage,
                this.props.friendsPageSize,
                this.props.friendsTerm,
                this.props.friend);
            return <Navigate to='../profile'/>; // редирект на страницу Profile
        }

        return (
            <div>
                <Login postLogin={this.postLogin}
                       captchaURL={this.props.captchaURL}
                       updateCaptcha={this.updateCaptcha}
                       dispatch = {this.props.dispatch}
                /> {/*Возврат целевой компоненты*/}
            </div>
        )
    }
}

let mapStateToProps = (state) => { // флаги isAuth - "я авторизован?"
    return {
        isAuth: state.auth.isAuth,
        friendsCurrentPage: state.sideBar.friendsCurrentPage,
        friendsPageSize: state.sideBar.friendsPageSize,
        friendsTerm: state.sideBar.friendsTerm,
        friend: state.sideBar.friend,
        captchaURL: state.auth.captchaURL, // URL каптчи при неправильном вводе 5 раз логина
    }
}

let mapDispatchToProps = (dispatch) => {
    return {

        postLoginThunkCreator: (email, password, rememberme, captchaURL) => { // отправить сообщение
            dispatch(postLoginThunkCreator(email, password, rememberme, captchaURL))
        },
        getFriendsThunkCreator: (currentPage, pageSize, term, friend) => { // отправить сообщение
            dispatch(getFriendsThunkCreator(currentPage, pageSize, term, friend))
        },
        getCaptchaThunkCreator: () => { // отправить сообщение
            dispatch(getCaptchaThunkCreator())
        },
        dispatch: dispatch

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
