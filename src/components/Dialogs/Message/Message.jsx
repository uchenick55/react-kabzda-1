import React from 'react';
import classes from './../Dialogs.module.css';

const Message = (props) => {
    return <div className={classes.messageItem}>
        {props.message}
    </div>
}

export default Message;

