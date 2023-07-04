import {InferActionsTypes} from "./store-redux";
import {ComThunkTp} from "../components/common/types/commonTypes";
import chatApi, {ChatMessagesType, SubscriberType} from "../components/api/chat-api";
import {Dispatch} from "redux";

const SET_MESSAGE = "myApp/dialog2-reducer/SET_MESSAGE";

export const chatActions = {

    setMessageAC: (newMessages: Array<ChatMessagesType>) => {
        return {type: SET_MESSAGE, newMessages} as const
    },
}

type ChatActionsTypes =
    InferActionsTypes<typeof chatActions>


const initialState = {
    messages: [] as Array<ChatMessagesType>,
}

type InitialStateChatType = typeof initialState

const chatReducer = (state: InitialStateChatType = initialState, action: ChatActionsTypes): InitialStateChatType => {
    let stateCopy: InitialStateChatType // объявлениечасти части стейта до изменения редьюсером
    switch (action.type) {
        case SET_MESSAGE: //
            stateCopy = {
                ...state,
                messages: [...state.messages, ...action.newMessages],
            }
            return stateCopy
        default:
            return state
    }
}

type ThType = ComThunkTp<ChatActionsTypes> // тип, выведенный из общего типа санок сс учетом локального типа AC

let _newMessagesHandler: SubscriberType | null = null

const newMessagesHandleCreator = (dispatch: Dispatch) => {
    if (_newMessagesHandler === null) {
        _newMessagesHandler = (newMessages: Array<ChatMessagesType>)=> {
            dispatch(chatActions.setMessageAC(newMessages))
        }
    }
    return  _newMessagesHandler
}

export const startMessagesListening = (): ThType => {
    return async (dispatch, getState) => {//
        chatApi.startChannel()
        chatApi.subscribe(newMessagesHandleCreator(dispatch))
    }
}
export const stopMessagesListening = (): ThType => {
    return async (dispatch, getState) => {//
        chatApi.unsubscribe(newMessagesHandleCreator(dispatch))
        chatApi.closeChannel()
    }
}
export const sendMessageThCr = (newMessage: string): ThType => {
    return async (dispatch, getState) => {//
        chatApi.sendMessage(newMessage)
    }
}

export default chatReducer
