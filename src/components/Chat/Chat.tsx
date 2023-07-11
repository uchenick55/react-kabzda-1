import React, {memo, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {GlobalStateType} from "../../redux/store-redux";
import {ChannelStatusType, ChatMessagesType} from "../api/chat-api";
import {chatActions, sendMessageThCr, startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer";
import AddMessagesFormik from "./AddMessages/AddMessagesFormikBS";
import Toast from 'react-bootstrap/Toast';

const Messages: React.FC = memo( () => { // отрисовка всех сообщений
    //console.log( "Messages" )
    const [shouldScroll, setShouldScroll] = useState<boolean>( false ) // маркер следует ли прокрутить контент вниз
    const [firstScrolled, setFirstScrolled] = useState<boolean>( false ) // маркер разовой прокрутки вниз в начале
    const messages: Array<ChatMessagesType> = useSelector( (state: GlobalStateType) => state.chat.messages ) // получить сообщения из стейта

    const container = useRef<HTMLDivElement>( null )

    useEffect( () => {
        const {
            scrollHeight, // высота всего контента с учетом прокрутки
            offsetHeight,// высота видимого содержимого без прокрутки
            scrollTop// высота, насколько прокручен контент
        } =
            container.current as HTMLDivElement
        if (scrollHeight <= scrollTop + offsetHeight + 300) {
            setShouldScroll( true )
           // console.log( 'setShouldScroll=>True' )
        }

        if (!firstScrolled && messages.length > 0) {
            setShouldScroll( true )
            setFirstScrolled( true )
           // console.log( "setShouldScroll( true ) + setFirstScrolled( true )" )
        }

    }, [messages] )

    const scrollFn = () => {
        const {
            scrollHeight, // высота всего контента с учетом прокрутки
        } =
            container.current as HTMLDivElement

        container.current?.scrollTo( {top: scrollHeight, behavior: 'smooth'} )
        setShouldScroll( false ) //
    }

    useEffect( () => { // прокручиваем список сообщений
        shouldScroll === true && scrollFn() // если маркер shouldScroll стоит в  true
    }, [shouldScroll] )

    return <div
        ref={container}
        style={{height: "15rem", overflowY: "auto"}}
    >
        {messages.map( (message: ChatMessagesType, index: number) => { // пробегаем по списку сообщений из стейта
            return <Message key={index} message={message}/> // отрисовываем сообщения поэлементно
        } )}
    </div>
} )

const Message: React.FC<{ message: ChatMessagesType }> = memo( ({message}) => { // отрисовка одного сообщения (фото, тела и имени пользователя)
    //console.log( "Message" )
    return <div>
        <div>
            <img src={message.photo} alt="avatar" style={{height: "30px"}}/>
            <b>{message.userName}</b>{" "}{message.message}
            <hr/>
        </div>
    </div>
} )

const AddMessages: React.FC = () => {
    //console.log( "AddMessages" )
    const channelStatus: ChannelStatusType = useSelector( (state: GlobalStateType) => state.chat.channelStatus ) // получить статус открытия канала

    const dispatch = useDispatch()

    const sendMessage = (message: string) => { // колбек отправеки сообщений
        message && dispatch( sendMessageThCr( message ) ) // отправить сообщение
    }

    return <AddMessagesFormik sendMessage={sendMessage} channelStatus={channelStatus}/>
}

const Chat: React.FC = memo( () => {
    //console.log( "Chat" )
    const {switchRenderChat, setChatInitialState} = chatActions // экшн смены флага отрисовки чата

    const theme = useSelector( (state: GlobalStateType) => state.theme.themeBLL ) // флаг темы
    const dispatch = useDispatch()

    useEffect( () => {
        dispatch( startMessagesListening() )// открытие канала WS, создание подписок и слушателей событий
        return () => {
            dispatch( stopMessagesListening() ) // закрытие канала WS, удаление подписок и слушателей событий
            dispatch( setChatInitialState() ) // зануление стейта чата при размонтировании компоненты
        }
    }, [] )

    return <Toast bg={theme} onClose={() => dispatch( switchRenderChat() )}>
        <Toast.Header>
            <strong className="me-auto">Общий чат</strong>
        </Toast.Header>
        <Toast.Body>

            <Messages/> {/*отрисовка сообщений*/}
            <AddMessages/> {/*ввод сообщений и кнопка отправки*/}

        </Toast.Body>
    </Toast>
})
export default Chat
