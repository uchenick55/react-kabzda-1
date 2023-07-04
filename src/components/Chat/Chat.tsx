import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {GlobalStateType} from "../../redux/store-redux";
import {ChatMessagesType} from "../api/chat-api";
import {sendMessageThCr, startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer";

const Messages: React.FC = ()=>{
    const messages = useSelector((state:GlobalStateType) => state.chat.messages )
    return <div>
        {messages.map((message: ChatMessagesType, index: number)=>{
            return <Message key={index} message = {message}/>
        })}
    </div>
}

const Message: React.FC<{message: ChatMessagesType}> = ({message}) => {
    return <div>
        <div>
            <img src={message.photo} alt="avatar" style={{height: "30px"}}/>
            {message.userName}
            <div>{message.message}</div>
            <hr/>
        </div>
    </div>
}

const AddMessages: React.FC = () => {
    const [message, setMessage] = useState<string>("")
    const dispatch = useDispatch()
    const sendMessage = () => {
        dispatch(sendMessageThCr(message))
        setMessage("")
    }
    const isDisabled = false
    return <div>
        <input disabled={isDisabled} value={message} onChange={(e)=>setMessage(e.target.value)} />
        <button onClick={sendMessage}>Send</button>
    </div>
}

const Chat:React.FC = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    })
    return <div>
        <Messages/>
        <AddMessages/>
    </div>
}
export default Chat
