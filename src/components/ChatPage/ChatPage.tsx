import React, {useEffect, useState} from "react";

type ChatMessageType = { // тип сообщений чата
    message: string,
    photo: string,
    userId: number,
    userName: string
}

type WebSocketType = WebSocket | null // тип объекта вебсокет

const Messages: React.FC<{ wsChannel: WebSocketType }> = ({wsChannel}) => {
    const [messages, setMessages] = useState<Array<ChatMessageType>>( [] ) // массив сообщений чата с сервера

    useEffect( () => {
        const messageHandler = (e: MessageEvent) => { // обработчик новых сообщений
            const newMessages = JSON.parse( e.data ) // получить массив новых сообщений
            setMessages( (prevState => [...prevState, ...newMessages]) ) // добавить новые сообщения к ранее загруженным
        }
        wsChannel?.removeEventListener( 'message', messageHandler ) // перед добавлением нового слушателя, удалить старый

        wsChannel?.addEventListener( 'message', messageHandler ) // добавить слушатель события новых сообщений
        return () => {
            wsChannel?.removeEventListener( 'message', messageHandler )// при закрытии useEffect удалить открытые ранее слушатели
        }
    }, [wsChannel] )

    return <div style={{height: "400px", overflowY: "auto"}}> {/*отрисовка списка сообщений*/}
        {messages.map( (m, index) => <Message key={index} message={m}/> )}
    </div>
}

const Message: React.FC<{ message: ChatMessageType }> = ({message}) => {//отрисовка списка сообщений
    return <div>
        <img src={message.photo} style={{width: "30px"}}/> {/*аватарка собеседника*/}
        <b>{message.userName}</b> {/* его имя*/}
        <br/>
        {message.message} {/*само сообщение*/}
        <hr/>
    </div>
}


const AddMessages: React.FC<{ wsChannel: WebSocketType }> = ({wsChannel}) => {
    const [message, setMessage] = useState<string>( "" )
    const [readyStatus, setReadyStatus] = useState<'pending' | "ready">( "pending" )

    useEffect( () => {
        const openHandler = () => { // обработчик при открытии канала websocket
            setReadyStatus( "ready" ) // добавить флаг доступности кнопки и поля ввода
            console.log( 'open' )
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
    }, [wsChannel] )

    const sendMessage = () => { // ввод новых сообщений
        message && wsChannel?.send( message ) // если поле ввода не пустое, отправить новое сообщение
        setMessage( "" ) // занулить поле воода
    }
    const isDisabled = readyStatus !== 'ready' // флаг доступности кнопки и поля ввода
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
    const [wsChannel, setWsChannel] = useState<WebSocketType>( null ) // хранилище канала websocket

    useEffect( () => {
        let ws: WebSocket // временная переменная канала websocket

        const closeHandler = () => { // обработчик закрытия канала websocket
            console.log( "CLOSE WS" )
            setWsChannel(null) // зануляем канал, если прило событие close
            setTimeout(()=>createChannel(),3000) // пересоздаем новый канал при закрытии старого
        }

        const createChannel = () => { // обработчик создания нового канала websocket
            ws?.removeEventListener('close', closeHandler)// перед добавлением нового слушателя, удалить старый

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

    return <div>
        <Messages wsChannel={wsChannel}/> {/*отрисовка сообщений чата из websocket*/}
        <AddMessages wsChannel={wsChannel}/> {/*добавить сообщения в чат websocket*/}
    </div>
}
export default Chat


