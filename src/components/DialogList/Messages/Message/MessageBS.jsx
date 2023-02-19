import React from 'react';
import classes from './Message.module.css';
import Toast from 'react-bootstrap/Toast'
import CloseButton from "react-bootstrap/CloseButton";

const Message = ({message, myId, userId, Date, MessageId, deleteMessage}) => {

    return <div> {/*className={classes.messageswrapper}разделить сообщения на мои и собеседника поровну (право-лево)*/}
        <div
            className={`${classes.messagesCommon} ${myId === userId ? classes.messageMyId : classes.messageNotMyId}`}>
            {/*в зависимости от того кто пишет, доп стили к тексту*/}

            <Toast className={myId === userId ?classes.insideToastMy:classes.insideToastNotMy}>
                <Toast.Body>
                    <div className='d-flex d-inline-block'>
                        <big>{message} {/*сообщение */}</big>
                        <div className={classes.time}>
                            {Date.Hour}{":"}{Date.Minutes}
                        </div>
                            <CloseButton className={classes.closeButton}
                                onClick={()=>{deleteMessage(MessageId)}}
                            />
                    </div>
                </Toast.Body>
            </Toast>

        </div>
    </div>
}

export default Message;

