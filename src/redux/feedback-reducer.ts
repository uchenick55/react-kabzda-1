import {postFeedBack22} from "../components/api/api";
import {ApiFeedBackDataType} from "../components/common/types/commonTypes";
import {Dispatch} from "redux";
import {GlobalStateType, InferActionsTypes} from "./store-redux";
import {appActions} from "./app-reducer";

const SET_FEED_BACK_STATUS = "myApp/feedback-reducer/SET_FEED_BACK_STATUS"; // константа для задания статуса feedback

export const feedBackActions = {
    setFeedBackStatus: (feedBackStatus: string) => { // экшн креатор задания feedBackStatus
        return {type: SET_FEED_BACK_STATUS, feedBackStatus} as const
    }
}

type InitialStateType = { feedBackStatus: string }
const initialState: InitialStateType = { //стейт по умолчанию темы
    feedBackStatus: "" // статус отправки сообщения (feedBack) - если не нулевой отображается вместо формы сообщения
}

type FeedBackActionTypes =
    InferActionsTypes<typeof feedBackActions> |
    InferActionsTypes<typeof appActions>

const feedBackReducer = (state: InitialStateType = initialState, action: FeedBackActionTypes): InitialStateType => {//редьюсер отправки сообщения
    let stateCopy: InitialStateType; // объявлениечасти части стейта до изменения редьюсером
    switch (action.type) {
        case SET_FEED_BACK_STATUS: // экшн задания feedBackStatus
            stateCopy = {
                ...state,
                feedBackStatus: action.feedBackStatus
            }
            return stateCopy; // возврат копии стейта после изменения
        default:
            return state; // по умолчанию стейт возврашается неизмененным
    }
}

export const postFeedBackThunkCreator2 = (data: ApiFeedBackDataType) => {// санкреатор отправки фидбека
    return async (dispatch: Dispatch<FeedBackActionTypes>, getState: () => GlobalStateType) => { // санка отправки фидбека

        dispatch(appActions.toggleIsFetchingArray("postFeedBackThunkCreator2", "add")) // добавить процесс в прелоадер

        await postFeedBack22( data ) //
            .then(() => {
                dispatch( feedBackActions.setFeedBackStatus( "Скоро мы получим ваше письмо" ) ) })// статсус задать в BLL "Скоро мы получим ваше письмо"
            .catch((err: object) => {
                dispatch( feedBackActions.setFeedBackStatus( (err.toString()) ) )// в статус записать ошибку с сервера и задать в BLL
            })
            .finally(() => {
                dispatch(appActions.toggleIsFetchingArray("postFeedBackThunkCreator2", "delete")) // убрать процесс из прелоадера
            });
    };
}

export default feedBackReducer;
