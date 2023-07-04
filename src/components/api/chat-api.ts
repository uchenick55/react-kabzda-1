export type SubscriberType = (messages: Array<ChatMessagesType>) => void

export type ChatMessagesType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}

let subscribers = [] as  Array<SubscriberType>

let ws: WebSocket | null = null

const closeHandler = () => {
    console.log("CLOSE WS")
    setTimeout(()=>{
        createChannel()
    }, 3000)
}

const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers.forEach((s:SubscriberType)=>{
        s(newMessages)
    })
}
const openHandler = () => {
    console.log('open')
}

const closeChannelCommon = () => {
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('close', closeHandler)
    window.removeEventListener('offline', closeHandler)
}

const createChannel = () => {
    ws && closeChannelCommon()
    ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
    ws?.addEventListener('open', openHandler)
    ws?.addEventListener('message', messageHandler)
    ws?.addEventListener('close', closeHandler)
    window.addEventListener('offline', closeHandler)
}

const chatApi = {
    startChannel: () => {
        createChannel()
    },
    closeChannel: () => {
        subscribers = []
        closeChannelCommon()
    },
    subscribe: (callback: SubscriberType) => {
        subscribers.push(callback)
    },
    unsubscribe: (callback: SubscriberType) => {
        subscribers.filter((s:SubscriberType)=> s!==callback)
    },
    sendMessage: (newMessage: string) => {
        ws?.send(newMessage)
    }
}

export default chatApi
