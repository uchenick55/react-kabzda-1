import React from 'react';
import classes from './Message.module.css';
import {bedug_mode} from "../../../redux/store-redux";
import x from "../../../assets/images/x.png";


const Message = ({message, myID, userId, Date, MessageId, deleteMessage}) => {

    let onMouseOverAction = () => {

    }
    return <div className={classes.messageswrapper}> {/*разделить сообщения на мои и собеседника поровну (право-лево)*/}
        <div className={myID === userId ? classes.messageMyId : classes.messageNotMyId}> {/*в зависимости от того кто пишет, доп стили к тексту*/}
            <span>{message}</span>
            <img src={x} className={classes.x} onMouseOver={onMouseOverAction} onClick={()=>{deleteMessage(MessageId)}} title = {"Удалить сообщение у всех"}/>
            <span className={classes.timeStyle}>{Date.Hour}{":"}{Date.Minutes}</span>
        </div>
    </div>
}

export default Message;

