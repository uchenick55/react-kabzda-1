import React from "react";
import Login from "./Login";
import {connect} from "react-redux";
import {postLoginThunkCreator} from "../../redux/auth-reducer";
import {Navigate} from "react-router-dom";
import {state_copy_for_debug} from "../../redux/store-redux";
import {needUpdateFriendsAC} from "../../redux/users-reducer";

class LoginContainer extends React.Component {

    postLogin = (email, password, rememberme) => { // email, password, rememberme берем из формы login
        //метод для проброса дальше целевой компоненты для вызова postLoginThunkCreator (авторизация на сервере)
        this.props.postLoginThunkCreator(email, password, rememberme);
        this.props.needUpdateFriendsAC(true);
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

export default connect(mapStateToProps, {postLoginThunkCreator, needUpdateFriendsAC})(LoginContainer)
