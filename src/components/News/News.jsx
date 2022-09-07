import React from 'react';
import classes from './News.css';
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";
import IsAuthCheckToLogin from "../api/isAuthCheckToLogin";

const News = (props) => {
    return (
        <div className={classes.content}>
            <IsAuthCheckToLogin/>
            News text
        </div>
    )
}
let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}
export default connect(mapStateToProps)(News);

