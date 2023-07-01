import React, {useEffect, useState} from "react";

type ChatMessageType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}

const Messages: React.FC<{ wsChannel: WebSocketType }> = ({wsChannel}) => {
    const [messages, setMessages] = useState<Array<ChatMessageType>>( [] )

    useEffect( () => {
        wsChannel?.addEventListener( 'message', (e: MessageEvent) => {
            const newMessages = JSON.parse( e.data )
            setMessages( (prevState => [...prevState, ...newMessages]) )
        } )
    }, [wsChannel] )

    return <div style={{height: "400px", overflowY: "auto"}}>
        {messages.map( (m, index) => <Message key={index} message={m}/> )}
    </div>
}

const Message: React.FC<{ message: ChatMessageType }> = ({message}) => {
    return <div>
        <img src={message.photo} style={{width: "30px"}}/> <b>{message.userName}</b>
        <br/>
        {message.message}
        <hr/>
    </div>
}


const AddMessages: React.FC<{ wsChannel: WebSocketType }> = ({wsChannel}) => {
    const [message, setMessage] = useState<string>( "" )
    const [readyStatus, setReadyStatus] = useState<'pending' | "ready">( "pending" )

    useEffect( () => {
        wsChannel?.addEventListener( 'open', () => {
            setReadyStatus( "ready" )
            console.log( 'open' )
        } )
    }, [wsChannel] )

    const sendMessage = () => {
        if (!message) {
            return
        }
        wsChannel?.send( message )
        setMessage( "" )
    }
    return <div>
        <input
            value={message}
            onChange={(e) => {
                setMessage( e.currentTarget.value )
            }}
        />
        <button onClick={sendMessage} disabled={wsChannel === null || readyStatus !== 'ready'}>Send</button>
    </div>
}

type WebSocketType = WebSocket | null

const Chat: React.FC = () => {
    const [wsChannel, setWsChannel] = useState<WebSocketType>( null )

    useEffect( () => {
        const createChannel = () => {
            const ws = new WebSocket( 'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx' )
            ws.addEventListener( 'close', () => {
                console.log( "CLOSE WS" )
                setTimeout(()=>createChannel(),3000)
            } )
            setWsChannel( ws )
        }
        createChannel()

    }, [] )

    return <div>
        <Messages wsChannel={wsChannel}/>
        <AddMessages wsChannel={wsChannel}/>
    </div>
}
export default Chat


