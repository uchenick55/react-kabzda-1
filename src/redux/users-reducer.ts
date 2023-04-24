import {apiUsers} from "../components/api/api";
import {ThunkAction} from "redux-thunk";
import {GlobalStateType} from "./store-redux";
import {Dispatch} from "redux";
import {usersType} from "../components/api/apiTypes";
import {ResultCodeEnum} from "../components/api/enum";

const SET_TERM = "myApp/users-reducer/SET_TERM";

type setTermActionType = { type: typeof SET_TERM, term: string }
export const setTerm = (term: string): setTermActionType => {
    return {type: SET_TERM, term}
};

const SET_USERS = "myApp/users-reducer/SET_USERS";

type setUsersActionType = { type: typeof SET_USERS, users: Array<usersType> }

let setUsers = (users: Array<usersType>): setUsersActionType => {
    return {type: SET_USERS, users}
};


const SET_CURRENT_PAGE = "myApp/users-reducer/SET_CURRENT_PAGE";

type setCurrentPageActionType = { type: typeof SET_CURRENT_PAGE, currentPage: number }
export const setCurrentPage = (currentPage: number): setCurrentPageActionType => {
    return {type: SET_CURRENT_PAGE, currentPage}
};

const TOGGLE_IS_FETCHING = "myApp/users-reducer/TOGGLE_IS_FETCHING";

type toggleIsFetchingActionType = { type: typeof TOGGLE_IS_FETCHING, isFetching: boolean }
let toggleIsFetching = (isFetching: boolean): toggleIsFetchingActionType => {
    return {type: TOGGLE_IS_FETCHING, isFetching}
};

const SET_TOTAL_USERS_COUNT = "myApp/users-reducer/SET_TOTAL_USERS_COUNT";

type setUsersTotalCountActionType = { type: typeof SET_TOTAL_USERS_COUNT, totalUsersCount: number }
let setUsersTotalCount = (totalUsersCount: number): setUsersTotalCountActionType => {
    return {type: SET_TOTAL_USERS_COUNT, totalUsersCount}
};

const TOGGLE_IS_FOLLOWING_PROGRESS = "myApp/users-reducer/TOGGLE_IS_FOLLOWING_PROGRESS";

type toggleIsFollowingProgerssActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    id: number
}
let toggleIsFollowingProgerss = (isFetching: boolean, id: number): toggleIsFollowingProgerssActionType => {
    return {type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, id}
};

const NEED_UPDATE_FRIENDS = "myApp/users-reducer/NEED_UPDATE_FRIENDS";

type needUpdateFriendsACActionType = { type: typeof NEED_UPDATE_FRIENDS, needUpdateFriends: boolean }
export const needUpdateFriendsAC = (needUpdateFriends: boolean): needUpdateFriendsACActionType => {
    return {type: NEED_UPDATE_FRIENDS, needUpdateFriends}
};

const USERS_INITIAL_STATE = "myApp/users-reducer/USERS_INITIAL_STATE";

export type usersInitialStateActonType = { type: typeof USERS_INITIAL_STATE }
export const usersInitialState = (): usersInitialStateActonType => {
    return {type: USERS_INITIAL_STATE}
};

const SET_ONLY_FRIENDS = "myApp/users-reducer/SET_ONLY_FRIENDS";// экшн отображения только моих друзей, или общий список

type setOnlyFriendsActionType = { type: typeof SET_ONLY_FRIENDS, onlyFriends: boolean }
export const setOnlyFriends = (onlyFriends: boolean): setOnlyFriendsActionType => { // экшн креатор отображения только моих друзей, или общий список
    return {type: SET_ONLY_FRIENDS, onlyFriends}
};


type ActionTypes = setOnlyFriendsActionType | usersInitialStateActonType | needUpdateFriendsACActionType |
    toggleIsFollowingProgerssActionType | setUsersTotalCountActionType | toggleIsFetchingActionType |
    setCurrentPageActionType | setUsersActionType | setTermActionType

let initialState = {
    users: [] as Array<usersType>, // массив пользователей по умолчанию (пока пустой)
    pageSize: 100, // размер пачки пользователей при загрузке с сервера
    totalUsersCount: 0, // общее количество пользователей по умолчанию
    currentPage: 1, // текущая страница загрузки пользователей по умолчанию
    isFetching: false, // статус загрузки (крутилка)
    followingInProgress: [] as Array<number>, // массив тех пользователей, которые в процессе follow/unfollow для disable button
    term: "", // поисковый запрос среди пользователей
    needUpdateFriends: false, // флаг, что список друзей изменился, нужно обновить
    onlyFriends: false
    , // получить список только моих друзей
}
type initialStateType = typeof initialState

let usersReducer = (state: initialStateType = initialState, action: any): initialStateType => {
    // типы принимаемые и возвращаемые редьюсером
    let stateCopy: initialStateType; // объявление части стейта до изменения редьюсером
    switch (action.type) {
        case TOGGLE_IS_FOLLOWING_PROGRESS: // disable кнопки от многократного нажатия (follow/unfollow)
            stateCopy = {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.id] // кнопка follow/unfollow нажата, добавление в массив followingInProgress id кнопки
                    : state.followingInProgress.filter( id => id !== action.id )// пришел ответ от сервера OK, удаляем id кнопки из массива followingInProgress
            }
            return stateCopy; // вернуть копию стейта
        case SET_USERS:
            stateCopy = {...state, users: action.users};
            return stateCopy; // вернуть копию стейта
        case SET_CURRENT_PAGE:
            stateCopy = {
                ...state,
                currentPage: action.currentPage,
            }
            return stateCopy; // вернуть копию стейта
        case SET_TERM:
            stateCopy = {
                ...state, // копия основного стейта
                term: action.term // задать значение поиска
            }
            return stateCopy; // вернуть копию стейта
        case SET_TOTAL_USERS_COUNT:
            stateCopy = {
                ...state,
                totalUsersCount: action.totalUsersCount,
            }
            return stateCopy; // вернуть копию стейта
        case TOGGLE_IS_FETCHING:
            stateCopy = {
                ...state,
                isFetching: action.isFetching
            }
            return stateCopy; // вернуть копию стейта
        case NEED_UPDATE_FRIENDS:
            stateCopy = {
                ...state,
                needUpdateFriends: action.needUpdateFriends
            }
            return stateCopy; // вернуть копию стейта
        case USERS_INITIAL_STATE:
            stateCopy = initialState // занулить стейт до инициализационного
            return stateCopy; // вернуть копию стейта
        case SET_ONLY_FRIENDS: // отобразить только пользоавателей из избранного
            stateCopy = {
                ...state,
                onlyFriends: action.onlyFriends
            }
            return stateCopy; // вернуть копию стейта
        default:
            return state;
    }
}
type ThunkType = ThunkAction<void,    // санка ничего не возвращает
    GlobalStateType,    // глобальный стейт из redux
    unknown,    // нет доп параметров
    ActionTypes // все типы ActionCreator
    >
export const getUsersThunkCreator //санкреатор получить пользователей с данными
    = (currentPage: number, pageSize: number, term: string, friend: boolean, userId: number): ThunkType => {

    return (dispatch, getState) => { // нонейм санка получить пользователей
        dispatch( toggleIsFetching( true ) ) //показать крутилку загрузки с сервера

        apiUsers.getUsers( currentPage, pageSize, term, friend ) //получить пользователей по текущей странице и размере страницы
            .then( (data) => {
                dispatch( toggleIsFetching( false ) )  //убрать крутилку загрузки с сервера
                dispatch( setUsers( data.items ) )//записать в стейт закгруженный стек пользователей
                dispatch( setUsersTotalCount( data.totalCount ) )//записать в стейт общее количество пользователей

                if (userId) { // если добавление/удаление пользователя в избранное
                    dispatch( needUpdateFriendsAC( true ) ) // обновить список избранного
                    dispatch( toggleIsFollowingProgerss( false, userId ) )//убрать ID кнопки пользователя из массива followingInProgress, кнопка раздизаблена
                }
            } )
    }
}

type responseType = {
    data: object,
    fieldsErrors: Array<string>,
    messages: Array<string>,
    resultCode: number
}

const _followUnfollowFlow = ( // общий метод для санкреатеров followThunkCreator/unfollowThunkCreator
    dispatch: Dispatch<ActionTypes>,
    userId: number,
    currentPage: number,
    pageSize: number,
    apiMethod: any,// (userId:number)=>,
    term: string,
    friend: boolean
) => {
    dispatch( toggleIsFollowingProgerss( true, userId ) )//внести ID кнопки пользователя в массив followingInProgress от повторного нажатия
    apiMethod( userId )// подписаться на пользователя // diff apiMethod = postFollow
        .then( (response: responseType) => {
            if (response.resultCode === ResultCodeEnum.Success) {
                // @ts-ignore
                dispatch( getUsersThunkCreator( currentPage, pageSize, term, friend, userId ) )
                // получить список пользователей после добавления/удаления из избранного
            }
        } )
}

export const followThunkCreator =
    (userId: number, currentPage: number, pageSize: number, term: string, friend: boolean): ThunkType => {//санкреатор follow с данными
        return (dispatch, getState) => {// санка follow
            _followUnfollowFlow( dispatch, userId, currentPage, pageSize, apiUsers.postFollow.bind( apiUsers ), term, friend );
        }
    }

export const unfollowThunkCreator =
    (userId: number, currentPage: number, pageSize: number, term: string, friend: boolean): ThunkType => {//санкреатор unfollow с данными
        return (dispatch, getState) => {// санка unfollow
            _followUnfollowFlow( dispatch, userId, currentPage, pageSize, apiUsers.deleteFollow.bind( apiUsers ), term, friend );
        }
    }
export default usersReducer;





