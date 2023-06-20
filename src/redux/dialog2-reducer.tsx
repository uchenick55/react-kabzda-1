import {InferActionsTypes} from "./store-redux";
import {ComThunkTp} from "../components/common/types/commonTypes";
import {apiDialog2} from "../components/api/api";
import {ApiErrorMsgType, GetDialog2AllType, D2ItemType, SendMessageType} from "../components/api/apiTypes";
import {ResultCodeEnum} from "../components/api/enum";

const DIALOG2_ACTIONS = "myApp/dialog2-reducer/DIALOG2_ACTIONS";
const SET_MESSAGES_NEWER_THEN = "myApp/dialog2-reducer/SET_MESSAGES_NEWER_THEN";
const SET_DIALOG2_INITIALSTATE = "myApp/dialog2-reducer/SET_DIALOG2_INITIALSTATE";
const SET_D2_ITEM = "myApp/dialog2-reducer/SET_D2_ITEM";
const SET_API_ERROR_MSG = "myApp/dialog2-reducer/SET_API_ERROR_MSG";
const SET_MARKERS = "myApp/dialog2-reducer/SET_MARKERS";
const SET_D2_USERID = "myApp/dialog2-reducer/SET_D2_USERID";

export const dialog2Actions = {

    getDialog2AllAC: (Dialog2All: GetDialog2AllType) => {
        return {type: DIALOG2_ACTIONS, Dialog2All} as const
    },
    setMessagesNewerThen: (MessagesNewerThen: Array<SendMessageType>, needToScrollBottom:boolean) => {
        return {type: SET_MESSAGES_NEWER_THEN, MessagesNewerThen, needToScrollBottom} as const
    },
    setDialog2InitialState: () => {
        return {type: SET_DIALOG2_INITIALSTATE} as const
    },
    setD2Item: (D2Item: D2ItemType) => {
        return {type: SET_D2_ITEM, D2Item} as const
    },
    setApiErrorMsg: (ApiErrorMsg: Array<string>) => {
        return {type: SET_API_ERROR_MSG, ApiErrorMsg} as const
    },
    setMarkers: (Markers: MarkersType) => {
        return {type: SET_MARKERS, Markers} as const
    },
    setd2Userid: (userId: number) => {
        return {type: SET_D2_USERID, userId} as const
    }

}

type Dialog2ActionsTypes = InferActionsTypes<typeof dialog2Actions>
export type MarkersType = {
    straightFirstUploaded: boolean, // является ли эта загрузка прямой по ссылке, (или F5)
    dialogId: number, // маркер id диалога
    Dialog2FirstUploaded: boolean, // маркер первой загрузки
    needToScrollBottom: boolean // нужно ли прокрутить список сообщений
}
const initialState = {
    Dialog2All: [] as GetDialog2AllType,
    MessagesNewerThen: [] as Array<SendMessageType>,
    D2UserId: 0,
    D2Item: {} as D2ItemType,
    ApiErrorMsg: [] as ApiErrorMsgType,
    Markers: {
        straightFirstUploaded: false,
        dialogId: 0,
        Dialog2FirstUploaded: false,
        needToScrollBottom: false
    } as MarkersType
}

type InitialStateDialog2Type = typeof initialState

const Dialog2Reducer = (state: InitialStateDialog2Type = initialState, action: Dialog2ActionsTypes): InitialStateDialog2Type => {
    let stateCopy: InitialStateDialog2Type // объявлениечасти части стейта до изменения редьюсером
    switch (action.type) {
        case DIALOG2_ACTIONS: // список всех диалогов
            const Dialog2AllLocal:GetDialog2AllType = []
            const listUniqueDialog2Id: Array<number> = []
            action.Dialog2All.forEach(d2=>{
                if (!listUniqueDialog2Id.includes(d2.id)) {
                    listUniqueDialog2Id.push(d2.id)
                    Dialog2AllLocal.push(d2)
                }
            })
            stateCopy = {
                ...state,
                Dialog2All: Dialog2AllLocal
            }
            return stateCopy
        case SET_MESSAGES_NEWER_THEN: // сообщения по выбранному диалогу новее определенной даты
            stateCopy = {
                ...state,
                MessagesNewerThen: action.MessagesNewerThen,
                Markers: {...state.Markers,  needToScrollBottom: action.needToScrollBottom}
            }
            return stateCopy
        case SET_DIALOG2_INITIALSTATE: // занулить стейт при логауте
            return initialState
        case SET_D2_ITEM: // отфильтровать DialogItem из Dialog2All
            stateCopy = {
                ...state,
                D2Item: action.D2Item
            }
            return stateCopy
        case SET_API_ERROR_MSG: // записать ошибку с сервера в стейт
            stateCopy = {
                ...state,
                ApiErrorMsg: action.ApiErrorMsg
            }
            return stateCopy
        case SET_MARKERS: // записать вспомогательные маркеры
            stateCopy = {
                ...state,
                Markers: action.Markers
            }
            return stateCopy
        case SET_D2_USERID: // записать d2UserId из URL в стейт
            stateCopy = {
                ...state,
                D2UserId: action.userId
            }
            return stateCopy
        default:
            return state
    }
}

type ThType = ComThunkTp<Dialog2ActionsTypes> // тип, выведенный из общего типа санок сс учетом локального типа AC

export const putDialog2StartThCr = (currentDialogId: number): ThType => {
    return async (dispatch, getState) => {// начало диалога с пользователем по его ID
        const response = await apiDialog2.putDialog2Start( currentDialogId )
        if (response.resultCode === ResultCodeEnum.Success) {
            console.log( "Диалог с пользователем по его ID начат. Запускаем получение диалоглиста" )
            dispatch( getDialog2AllThCr( currentDialogId ) )
        }
        if (response.resultCode === ResultCodeEnum.Error) {
            dispatch( dialog2Actions.setApiErrorMsg( response.messages ) )
        }
    }
}

export const getDialog2AllThCr = (userId?: number, page: number = 1, count: number = 10): ThType => {
    return async (dispatch, getState) => {//- получить список сообщений по id пользователя
        if (!userId) {
            userId = getState().dialog2.D2Item.id
            console.log("!userId getDialog2AllThCr")
        }
        const response = await apiDialog2.getDialog2All( userId, page, count )
        if (response) { // если есть данные
            dispatch( dialog2Actions.getDialog2AllAC( response ) ) /* получить диалоглист*/
            console.log("getDialog2AllThCr => setD2Item")
            dispatch( dialog2Actions.setD2Item( response[0] ) ) /*отфильтровать d2Item */
        }
    }
}
export const postDialog2MessageThCr = ( body: string, date: string): ThType => {
    console.log( "postDialog2MessageThCr" )
    return async (dispatch, getState) => {// - отправить сообщение пользователю
        const response = await apiDialog2.postDialog2Message( getState().dialog2.D2UserId, body )
        if (response.resultCode === ResultCodeEnum.Success) {
            console.log( "Отправили сообщение, запускаем получение новых сообщений" )
            dispatch( getDialog2MessagesNewerThenThCr( getState().dialog2.D2UserId, date ) ) // получить все сообщения от указанного ID пользователя новее чем указанная дата
        }
        if (response.resultCode === ResultCodeEnum.Error) {
            dispatch( dialog2Actions.setApiErrorMsg( response.messages ) )
        }
    }
}
export const getDialog2MessageIdViewedThCr = (messageId: string): ThType => {
    return async (dispatch, getState) => {//- проверить, было ли прочитано сообщение по Id сообщения
        const response = await apiDialog2.getDialog2MessageIdViewed( messageId )
        console.log( "проверить, было ли прочитано сообщение по Id сообщения", response.data )
    }
}
const setDeleteSpamToMessagesNewerThen =
    (MessagesNewerThen: Array<SendMessageType>, messageId: string, SPAM_DELETE: "spam" | "delete"| "restore") => {
        const MessagesNewerThenLocal: Array<SendMessageType> = JSON.parse( JSON.stringify( MessagesNewerThen ) ) // полная копия сообщений
        MessagesNewerThenLocal.forEach( m2 => {
            if (m2.id === messageId) { // если совпадает id удаленного сообщения с перебираемым id сообщения
                if (SPAM_DELETE === "delete") {
                    m2.deletedBySender = true
                } // помечаем удаленное сообщение в локальном стейте как удаленное отправителем
                if (SPAM_DELETE === "spam") {
                    m2.isSpam = true
                } // помечаем сообщение в локальном стейте как спам
                if (SPAM_DELETE === "restore") {
                    m2.deletedBySender = false
                    m2.isSpam = false
                } // восстановить сообщение из удаленных и / или спама
            }
        } )
        console.log( "Локально помечаем сообщение как", SPAM_DELETE )
        return MessagesNewerThenLocal
    }

export const postDialog2MessageIdToSpamThCr = (messageId: string): ThType => {
    console.log( "postDialog2MessageIdToSpamThCr" )
    return async (dispatch, getState) => {// - пометить сообщение как спам
        const response = await apiDialog2.postDialog2MessageIdToSpam( messageId )
        if (response.resultCode === ResultCodeEnum.Success) {
            console.log( "Сообщение помечено как спам:", messageId )

            dispatch( dialog2Actions.setMessagesNewerThen(
                setDeleteSpamToMessagesNewerThen( getState().dialog2.MessagesNewerThen, messageId, "spam" ),
                false
            ) ) // помечаем сообщение в локальном стейте как спам

        }
        if (response.resultCode === ResultCodeEnum.Error) {
            dispatch( dialog2Actions.setApiErrorMsg( response.messages ) )
        }
    }
}
export const deleteDialog2MessageIdThCr =
    (messageId: string): ThType => {
        console.log( "deleteDialog2MessageIdThCr" )
        return async (dispatch, getState) => {//- удалить сообщение (только у себя) по ID сообщения
            const response = await apiDialog2.deleteDialog2MessageId( messageId )
            if (response.resultCode === ResultCodeEnum.Success) {
                console.log( "Сообщение удалено на сервере" )

                dispatch( dialog2Actions.setMessagesNewerThen(
                    setDeleteSpamToMessagesNewerThen( getState().dialog2.MessagesNewerThen, messageId, "delete" ),
                    false
                ) ) // помечаем сообщение в локальном стейте как удаленное
            }
            if (response.resultCode === ResultCodeEnum.Error) {
                dispatch( dialog2Actions.setApiErrorMsg( response.messages ) )
            }
        }
    }
export const putDialog2MessageIdRestoreThCr = (messageId: string): ThType => {
    console.log( "putDialog2MessageIdRestoreThCr" )
    return async (dispatch, getState) => {//  - восстановить сообщение из спама и удаленных
        const response = await apiDialog2.putDialog2MessageIdRestore( messageId )
        if (response.resultCode === ResultCodeEnum.Success) {
            console.log( "Сообщение восстановлено из спама" )

            dispatch( dialog2Actions.setMessagesNewerThen(
                setDeleteSpamToMessagesNewerThen( getState().dialog2.MessagesNewerThen, messageId, "restore" ),
                false
            ) ) // помечаем сообщение в локальном стейте как удаленное


        }
        if (response.resultCode === ResultCodeEnum.Error) {
            dispatch( dialog2Actions.setApiErrorMsg( response.messages ) )
        }
    }
}
export const getDialog2MessagesNewerThenThCr = (userId: number, date: string): ThType => {
    // console.log( "getDialog2MessagesNewerThenThCr" )
    return async (dispatch, getState) => {// - вернуть сообщения новее определенной даты
        const response = await apiDialog2.getDialog2MessagesNewerThen( userId, date )
        dispatch( dialog2Actions.setMessagesNewerThen( response, true ) )
    }
}
export const getDailog2UnreadMessagesThCr = (): ThType => {
    console.log( "getDailog2UnreadMessagesThCr" )
    return async (dispatch, getState) => {// - вернуть количество непрочтенных сообщений
        const response = await apiDialog2.getDailog2UnreadMessages()
        console.log( response ) //
    }
}

export default Dialog2Reducer
