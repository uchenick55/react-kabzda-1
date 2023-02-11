import React from 'react';
import classes from './Message.module.css';
import x from "../../../assets/images/x.png";


const Message = ({message, myId, userId, Date, MessageId, deleteMessage}) => {

    let onMouseOverAction = () => {

    }
    return <div className={classes.messageswrapper}> {/*разделить сообщения на мои и собеседника поровну (право-лево)*/}
        <div className={myId === userId ? classes.messageMyId : classes.messageNotMyId}> {/*в зависимости от того кто пишет, доп стили к тексту*/}
            <span>{message}</span>
            <img src={x} className={classes.x} onMouseOver={onMouseOverAction} onClick={()=>{deleteMessage(MessageId)}} alt={"Удалить сообщение у всех"} title = {"Удалить сообщение у всех"}/>
            <span className={classes.timeStyle}>{Date.Hour}{":"}{Date.Minutes}</span>
        </div>
    </div>
}

export default Message;

