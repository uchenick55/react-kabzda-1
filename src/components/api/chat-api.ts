export type SubscriberType<T> = (data: T) => void
// тип подписки - функция, принимающая данные и модицицирующая стейт через диспатч экшена

export type ChatMessagesType = { // тип сообщения через канал WS
    message: string,
    photo: string,
    userId: number,
    userName: string
}

export type ChannelStatusType = "pending" | "ready"

let subscribers = {
    "messages-received": [] as Array<SubscriberType<Array<ChatMessagesType>>>, // массив подписок, изначально пустой
    "status-changed": [] as Array<SubscriberType<ChannelStatusType>>// массив подписок, изначально пустой
}

type subscribersCallbackType = SubscriberType<ChatMessagesType[]> | SubscriberType<ChannelStatusType>

    console.log( "subscribers", subscribers )

let ws: WebSocket | null = null // канал websocket

const openHandler = () => { // обработчик при открытии канала websocket
    subscribers["status-changed"].forEach( (s: SubscriberType<ChannelStatusType>) => { // для каждого подписчика в массиве
        s( "ready" ) // вызвать функцию подписки и отправить параметрами массив новых сообщений
    } )
}

const messageHandler = (e: MessageEvent) => { // обработка события message
    const newMessages = JSON.parse( e.data ) // получить массив сообщений из пришедших данных по ws
    subscribers["messages-received"].forEach( (s: SubscriberType<Array<ChatMessagesType>>) => { // для каждого подписчика в массиве
        s( newMessages ) // вызвать функцию подписки и отправить параметрами массив новых сообщений
    } )
}

const closeHandler = () => { // обработчик по событию close
    console.log( "The network connection has been lost." );

    subscribers["status-changed"].length > 0 &&
        subscribers["status-changed"].forEach( (s: SubscriberType<ChannelStatusType>) => { // для каждого подписчика в массиве
            s( "pending" ) // вызвать функцию подписки и отправить параметрами массив новых сообщений
        } )

    setTimeout( () => {
        createChannel() // открыть новый канал по истечению задержки после закрытия старого
    }, 3000 )
}


const closeChannelCommon = () => {// функция закрытия канала
    ws?.removeEventListener( 'open', openHandler )// удалить слушатель закрытия канала
    ws?.removeEventListener( 'message', messageHandler )// удалить слушатель новых сообщений
    ws?.removeEventListener( 'close', closeHandler ) // удалить слушатель закрытия канала
    ws?.close() // закрыть сам канал
    window.removeEventListener( 'offline', closeHandler ) // удалить слушатель потери интернет соединения
    console.log( "WS CLOSE" );

}

const createChannel = () => { // создать новый канал WS
    ws && closeChannelCommon() // перед открытием нового канала, если старый канал WS не нулевой, закрыть слушатели и сам канал
    ws = new WebSocket( "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx" ) // открыть канал WS
    ws?.addEventListener( 'open', openHandler ) // добавить слушатель открытия канала
    ws?.addEventListener( 'message', messageHandler )// добавить слушатель новых сообщений
    ws?.addEventListener( 'close', closeHandler )// добавить слушатель закрытия канала
    window.addEventListener( 'offline', closeHandler ) // добавить слушатель потери интернет соединения
}

type subscribeEventType = 'status-changed' | "messages-received"
const chatApi = {// api методы chat
    startChannel: () => {// метод создания нового канала WS
        createChannel()
    },
    closeChannel: () => { // метод закрытия канала, удаления слушателей и зануления массива подписок
        //subscribers["messages-received"] = [] // занулить массив подписчиков, вроде не нужно, мы и так отписки делаем
        closeChannelCommon() // функция закрытия канала
    },
    subscribe: (subscribeEvent: subscribeEventType, callback: any) => {// метод подписки на выбранного подписчика (отправка сообщений)

        if (subscribeEvent === "messages-received") {
            subscribers["messages-received"].push( callback )
            console.log( "subscribe, messages-received", subscribers )

        }
        if (subscribeEvent === "status-changed") {
            subscribers["status-changed"].push( callback )
            console.log( "subscribe, status-changed:", subscribers )
        }
    },
    unsubscribe: (subscribeEvent: subscribeEventType, callback: any) => { // метод отписки от выбранного подписчика (отправка сообщений)
        if (subscribeEvent === "messages-received") {
            subscribers["messages-received"].filter( (s: SubscriberType<Array<ChatMessagesType>>) => s !== callback )
            console.log( "subscribe, status-changed:", subscribers )
        }
        if (subscribeEvent === "status-changed") {
            subscribers["status-changed"].filter( (s: SubscriberType<ChannelStatusType>) => s !== callback )
            console.log( "unsubscribe, status-changed:", subscribers )
        }
    },
    sendMessage: (newMessage: string) => { // метод отправить сообщение через канал WS
        ws?.send( newMessage )
    }
}

export default chatApi

