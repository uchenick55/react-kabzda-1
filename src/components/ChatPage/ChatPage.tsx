import React, {useEffect, useState} from "react";
import userPhoto from "../../assets/images/no-image3.png";
import {ChatMessageType} from "../api/chat-api";
import {useDispatch, useSelector} from "react-redux";
import {sendMessageThCr, startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer";
import {GlobalStateType} from "../../redux/store-redux";



type WebSocketType = WebSocket | null // тип объекта вебсокет

const Messages: React.FC = () => {
   // const [messages, setMessages] = useState<Array<ChatMessageType>>( [] ) // массив сообщений чата с сервера

    const messages:Array<ChatMessageType> = useSelector((state:GlobalStateType) => state.chat.messages )

    // useEffect( () => {
    //     const messageHandler = (e: MessageEvent) => { // обработчик новых сообщений
    //         const newMessages = JSON.parse( e.data ) // получить массив новых сообщений
    //         setMessages( (prevState => [...prevState, ...newMessages]) ) // добавить новые сообщения к ранее загруженным
    //     }
    //     wsChannel?.removeEventListener( 'message', messageHandler ) // перед добавлением нового слушателя, удалить старый
    //
    //     wsChannel?.addEventListener( 'message', messageHandler ) // добавить слушатель события новых сообщений
    //     return () => {
    //         wsChannel?.removeEventListener( 'message', messageHandler )// при закрытии useEffect удалить открытые ранее слушатели
    //     }
    // }, [wsChannel] )

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
    const [readyStatus, setReadyStatus] = useState<'pending' | "ready">( "pending" )

    const dispatch = useDispatch()

/*    useEffect( () => {
        const openHandler = () => { // обработчик при открытии канала websocket
            setTimeout(()=>{
                setReadyStatus( "ready" ) // добавить флаг доступности кнопки и поля ввода
                console.log( 'open' )
            },2000)
        }

        if (!wsChannel) {// если нет канала websocket
            setReadyStatus("pending") // убрать флаг доступности кнопки и поля ввода

        }
        wsChannel?.removeEventListener('open', openHandler)// перед добавлением нового слушателя, удалить старый

        wsChannel?.addEventListener( 'open', openHandler )// добавить слушатель события открытого канала websocket

        return () => {
            wsChannel?.removeEventListener('open', openHandler)// при закрытии useEffect удалить открытые ранее слушатели
            setReadyStatus("pending")
        }
    }, [wsChannel] )*/

    const sendMessage = () => { // ввод новых сообщений
      //  message && wsChannel?.send( message ) // если поле ввода не пустое, отправить новое сообщение
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
 //   const [wsChannel, setWsChannel] = useState<WebSocketType>( null ) // хранилище канала websocket

/*
    useEffect( () => {
        let ws: WebSocket // временная переменная канала websocket

        const closeHandler = () => { // обработчик закрытия канала websocket
            console.log( "CLOSE WS" )
            setWsChannel(null) // зануляем канал, если прило событие close
            setTimeout(()=>createChannel(),3000) // пересоздаем новый канал при закрытии старого
        }

        const createChannel = () => { // обработчик создания нового канала websocket
            ws?.removeEventListener('close', closeHandler)// перед добавлением нового слушателя, удалить старый
            ws?.close() // закрыть канал перед открытием нового

            ws = new WebSocket( 'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx' ) // создать новый канал
            ws.addEventListener( 'close', closeHandler )// добавить слушатель события закрытия канала websocket
            setWsChannel( ws ) // записать в локальное хранилище объект канала websocket
        }

        createChannel()
        return () => {
            ws.removeEventListener('close', closeHandler)// при закрытии useEffect удалить открытые ранее слушатели
            ws.close() // закрыть канал при завершении useEffect
        }
    }, [] )
*/

   // мы хотим запустить startMessagesListening
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


