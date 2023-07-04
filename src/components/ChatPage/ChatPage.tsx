import React, {useEffect, useState} from "react";
import userPhoto from "../../assets/images/no-image3.png";
import {ChatMessageType} from "../api/chat-api";
import {useDispatch, useSelector} from "react-redux";
import {sendMessageThCr, startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer";
import {GlobalStateType} from "../../redux/store-redux";

const Messages: React.FC = () => {

    const messages:Array<ChatMessageType> = useSelector((state:GlobalStateType) => state.chat.messages )

    return <div style={{height: "400px", overflowY: "auto"}}> {/*отрисовка списка сообщений*/}
        {messages.map( (m, index) => <Message key={index} message={m}/> )}
    </div>
}

const Message: React.FC<{ message: ChatMessageType }> = ({message}) => {//отрисовка списка сообщений
    return <div>
        <img src={message.photo || userPhoto} style={{width: "30px"}} alt='аватар'/> {/*аватарка собеседника*/}
        <b>{message.userName}</b> {/* его имя*/}
        <br/>
        {message.message} {/*само сообщение*/}
        <hr/>
    </div>
}

const AddMessages: React.FC = () => {
    const [message, setMessage] = useState<string>( "" )

    const dispatch = useDispatch()

    const sendMessage = () => { // ввод новых сообщений
        dispatch(sendMessageThCr(message))
        setMessage( "" ) // занулить поле воода
    }
    const isDisabled = false
        //readyStatus !== 'ready' // флаг доступности кнопки и поля ввода
    return <div >
        <input
            disabled={isDisabled} // доступность поля ввода
            value={message} // значение из локального стейта
            onChange={(e) => { // при изменении поля ввода
                setMessage( e.currentTarget.value ) // записать значение в локальный стейт
            }}
        />
       <button onClick={sendMessage} disabled={isDisabled} >Send</button> {/* кнопка отправки сообщений*/}
    </div>
}

const Chat: React.FC = () => { // основная страница чата

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(startMessagesListening())
        return ()=>{
            dispatch(stopMessagesListening())
        }
    },[])

    return <div>
        <Messages /> {/*отрисовка сообщений чата из websocket*/}
        <AddMessages /> {/*добавить сообщения в чат websocket*/}
    </div>
}
export default Chat


