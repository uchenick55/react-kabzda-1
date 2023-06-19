import React from "react";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";


const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth, // текущий флаг авторизации
    }
}

const NavigateToLoginHoc2 = (Component) => {
    const NavigateToLoginHocWithAuth2 = (props) => {
        if (!props.isAuth) {
            return <Navigate to='../login'/>;
        }
        return <Component {...props}/>;
    }

    return connect(mapStateToProps, null)(NavigateToLoginHocWithAuth2);
}

export default NavigateToLoginHoc2
