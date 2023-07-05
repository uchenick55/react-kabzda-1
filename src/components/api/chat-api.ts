export type SubscriberType = (messages: Array<ChatMessagesType>) => void
// тип подписки - функция, принимающая массив сообщений и модицицирующая стейт через диспатч экшена

export type ChatMessagesType = { // тип сообщения через канал WS
    message: string,
    photo: string,
    userId: number,
    userName: string
}

let subscribers = [] as  Array<SubscriberType> // массив подписок, изначально пустой

let ws: WebSocket | null = null // канал websocket

const closeHandler = () => { // обработчик по событию close
    console.log("The network connection has been lost.");
    setTimeout(()=>{
        createChannel() // открыть новый канал по истечению задержки после закрытия старого
    }, 3000)
}

const messageHandler = (e: MessageEvent) => { // обработка события message
    const newMessages = JSON.parse(e.data) // получить массив сообщений из пришедших данных по ws
    subscribers.forEach((s:SubscriberType)=>{ // для каждого подписчика в массиве
        s(newMessages) // вызвать функцию подписки и отправить параметрами массив новых сообщений
    })
}
const openHandler = () => { // обработчик при открытии канала websocket
    setTimeout(()=>{
        console.log( 'open' ) // вывести в консоль открытие канала с задержкой
    },2000)
}

const closeChannelCommon = () => {// функция закрытия канала
    ws?.removeEventListener('open', openHandler)// удалить слушатель закрытия канала
    ws?.removeEventListener('message', messageHandler)// удалить слушатель новых сообщений
    ws?.removeEventListener('close', closeHandler) // удалить слушатель закрытия канала
    ws?.close() // закрыть сам канал
    window.removeEventListener('offline', closeHandler) // удалить слушатель потери интернет соединения
    console.log("WS CLOSE");

}

const createChannel = () => { // создать новый канал WS
    ws && closeChannelCommon() // перед открытием нового канала, если старый канал WS не нулевой, закрыть слушатели и сам канал
    ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx") // открыть канал WS
    ws?.addEventListener('open', openHandler) // добавить слушатель открытия канала
    ws?.addEventListener('message', messageHandler)// добавить слушатель новых сообщений
    ws?.addEventListener('close', closeHandler)// добавить слушатель закрытия канала
    window.addEventListener('offline', closeHandler) // добавить слушатель потери интернет соединения
}

const chatApi = {// api методы chat
    startChannel: () => {// метод создания нового канала WS
        createChannel()
    },
    closeChannel: () => { // метод закрытия канала, удаления слушателей и зануления массива подписок
        subscribers = [] // занулить массив подписчиков, вроде не нужно, мы и так отписки делаем
        closeChannelCommon() // функция закрытия канала
    },
    subscribe: (callback: SubscriberType) => {// метод подписки на выбранного подписчика (отправка сообщений)
        subscribers.push(callback)
        return () => { // альтернатива методу unsubscribe
            subscribers.filter((s:SubscriberType)=> s!==callback)
        }
    },
    unsubscribe: (callback: SubscriberType) => { // метод отписки от выбранного подписчика (отправка сообщений)
        subscribers.filter((s:SubscriberType)=> s!==callback)
    },
    sendMessage: (newMessage: string) => { // метод отправить сообщение через канал WS
        ws?.send(newMessage)
    }
}

export default chatApi

