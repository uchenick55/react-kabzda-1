import React from 'react';
import classes from './Message.module.css';
import {bedug_mode} from "../../../redux/store-redux";
import x from "../../../assets/images/x.png";


const Message = ({message, myID, userId, Date, MessageId, deleteMessage}) => {
    let onMouseOverAction = () => {

    }
    return <div className={classes.messageCommon}>
        <div className={myID === userId ? classes.messageMyId : classes.messageNotMyId}>
            <span>{message}</span>
            <img src={x} className={classes.x} onMouseOver={onMouseOverAction} onClick={()=>{deleteMessage(MessageId)}}/>
            <div className={classes.timeStyle}>{Date.Hour}{":"}{Date.Minutes}</div>
        </div>
    </div>
}

export default Message;

