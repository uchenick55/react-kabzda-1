import {chatAPI, ChatMessageType} from "../components/api/chat-api";
import {InferActionsTypes} from "./store-redux";
import {ComThunkTp} from "../components/common/types/commonTypes";
import {Dispatch} from "redux";
//


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
                messages: [...state.messages, ...action.messages],
            }
            return stateCopy
        default:
            return state
    }
}

type ThType = ComThunkTp<ChatActionsTypes> // тип, выведенный из общего типа санок сс учетом локального типа AC
// const newMessageHandlerCreator = (dispatch:Dispatch) => ((messages: Array<ChatMessageType>) => {
//     dispatch( chatActions.setMessagesAC( messages ) )
// })

let _newMessageHandler: ((messages: Array<ChatMessageType>) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages: Array<ChatMessageType>) => {
            dispatch( chatActions.setMessagesAC( messages ) )
        }
    }
    return _newMessageHandler
}

export const startMessagesListening = (): ThType => {
    return async (dispatch, getState) => {// начать слушать получение сообщений
        chatAPI.startChannel()
        chatAPI.subscribe( newMessageHandlerCreator( dispatch ) )
    }
}
export const stopMessagesListening = (): ThType => {
    return async (dispatch, getState) => {// закончить слушать получение сообщений
        chatAPI.unsubscribe( newMessageHandlerCreator( dispatch ) )
        chatAPI.closeChannel()
    }
}
export const sendMessageThCr = (message: string): ThType => {
    return async (dispatch, getState) => {// начать слушать получение сообщений
        chatAPI.sendMessage(message)
    }
}

export default ChatReducer










