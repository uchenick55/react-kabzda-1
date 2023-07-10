import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {GlobalStateType} from "../../redux/store-redux";
import {ChannelStatusType, ChatMessagesType} from "../api/chat-api";
import {chatActions, sendMessageThCr, startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer";
import AddMessagesFormik from "./AddMessages/AddMessagesFormikBS";
import classes from "./chat.module.css";
import CloseButton from 'react-bootstrap/CloseButton';

const Messages: React.FC = () => { // отрисовка всех сообщений
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
        }

        if (!firstScrolled && messages.length > 0) {
            setShouldScroll( true )
            setFirstScrolled( true )
        }

    }, [messages] )

    const scrollFn = () => {
        const {
            scrollHeight, // высота всего контента с учетом прокрутки
        } =
            container.current as HTMLDivElement

        //container.current?.scrollTo( 0, scrollHeight )
        container.current?.scrollTo( {top: scrollHeight, behavior: 'smooth'} )
        setShouldScroll( false ) //
        //console.log('прокрутили, меняем маркет - прокручивать больше не нужно')
    }

    useEffect( () => { // прокручиваем список сообщений
        shouldScroll === true && scrollFn() // если маркер shouldScroll стоит в  true
    }, [shouldScroll] )

    return <div
        ref={container}
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
    const channelStatus: ChannelStatusType = useSelector( (state: GlobalStateType) => state.chat.channelStatus ) // получить статус открытия канала

    const dispatch = useDispatch()

    const sendMessage = (message: string) => { // колбек отправеки сообщений
        message && dispatch( sendMessageThCr( message ) ) // отправить сообщение
    }

    const isDisabled = channelStatus !== "ready"
    return <AddMessagesFormik sendMessage={sendMessage} isDisabled={isDisabled}/>
}
type ChatType = {
    showChatBookmark: boolean // флаг отображения закладки чата на странице
    setShowChatBookmark: (showChatBookmark: boolean) => void // функция смены флага отображения закладки чата на странице
}

const Chat: React.FC<ChatType> = ({showChatBookmark, setShowChatBookmark}) => {
    console.log( "Chat" )
    const {switchRenderChat, setChatInitialState} = chatActions // экшн смены флага отрисовки чата

    const renderChat = useSelector( (state: GlobalStateType) => state.chat.renderChat ) // флаг отрисовки чата

    const [isChatVisible, setIsChatVisible] = useState<boolean>( false ) // флаг и колбек видимости чата на странице (либо за ее пределами)

    const dispatch = useDispatch()

    const makeChatInvisible = () => {
        console.log( "makeChatInvisible" )
        setIsChatVisible( false )
        setTimeout( () => {
            console.log( "renderChat => false" )
            dispatch( switchRenderChat() )
        }, 1000 )
    }

    useEffect( () => {
        dispatch( startMessagesListening() )// открытие канала WS, создание подписок и слушателей событий
        return () => {
            dispatch( stopMessagesListening() ) // закрытие канала WS, удаление подписок и слушателей событий
            dispatch( setChatInitialState() ) // зануление стейта чата при размонтировании компоненты
        }
    }, [] )

    useEffect( () => {
        console.log( "Chat rendered, invisible" )

        const id = setTimeout( () => {
            if (!renderChat) {
                setIsChatVisible( true )
                console.log( "Chat rendered, visible" )
            }
            return () => {
                clearTimeout( id )
            }
        }, 2000 )

    }, [renderChat] )
    return <div>
        {renderChat && <div
            className={`${classes.ChatCommon} ${isChatVisible ? classes.MakeChatVisible : classes.MakeChatInvisible}`}
        >
            <CloseButton onClick={makeChatInvisible}/>
            <Messages/> {/*отрисовка сообщений*/}
            <AddMessages/> {/*ввод сообщений и кнопка отправки*/}
        </div>}
    </div>
}
export default Chat
