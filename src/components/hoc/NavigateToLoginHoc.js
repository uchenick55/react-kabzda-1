import React from "react";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import {bedug_mode} from "../../redux/store-redux";

let mapStateToProps = (state) => { // флаги isAuth - "я авторизован?"
    return {
        isAuth: state.auth.isAuth,
    }
}

export let NavigateToLoginHoc = (Component) => { // оберточная компонента проверки на Login, оборачивающая целевую компоненту
    class NavigateToLoginHocWithAuth extends React.Component { // внутренняя компонента уже с данными isAuth
        render () {
            if (!this.props.isAuth) { // условие что я не авторизован
                return <Navigate to='../login'/>; // редирект на страницу Login
            }
            return <Component {...this.props}/> /// возврат целевой компоненты, если редиректа не было на Login
        }
    }
    return connect(mapStateToProps)(NavigateToLoginHocWithAuth)// добавляем в стейт флаги isAuth - "я авторизован?"
}
