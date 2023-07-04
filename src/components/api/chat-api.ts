type SubscriberType = // определение типа подписки
    (messages: Array<ChatMessageType>) // это функция, которая принимает массив сообщений от с сервера по WS
        => void // и ничего не возвращает

export type ChatMessageType = { // тип сообщений чата
    message: string,
    photo: string,
    userId: number,
    userName: string
}

let subscribers = [] as Array<SubscriberType> // массив подписок
let ws: WebSocket | null = null // временная переменная канала websocket

const closeHandler = () => { // обработчик закрытия канала websocket
    console.log("The network connection has been lost.");
    setTimeout(()=>createChannel(),3000) // пересоздаем новый канал при закрытии старого
}

const messageHandler = (e: MessageEvent) => { // обработчик новых сообщений
    const newMessages = JSON.parse( e.data ) // получить массив новых сообщений
    subscribers.forEach((s:SubscriberType)=>{ // пробежать по массиву подписок
        s(newMessages) // каждой подписке отправить массив новых сообщений
    })
}
const openHandler = () => { // обработчик при открытии канала websocket
    setTimeout(()=>{
        console.log( 'open' ) // вывести в консоль открытие канала с задержкой
    },2000)
}

const closeChannelCommon = () => {// закрыть канал, всех слушателей
    ws?.removeEventListener( 'open', openHandler )// добавить слушатель события открытого канала websocket
    ws?.removeEventListener( 'message', messageHandler ) // убрать слушатель события новых сообщений
    ws?.removeEventListener( 'close', closeHandler )// убрать слушатель события закрытия канала websocket
    ws?.close() // закрыть сам канал
    window.removeEventListener("offline", closeHandler);// убрать слушатель события обрыва сети
}

const createChannel = () => { // обработчик создания нового канала websocket
    ws && closeChannelCommon() // закрыть канал, всех слушателей перед созданием нового канала

    ws = new WebSocket( 'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx' ) // создать новый канал
    ws?.addEventListener( 'open', openHandler )// добавить слушатель события открытого канала websocket
    ws?.addEventListener( 'message', messageHandler ) // добавить слушатель события новых сообщений
    ws?.addEventListener( 'close', closeHandler )// добавить слушатель события закрытия канала websocket
    window.addEventListener("offline", closeHandler);// добавить слушатель события обрыва сети
}

export const chatAPI = {
    startChannel: () => {
        createChannel() // создать канал
    },
    closeChannel: () => {
        subscribers = [] // занулить список подписок при закрытии канала
        closeChannelCommon()// закрыть канал, всех слушателей
    },
    subscribe: (callback: SubscriberType) => { // метод подписки на новые сообщений
        subscribers.push( callback )// добавить новую подписку
        return () => {
            subscribers.filter((s:SubscriberType)=> s !== callback) // удалить подписку (альтернативный вариант метода unsubscribe)
        }
    },
    unsubscribe: (callback: SubscriberType) => { // метод отписки от новых сообщений
        subscribers.filter((s:SubscriberType)=> s !== callback) // оставляем все подписки, кроме принятой в аргументах
    },
    sendMessage: (message: string) => {
        ws?.send(message) // отправитьновое сообщение
    }
}
