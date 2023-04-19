import React from 'react';
import classes from './Message.module.css';
import Toast from 'react-bootstrap/Toast'
import CloseButton from "react-bootstrap/CloseButton";
import {DateType} from "../../../../types/commonTypes";

type MessageBSType = {
    message: string
    myId: number, // мой ID (авторизованного пользователя)
    userId: number
    Date: DateType,
    MessageId: number,
    deleteMessage: (messageID: number) => void,

}
const MessageBS:React.FC<MessageBSType> = ({message, myId, userId, Date, MessageId, deleteMessage}) => {

    return <div>
        <div
            className={`${classes.messagesCommon} ${myId === userId ? classes.messageMyId : classes.messageNotMyId}`}>
            {/*в зависимости от того кто пишет, доп стили к тексту*/}

            <Toast className={myId === userId ?classes.insideToastMy:classes.insideToastNotMy}>
                <Toast.Body>
                    <div className='d-flex d-inline-block'> {/*элементы внутри сообщений в ряд*/}
                        <big>{message} {/*сообщение */}</big>
                        <div className={classes.time}>
                            {("0" + Date.Hour).substr(-2)}{":"}{("0" + Date.Minutes).substr(-2)}
                            {/*по 2 символа на часы и минуты*/}
                        </div>
                       <div className={classes.placeholder}></div> {/* смещаем текст сообщений от часов*/}
                            <CloseButton className={classes.closeButton}
                                onClick={()=>{deleteMessage(MessageId)}}
                            />
                    </div>
                </Toast.Body>
            </Toast>
        </div>
    </div>
}

export default MessageBS;

