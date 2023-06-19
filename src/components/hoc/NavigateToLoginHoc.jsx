import React from "react";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth, // текущий флаг авторизации
    }
}

const NavigateToLoginHoc = (Component) => {
    const NavigateToLoginHocWithAuth = ({isAuth, ...props}) => {
        if (!isAuth) {
            return <Navigate to='../login'/>;
        }
        return <Component {...props}/>;
    }

    return connect(mapStateToProps, null)(NavigateToLoginHocWithAuth);
}

export default NavigateToLoginHoc
