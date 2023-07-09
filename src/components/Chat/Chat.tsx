import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {GlobalStateType} from "../../redux/store-redux";
import {ChannelStatusType, ChatMessagesType} from "../api/chat-api";
import {chatActions, sendMessageThCr, startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer";
import AddMessagesFormik from "./AddMessages/AddMessagesFormikBS";

const Messages: React.FC = () => { // отрисовка всех сообщений
   // console.log(">>>>>>>>>>>>>>Messages")
    const messages: Array<ChatMessagesType> = useSelector( (state: GlobalStateType) => state.chat.messages ) // получить сообщения из стейта

    const autoScroll = () => {
        const {
            scrollHeight, // высота всего контента с учетом прокрутки
            offsetHeight,// высота видимого содержимого без прокрутки
            scrollTop } = // высота, насколько прокручен контент
            container.current as HTMLDivElement
        if (scrollHeight <= scrollTop + offsetHeight + 100) {
            container.current?.scrollTo(0, scrollHeight)
        }
    }
    const container = useRef<HTMLDivElement>(null)

    useEffect(() => {
        autoScroll()
    }, [messages])

    return <div
        ref={container}
       // ref={ref}
                style={{height: "20rem", overflowY: "auto"}}
    >

        {messages.map( (message: ChatMessagesType, index: number) => { // пробегаем по списку сообщений из стейта
            return <Message key={index} message={message}/> // отрисовываем сообщения поэлементно
        } )}
    </div>
}

const Message: React.FC<{ message: ChatMessagesType }> = ({message}) => { // отрисовка одного сообщения (фото, тела и имени пользователя)
    return <div>
        <div>
            <img src={message.photo} alt="avatar" style={{height: "30px"}}/>
            <b>{message.userName}</b>{" "}{message.message}
            <hr/>
        </div>
    </div>
}

const AddMessages: React.FC = () => {
  //  console.log(">>>>>>>>>>>>>>AddMessages")

    const channelStatus: ChannelStatusType = useSelector( (state: GlobalStateType) => state.chat.channelStatus ) // получить статус открытия канала

    const [message, setMessage] = useState<string>( "" ) // константа временного хранилища значения поля ввода
    const dispatch = useDispatch()

    const sendMessage = (message:string) => { // колбек отправеки сообщений
        message && dispatch( sendMessageThCr( message ) ) // отправить сообщение
        message && setMessage( "" ) // занулить поле ввода
    }

    const checkEnterPressed = (e: React.KeyboardEvent) => { // проверка нажатия Enter
        if (e.charCode === 13) {
            sendMessage(message)
        }
    }

    const isDisabled = channelStatus !== "ready"
    return <div>
        <AddMessagesFormik sendMessage={sendMessage} isDisabled={isDisabled}/>
{/*
        <input disabled={isDisabled} value={message} onChange={(e) => setMessage( e.target.value )}
               style={{width: "50rem"}}
               onKeyPress={(e) => checkEnterPressed( e )} // проверка нажатия Enter
        />
        <button onClick={()=>sendMessage(message)} disabled={isDisabled}>Send </button> отправка сообщений
*/}
    </div>
}

const Chat: React.FC = () => {
  //  console.log(">>>>>>Chat")

    const dispatch = useDispatch()
    useEffect( () => {
        dispatch( startMessagesListening() )// открытие канала WS, создание подписок и слушателей событий
        return () => {
            dispatch( stopMessagesListening() ) // закрытие канала WS, удаление подписок и слушателей событий
            dispatch(chatActions.setChatInitialState()) // зануление стейта чата при размонтировании компоненты
        }
    }, [] )
    return <div>
        <Messages/> {/*отрисовка сообщений*/}
        <AddMessages/> {/*ввод сообщений и кнопка отправки*/}
    </div>
}
export default Chat
