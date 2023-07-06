import {InferActionsTypes} from "./store-redux";
import {ComThunkTp} from "../components/common/types/commonTypes";
import chatApi, {ChannelStatusType, ChatMessagesType, SubscriberType} from "../components/api/chat-api";
import {Dispatch} from "redux";

const SET_MESSAGE = "myApp/dialog2-reducer/SET_MESSAGE";
const SET_CHANNEL_STATUS = "myApp/dialog2-reducer/SET_CHANNEL_STATUS";

export const chatActions = {

    setMessageAC: (newMessages: Array<ChatMessagesType>) => { // экшн креатор обновления сообщений в стейте
        return {type: SET_MESSAGE, newMessages} as const
    },
    setChannelStatus: (channelStatus: ChannelStatusType) => { // экшн креатор обновления сообщений в стейте
        return {type: SET_CHANNEL_STATUS, channelStatus} as const
    },
}

type ChatActionsTypes =
    InferActionsTypes<typeof chatActions>


const initialState = {
    messages: [] as Array<ChatMessagesType>,
    channelStatus: "pending" as ChannelStatusType
}

type InitialStateChatType = typeof initialState

const chatReducer = (state: InitialStateChatType = initialState, action: ChatActionsTypes): InitialStateChatType => {
    let stateCopy: InitialStateChatType // объявлениечасти части стейта до изменения редьюсером
    switch (action.type) {
        case SET_MESSAGE:
            stateCopy = {
                ...state,
                messages: [...state.messages, ...action.newMessages], // обновление сообщений в стейте (добавить к ранее загруженным)
            }
            return stateCopy
        case SET_CHANNEL_STATUS:
            stateCopy = {
                ...state,
                channelStatus: action.channelStatus, // обновление статуса канала WS
            }
            return stateCopy
        default:
            return state
    }
}

type ThType = ComThunkTp<ChatActionsTypes> // тип, выведенный из общего типа санок сс учетом локального типа AC

let _newMessagesHandler: SubscriberType<Array<ChatMessagesType>> | null = null
// приватная переменная, по умолчанию null, но может принимать начение колбека для обновления сообщений в стейте

const newMessagesHandleCreator = (dispatch: Dispatch) => { // креатор, принимает dispatch и возвращает колбек обновления сообщений
    if (_newMessagesHandler === null) { // если приватная переменная пустая
        _newMessagesHandler = (newMessages: Array<ChatMessagesType>)=> { // присвоить ей функцию, принимающую массив новых сообщений из канала WS
            dispatch(chatActions.setMessageAC(newMessages)) // эта функция может обновлять сообщения в стейте
        }
    }
    return  _newMessagesHandler // вернуть переменную - колбек обновления сообщений в стейте
}
let _statusChangedHandler: SubscriberType<ChannelStatusType> | null = null
// приватная переменная, по умолчанию null, но может принимать начение колбека для обновления статуса готовности канала ws

const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null ) {
        _statusChangedHandler = (channelStatus: ChannelStatusType) => {
            dispatch(chatActions.setChannelStatus(channelStatus))
        }
    }
    return  _statusChangedHandler // вернуть переменную - колбек обновления статуса канала в стейте
}

export const startMessagesListening = (): ThType => { // санкреатор открытие канала WS, создание подписок и слушателей событий
    return async (dispatch, getState) => {//
        chatApi.startChannel() // создать канал и слушатели событий
        chatApi.subscribe("messages-received", newMessagesHandleCreator(dispatch)) // передать колбек подписки в dal для обновления сообщений в стейте
        chatApi.subscribe("status-changed",statusChangedHandlerCreator(dispatch)) // передать колбек подписки в dal для обновления статуса канала в стейте
    }
}
export const stopMessagesListening = (): ThType => { // санкреатор закрытие канала WS, удаление подписок и слушателей событий
    return async (dispatch, getState) => {//
        chatApi.unsubscribe("messages-received", newMessagesHandleCreator(dispatch)) // убрать колбек подписки из dal обновления сообщений в стейте
        chatApi.unsubscribe("status-changed",statusChangedHandlerCreator(dispatch)) // убрать колбек подписки из dal обновления статуса канала в стейте
        chatApi.closeChannel() // удалить канал и слушателей событий
    }
}
export const sendMessageThCr = (newMessage: string): ThType => { // санкреатор отправки сообщения
    return async (dispatch, getState) => {
        chatApi.sendMessage(newMessage) // отправить сообщение
    }
}

export default chatReducer

