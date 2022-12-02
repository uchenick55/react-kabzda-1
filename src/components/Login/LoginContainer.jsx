import React from "react";
import Login from "./Login";
import {connect} from "react-redux";
import {postLoginThunkCreator} from "../../redux/auth-reducer";
import {Navigate} from "react-router-dom";
import {getFriendsThunkCreator} from "../../redux/sidebar-reducer";
import {bedug_mode} from "../../redux/store-redux";

class LoginContainer extends React.Component {

    postLogin = (email, password, rememberme) => { // email, password, rememberme берем из формы login
        //метод для проброса дальше целевой компоненты для вызова postLoginThunkCreator (авторизация на сервере)
        this.props.postLoginThunkCreator(email, password, rememberme);
    }

    render () {
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
                <Login postLogin={this.postLogin}/> {/*Возврат целевой компоненты*/}
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
    }
}

export default connect(mapStateToProps, {postLoginThunkCreator, getFriendsThunkCreator})(LoginContainer)
