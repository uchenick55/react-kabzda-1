import React, {useEffect, useState} from "react";

type ChatMessageType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}

const wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx' )


const Chat:React.FC = () => {
    return <div>
        <Messages/>
        <AddMessages/>
    </div>
}

const AddMessages: React.FC = () => {
    const [message, setMessage] = useState<string>( "" )

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
        <button onClick={sendMessage}>Send</button>
    </div>
}


const Messages:React.FC = () => {
    const [messages, setMessages] = useState<Array<ChatMessageType>>([])

    useEffect(()=>{
        wsChannel.addEventListener('message', (e:MessageEvent)=>{
            const newMessages = JSON.parse(e.data)
            setMessages((prevState => [...prevState, ...newMessages]))
        })
    },[])

    return <div style={{height: "400px", overflowY: "auto"}}>
        {messages.map((m, index)=><Message key={index} message = {m}/>)}
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

const ChatPage:React.FC = () => {
    return <div>
        <Chat/>
    </div>
}
export default ChatPage
