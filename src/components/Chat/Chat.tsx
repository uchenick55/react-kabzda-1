import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {GlobalStateType} from "../../redux/store-redux";
import {ChatMessagesType} from "../api/chat-api";
import {sendMessageThCr, startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer";

const Messages: React.FC = ()=>{ // отрисовка всех сообщений
    const messages:Array<ChatMessagesType> = useSelector((state:GlobalStateType) => state.chat.messages ) // получить сообщения из стейта
    return <div>
        {messages.map((message: ChatMessagesType, index: number)=>{ // пробегаем по списку сообщений из стейта
            return <Message key={index} message = {message}/> // отрисовываем сообщения поэлементно
        })}
    </div>
}

const Message: React.FC<{message: ChatMessagesType}> = ({message}) => { // отрисовка одного сообщения (фото, тела и имени пользователя)
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
    const [message, setMessage] = useState<string>("") // константа временного хранилища значения поля ввода
    const dispatch = useDispatch()

    const sendMessage = () => { // колбек отправеки сообщений
        dispatch(sendMessageThCr(message)) // отправить сообщение
        setMessage("") // занулить поле ввода
    }
    const isDisabled = false
    return <div>
        <input disabled={isDisabled} value={message} onChange={(e)=>setMessage(e.target.value)} />  {/*поле ввода*/}
        <button onClick={sendMessage}>Send</button>  {/*отправка сообщений */}
    </div>
}

const Chat:React.FC = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(startMessagesListening())// открытие канала WS, создание подписок и слушателей событий
        return () => {
            dispatch(stopMessagesListening()) // закрытие канала WS, удаление подписок и слушателей событий
        }
    },[])
    return <div>
        <Messages/> {/*отрисовка сообщений*/}
        <AddMessages/> {/*ввод сообщений и кнопка отправки*/}
    </div>
}
export default Chat

/*
Для прокрутки до самого низа, используйте:
useEffect(() => {
    messagesAnchorRef.current?.scrollIntoView(true);
}, [messages]);*/
