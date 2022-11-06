import React from 'react';
import classes from './../Dialogs.module.css';

const Message = ({message}) => {
    return <div className={classes.messageItem}>
        {message}
    </div>
}

export default Message;

