import React from 'react';
import classes from './News.css';
import {connect} from "react-redux";
import {NavigateToLoginHoc} from "../hoc/NavigateToLoginHoc";

const News = () => {
    return (
        <div className={classes.content}>
            News text
        </div>
    )
}
let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}
export default connect(mapStateToProps)(NavigateToLoginHoc(News));

