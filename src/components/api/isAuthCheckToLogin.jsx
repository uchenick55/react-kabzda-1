import React from 'react';
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";

const IsAuthCheckToLogin = (props) => {
    if (props.sentRequestIsAuth&!props.isAuth) {
        return (
            <div>
                <Navigate to={'../login'}/>;
            </div>
        )
    }
}
let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        sentRequestIsAuth: state.auth.sentRequestIsAuth
    }
}
export default connect(mapStateToProps)(IsAuthCheckToLogin);

