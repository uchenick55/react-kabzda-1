import React from "react";
import Login from "./Login";
import {connect} from "react-redux";
import {postLoginThunkCreator} from "../../redux/auth-reducer";
import {Navigate} from "react-router-dom";

class LoginContainer extends React.Component {

    postLogin = (email, password, rememberme) => { // email, password, rememberme берем из формы login
        //метод для проброса дальше целевой компоненты для вызова postLoginThunkCreator (авторизация на сервере)
        this.props.postLoginThunkCreator(email, password, rememberme);
    }

    render () {
        if (this.props.isAuth) { // условие что я авторизован
            return <Navigate to='../profile'/>; // редирект на страницу Profile
        }

        return (
            <div>
                <Login postLogin={this.postLogin}/> {/*Возврат целевой компоненты*/}
            </div>
        )
    }
}

let mapStateToProps = (state) => { // флаги isAuth - "я авторизован?"
    return {
        isAuth: state.auth.isAuth,
    }
}

export default connect(mapStateToProps, {postLoginThunkCreator})(LoginContainer)