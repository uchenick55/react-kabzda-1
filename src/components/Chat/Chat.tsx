import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {GlobalStateType} from "../../redux/store-redux";
import {ChannelStatusType, ChatMessagesType} from "../api/chat-api";
import {sendMessageThCr, startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer";

const Messages: React.FC = () => { // отрисовка всех сообщений
    const messages: Array<ChatMessagesType> = useSelector( (state: GlobalStateType) => state.chat.messages ) // получить сообщения из стейта

    function useChatScroll<T>(dep: T): React.MutableRefObject<HTMLDivElement | null> {
        const ref = React.useRef<HTMLDivElement>( null );
        React.useEffect( () => {
            if (ref.current) {
                ref.current.scrollTop = ref.current.scrollHeight;
            }
        }, [dep] );

        return ref;
    }

    const ref = useChatScroll( messages )

    return <div ref={ref}
                style={{height: "30rem", overflowY: "auto"}}
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
            {message.userName}
            <div>{message.message}</div>
            <hr/>
        </div>
    </div>
}

const AddMessages: React.FC = () => {
    const channelStatus: ChannelStatusType = useSelector( (state: GlobalStateType) => state.chat.channelStatus ) // получить статус открытия канала

    const [message, setMessage] = useState<string>( "" ) // константа временного хранилища значения поля ввода
    const dispatch = useDispatch()

    const sendMessage = () => { // колбек отправеки сообщений
        message && dispatch( sendMessageThCr( message ) ) // отправить сообщение
        message && setMessage( "" ) // занулить поле ввода
    }

    const checkEnterPressed = (e: React.KeyboardEvent) => { // проверка нажатия Enter
        if (e.charCode === 13) {
            sendMessage()
        }
    }

    const isDisabled = channelStatus !== "ready"
    return <div>
        <input disabled={isDisabled} value={message} onChange={(e) => setMessage( e.target.value )}
               style={{width: "50rem"}}
               onKeyPress={(e) => checkEnterPressed( e )} // проверка нажатия Enter
        /> {/*поле ввода*/}
        <button onClick={sendMessage} disabled={isDisabled}>Send </button> {/*отправка сообщений */}
    </div>
}

const Chat: React.FC = () => {
    const dispatch = useDispatch()
    useEffect( () => {
        dispatch( startMessagesListening() )// открытие канала WS, создание подписок и слушателей событий
        return () => {
            dispatch( stopMessagesListening() ) // закрытие канала WS, удаление подписок и слушателей событий
        }
    }, [] )
    return <div>
        <Messages/> {/*отрисовка сообщений*/}
        <AddMessages/> {/*ввод сообщений и кнопка отправки*/}
    </div>
}
export default Chat
