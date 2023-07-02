type SubscriberType = (messages: Array<ChatMessageType>) => void

export type ChatMessageType = { // тип сообщений чата
    message: string,
    photo: string,
    userId: number,
    userName: string
}

let subscribers = [] as Array<SubscriberType> // массив подписчиков
let ws: WebSocket | null = null // временная переменная канала websocket

const closeHandler = () => { // обработчик закрытия канала websocket
    console.log( "CLOSE WS" )
   // setWsChannel(null) // зануляем канал, если прило событие close
    setTimeout(()=>createChannel(),3000) // пересоздаем новый канал при закрытии старого
}

const messageHandler = (e: MessageEvent) => { // обработчик новых сообщений
    const newMessages = JSON.parse( e.data ) // получить массив новых сообщений
    subscribers.forEach((s:SubscriberType)=>{
        s(newMessages)
    })
}
const openHandler = () => { // обработчик при открытии канала websocket
    setTimeout(()=>{
        // setReadyStatus( "ready" ) // добавить флаг доступности кнопки и поля ввода
        console.log( 'open' )
    },2000)
}

const closeChannelCommon = () => {// закрыть канал, всех слушателей и подписки
    subscribers = [] // занулить список подписчиков при закрытии канала
    ws?.removeEventListener( 'open', openHandler )// добавить слушатель события открытого канала websocket
    ws?.removeEventListener( 'close', closeHandler )// убрать слушатель события закрытия канала websocket
    ws?.removeEventListener( 'message', messageHandler ) // убрать слушатель события новых сообщений
    ws?.close() // закрыть сам канал
}

const createChannel = () => { // обработчик создания нового канала websocket
    closeChannelCommon() // закрыть канал, всех слушателей и подписчиков перед созданием нового канала

    ws = new WebSocket( 'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx' ) // создать новый канал
    ws?.addEventListener( 'open', openHandler )// добавить слушатель события открытого канала websocket
    ws?.addEventListener( 'close', closeHandler )// добавить слушатель события закрытия канала websocket
    ws?.addEventListener( 'message', messageHandler ) // добавить слушатель события новых сообщений
}

export const chatAPI = {
    startChannel: () => {
        createChannel()
    },
    closeChannel: () => {
        closeChannelCommon()
    },
    subscribe: (callback: SubscriberType) => { // метод подписки на новые сообщений
        subscribers.push( callback )// добавить ноые сообщения к уже подгруженным ранее
        return () => {
            subscribers.filter((s:SubscriberType)=> s !== callback) // альтернатива отписки
        }
    },
    unsubscribe: (callback: SubscriberType) => { // метод отписки от новых сообщений
        subscribers.filter((s:SubscriberType)=> s !== callback) // оставляем всех подписчиков, кроме принятого в аргументах
    },
    sendMessage: (message: string) => {
        ws?.send(message)
    }
}
