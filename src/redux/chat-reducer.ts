import {chatAPI, ChatMessageType} from "../components/api/chat-api";
import {InferActionsTypes} from "./store-redux";
import {ComThunkTp} from "../components/common/types/commonTypes";
import {Dispatch} from "redux";

const SET_MESAGEG = "myApp/dialog2-reducer/SET_MESAGEG";

export const chatActions = {

    setMessagesAC: (messages: Array<ChatMessageType>) => {
        return {type: SET_MESAGEG, messages} as const
    },
}

type ChatActionsTypes =
    InferActionsTypes<typeof chatActions>

const initialState = {
    messages: [] as Array<ChatMessageType>,
}

type InitialStateChatType = typeof initialState

const ChatReducer = (state: InitialStateChatType = initialState, action: ChatActionsTypes): InitialStateChatType => {
    let stateCopy: InitialStateChatType // объявлениечасти части стейта до изменения редьюсером
    switch (action.type) {
        case SET_MESAGEG: // список всех диалогов
            stateCopy = {
                ...state,
                messages: [...state.messages, ...action.messages], // добавить новые сообщения к ранее загруженным
            }
            return stateCopy
        default:
            return state
    }
}

type ThType = ComThunkTp<ChatActionsTypes> // тип, выведенный из общего типа санок сс учетом локального типа AC
// const newMessageHandlerCreator = (dispatch:Dispatch) => //креатор, который поставляет dispatch.
//      ((messages: Array<ChatMessageType>) => { //
//          dispatch( chatActions.setMessagesAC( messages ) )// добавляем массив новых сообщений с стейт серез AC
// })

let _newMessageHandler: // приватная переменная
    ((messages: Array<ChatMessageType>) => void) // она равна либо функции, принимающей массив сообщений для дальнейшей записи в стейт
    | null = null // либо null (по умолчанию)

const newMessageHandlerCreator = (dispatch: Dispatch) => { //креатор, который поставляет dispatch
    if (_newMessageHandler === null) { // если приватная переменная _newMessageHandler равна null
        _newMessageHandler = (messages: Array<ChatMessageType>) => { // то ей присваиваем функцию, принимающую массив сообщений
            dispatch( chatActions.setMessagesAC( messages ) )// эта функция будет добавлять массив новых сообщений с стейт
        }
    }
    // в противном случае возвращаем ранее созданную (записаную) переменную _newMessageHandler
    return _newMessageHandler
}

export const startMessagesListening = (): ThType => {// начать слушать получение сообщений
    return async (dispatch, getState) => {
        chatAPI.startChannel() // открыть канал со всеми слушателями событий
        chatAPI.subscribe( newMessageHandlerCreator( dispatch ) ) // передать в массив подписок колбек-телефончик для обновления сообщений в стейте
    }
}
export const stopMessagesListening = (): ThType => {// закончить слушать получение сообщений
    return async (dispatch, getState) => {
        chatAPI.unsubscribe( newMessageHandlerCreator( dispatch ) ) // убрать из массива подписок колбек-телефончик обновления сообщений в стейте
        chatAPI.closeChannel() // удалить канал, очистить массив подписчиков и слушателей событий
    }
}
export const sendMessageThCr = (message: string): ThType => {// отправить сообщение
    return async (dispatch, getState) => {
        chatAPI.sendMessage( message ) // отправить сообщение
    }
}

export default ChatReducer










