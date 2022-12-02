import React from 'react';
import classes from './../Dialogs.module.css';
import {bedug_mode} from "../../../redux/store-redux";

const Message = ({message}) => {
    return <div className={classes.messageItem}>
        {message}
    </div>
}

export default Message;

