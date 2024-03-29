import {InferActionsTypes} from "./store-redux";
import {ComThunkTp} from "../components/common/types/commonTypes";
import chatApi, {
    ChannelStatusType,
    ChatMessagesType,
    ChatMessagesTypeWithId,
    SubscriberType
} from "../components/api/chat-api";
import {Dispatch} from "redux";
import uniqid from 'uniqid';

const SET_MESSAGE = "myApp/dialog2-reducer/SET_MESSAGE";
const SET_CHANNEL_STATUS = "myApp/dialog2-reducer/SET_CHANNEL_STATUS";
const SET_CHAT_INITIAL_STATE = "myApp/dialog2-reducer/SET_CHAT_INITIAL_STATE";
const SWITCH_SHOW_CHAT = "myApp/dialog2-reducer/SWITCH_SHOW_CHAT";

export const chatActions = {

    setMessageAC: (newMessages: Array<ChatMessagesType>) => { // экшн креатор обновления сообщений в стейте
        return {type: SET_MESSAGE, newMessages} as const
    },
    setChannelStatus: (channelStatus: ChannelStatusType) => { // экшн креатор обновления сообщений в стейте
        return {type: SET_CHANNEL_STATUS, channelStatus} as const
    },
    setChatInitialState: () => { // экшн креатор зануления стейта чата
        return {type: SET_CHAT_INITIAL_STATE} as const
    },
    switchRenderChat: () => { // экшн креатор задания отрисовки чата
        return {type: SWITCH_SHOW_CHAT} as const
    },
}

type ChatActionsTypes =
    InferActionsTypes<typeof chatActions>


const initialState = {
    messages: [] as Array<ChatMessagesTypeWithId>,
    channelStatus: "pending" as ChannelStatusType,
    renderChat: false as boolean
}

type InitialStateChatType = typeof initialState

const chatReducer = (state: InitialStateChatType = initialState, action: ChatActionsTypes): InitialStateChatType => {
    let stateCopy: InitialStateChatType // объявлениечасти части стейта до изменения редьюсером
    switch (action.type) {
        case SET_MESSAGE:

            const newMessagesWithId:Array<ChatMessagesTypeWithId> = action.newMessages.map(m=>{ // пробегаем массив новых сообщений
                return Object.assign(m, { id: uniqid()}) // добавляем уникальный id каждому сообщению
            })
            if (state.messages[state.messages.length-1]!==action.newMessages[action.newMessages.length-1]) { // дублирование сообщения?
                stateCopy = {
                    ...state,
                    messages: [...state.messages, ...newMessagesWithId] // добавляем новые сообщения к имеющимся
                        .filter((m, ind, arr)=> ind>= arr.length - 90), // только последние 90 сообщений
                }
                return stateCopy
            }
            return state
        case SET_CHANNEL_STATUS:
            stateCopy = {
                ...state,
                channelStatus: action.channelStatus, // обновление статуса канала WS
            }
            return stateCopy
        case SET_CHAT_INITIAL_STATE:
            return initialState
        case SWITCH_SHOW_CHAT:
            stateCopy = {
                ...state,
                renderChat: !state.renderChat, // делаем инверсию отрисовки чата
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

