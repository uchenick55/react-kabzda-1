import React from "react";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
let mapStateToProps = (state) => { // флаги isAuth - "я авторизован?" и sentRequestIsAuth - а запрос "я авторизован" вообще был?
    return {
        isAuth: state.auth.isAuth,
        sentRequestIsAuth: state.auth.sentRequestIsAuth
    }
}

export let NavigateToLoginHoc = (Component) => { // оберточная компонента проверки на Login, оборачивающая целевую компоненту
    class NavigateToLoginHocWithAuth extends React.Component { // внутренняя компонента уже с данными isAuth и sentRequestIsAuth
        render () {
            if (!this.props.isAuth&this.props.sentRequestIsAuth) { // условие что я не авторизован, но проверка на авторизацию уже была
                return <Navigate to='../login'/>; // редирект на страницу Login
            }
            return <Component {...this.props}/> /// возврат целевой компоненты, если редиректа не было на Login
        }
    }
    return connect(mapStateToProps)(NavigateToLoginHocWithAuth)// добавляем в стейт флаги isAuth - "я авторизован?" и sentRequestIsAuth - а запрос "я авторизован" вообще был?
}
