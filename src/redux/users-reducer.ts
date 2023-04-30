import {apiUsers} from "../components/api/api";
import {ThunkAction} from "redux-thunk";
import {GlobalStateType, InferActionsTypes} from "./store-redux";
import {Action, Dispatch} from "redux";
import {usersType} from "../components/api/apiTypes";
import {ResultCodeEnum} from "../components/api/enum";
import {ComThunkTp} from "../types/commonTypes";

const SET_TERM = "myApp/users-reducer/SET_TERM";
const SET_USERS = "myApp/users-reducer/SET_USERS";
const SET_CURRENT_PAGE = "myApp/users-reducer/SET_CURRENT_PAGE";
const TOGGLE_IS_FETCHING = "myApp/users-reducer/TOGGLE_IS_FETCHING";
const SET_TOTAL_USERS_COUNT = "myApp/users-reducer/SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FOLLOWING_PROGRESS = "myApp/users-reducer/TOGGLE_IS_FOLLOWING_PROGRESS";
const NEED_UPDATE_FRIENDS = "myApp/users-reducer/NEED_UPDATE_FRIENDS";
const SET_ONLY_FRIENDS = "myApp/users-reducer/SET_ONLY_FRIENDS";// экшн отображения только моих друзей, или общий список
const USERS_INITIAL_STATE = "myApp/users-reducer/USERS_INITIAL_STATE";

export const UsersActions = {
    setTerm: (term: string) => {
        return {type: SET_TERM, term} as const
    },
    setUsers: (users: Array<usersType>) => {
        return {type: SET_USERS, users} as const
    },
    setCurrentPage: (currentPage: number) => {
        return {type: SET_CURRENT_PAGE, currentPage} as const
    },
    toggleIsFetching: (isFetching: boolean) => {
        return {type: TOGGLE_IS_FETCHING, isFetching} as const
    },
    setUsersTotalCount: (totalUsersCount: number) => {
        return {type: SET_TOTAL_USERS_COUNT, totalUsersCount} as const
    },
    toggleIsFollowingProgerss: (isFetching: boolean, id: number) => {
        return {type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, id} as const
    },
    needUpdateFriendsAC: (needUpdateFriends: boolean) => {
        return {type: NEED_UPDATE_FRIENDS, needUpdateFriends} as const
    },
    usersInitialState: () => {
        return {type: USERS_INITIAL_STATE} as const
    },
    setOnlyFriends: (onlyFriends: boolean) => { // экшн креатор отображения только моих друзей, или общий список
        return {type: SET_ONLY_FRIENDS, onlyFriends} as const
    },
}

type UsersActionTypes = InferActionsTypes<typeof UsersActions>


const initialState = {
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

const usersReducer = (state: initialStateType = initialState, action: UsersActionTypes): initialStateType => {
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

export const getUsersThunkCreator //санкреатор получить пользователей с данными
    = (currentPage: number, pageSize: number, term: string, friend: boolean, userId: number): ComThunkTp<UsersActionTypes> => {

    return (dispatch, getState) => { // нонейм санка получить пользователей
        dispatch( UsersActions.toggleIsFetching( true ) ) //показать крутилку загрузки с сервера

        apiUsers.getUsers( currentPage, pageSize, term, friend ) //получить пользователей по текущей странице и размере страницы
            .then( (data) => {
                dispatch( UsersActions.toggleIsFetching( false ) )  //убрать крутилку загрузки с сервера
                dispatch( UsersActions.setUsers( data.items ) )//записать в стейт закгруженный стек пользователей
                dispatch( UsersActions.setUsersTotalCount( data.totalCount ) )//записать в стейт общее количество пользователей

                if (userId) { // если добавление/удаление пользователя в избранное
                    dispatch( UsersActions.needUpdateFriendsAC( true ) ) // обновить список избранного
                    dispatch( UsersActions.toggleIsFollowingProgerss( false, userId ) )//убрать ID кнопки пользователя из массива followingInProgress, кнопка раздизаблена
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
    dispatch: Dispatch<UsersActionTypes>,
    userId: number,
    currentPage: number,
    pageSize: number,
    apiMethod: any,// (userId:number)=>,
    term: string,
    friend: boolean
) => {
    dispatch( UsersActions.toggleIsFollowingProgerss( true, userId ) )//внести ID кнопки пользователя в массив followingInProgress от повторного нажатия
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
    (userId: number, currentPage: number, pageSize: number, term: string, friend: boolean): ComThunkTp<UsersActionTypes> => {//санкреатор follow с данными
        return (dispatch, getState) => {// санка follow
            _followUnfollowFlow( dispatch, userId, currentPage, pageSize, apiUsers.postFollow.bind( apiUsers ), term, friend );
        }
    }

export const unfollowThunkCreator =
    (userId: number, currentPage: number, pageSize: number, term: string, friend: boolean): ComThunkTp<UsersActionTypes> => {//санкреатор unfollow с данными
        return (dispatch, getState) => {// санка unfollow
            _followUnfollowFlow( dispatch, userId, currentPage, pageSize, apiUsers.deleteFollow.bind( apiUsers ), term, friend );
        }
    }
export default usersReducer;





