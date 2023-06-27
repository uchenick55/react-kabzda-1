import {apiUsers} from "../components/api/api";
import {InferActionsTypes} from "./store-redux";
import {Dispatch} from "redux";
import {CommRespType, UsersType} from "../components/api/apiTypes";
import {ResultCodeEnum} from "../components/api/enum";
import {ComThunkTp} from "../components/common/types/commonTypes";
import {appActions} from "./app-reducer";

const SET_TERM = "myApp/users-reducer/SET_TERM";
const SET_USERS = "myApp/users-reducer/SET_USERS";
const SET_CURRENT_PAGE = "myApp/users-reducer/SET_CURRENT_PAGE";
const TOGGLE_IS_FETCHING = "myApp/users-reducer/TOGGLE_IS_FETCHING";
const SET_TOTAL_USERS_COUNT = "myApp/users-reducer/SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FOLLOWING_PROGRESS = "myApp/users-reducer/TOGGLE_IS_FOLLOWING_PROGRESS";
const SET_ONLY_FRIENDS = "myApp/users-reducer/SET_ONLY_FRIENDS";// экшн отображения только моих друзей, или общий список
const USERS_INITIAL_STATE = "myApp/users-reducer/USERS_INITIAL_STATE";

export const usersActions = {
    setTerm: (term: string) => {
        return {type: SET_TERM, term} as const
    },
    setUsers: (users: Array<UsersType>) => {
        return {type: SET_USERS, users} as const
    },
    setCurrentPage: (currentPage: number) => {
        return {type: SET_CURRENT_PAGE, currentPage} as const
    },
    setUsersTotalCount: (totalUsersCount: number) => {
        return {type: SET_TOTAL_USERS_COUNT, totalUsersCount} as const
    },
    toggleIsFollowingProgerss: (isFetching: boolean, id: number) => {
        return {type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, id} as const
    },
    usersInitialState: () => {
        return {type: USERS_INITIAL_STATE} as const
    },
    setOnlyFriends: (onlyFriends: boolean) => { // экшн креатор отображения только моих друзей, или общий список
        return {type: SET_ONLY_FRIENDS, onlyFriends} as const
    },
}

type UsersActionTypes = InferActionsTypes<typeof usersActions> | InferActionsTypes<typeof appActions>

const initialState = {
    users: [] as Array<UsersType>, // массив пользователей по умолчанию (пока пустой)
    pageSize: 100, // размер пачки пользователей при загрузке с сервера
    totalUsersCount: 0, // общее количество пользователей по умолчанию
    currentPage: 1, // текущая страница загрузки пользователей по умолчанию
    isFetching: false, // статус загрузки (крутилка)
    followingInProgress: [] as Array<number>, // массив тех пользователей, которые в процессе follow/unfollow для disable button
    term: "", // поисковый запрос среди пользователей
    onlyFriends: false
    , // получить список только моих друзей
}
type InitialStateType = typeof initialState

const usersReducer = (state: InitialStateType = initialState, action: UsersActionTypes): InitialStateType => {
    // типы принимаемые и возвращаемые редьюсером
    let stateCopy: InitialStateType; // объявление части стейта до изменения редьюсером
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
    = (currentPage?: number, userId?: number): ComThunkTp<UsersActionTypes> => {

    return (dispatch, getState) => { // нонейм санка получить пользователей
        if (!currentPage) {
            currentPage = getState().usersPage.currentPage
        }




       // !getState().app.isFetching && dispatch( appActions.toggleIsFetching( true ) ) //показать крутилку загрузки с сервера

        const {pageSize, term, onlyFriends} = getState().usersPage

        apiUsers.getUsers( currentPage, pageSize, term, onlyFriends ) //получить пользователей по текущей странице и размере страницы
            .then( (data) => {
                dispatch( usersActions.setUsers( data.items ) )//записать в стейт закгруженный стек пользователей
                dispatch( usersActions.setUsersTotalCount( data.totalCount ) )//записать в стейт общее количество пользователей
             //   dispatch( appActions.toggleIsFetching( false ) )  //убрать крутилку загрузки с сервера

                if (userId) { // если добавление/удаление пользователя в избранное
                    dispatch( usersActions.toggleIsFollowingProgerss( false, userId ) )//убрать ID кнопки пользователя из массива followingInProgress, кнопка раздизаблена
                }
            } )
    }
}

const _followUnfollowFlow = ( // общий метод для санкреатеров followThunkCreator/unfollowThunkCreator
    dispatch: Dispatch<UsersActionTypes>,
    userId: number,
    currentPage: number,
    apiMethod: any,// (userId:number)=>,
) => {
    dispatch( usersActions.toggleIsFollowingProgerss( true, userId ) )//внести ID кнопки пользователя в массив followingInProgress от повторного нажатия
    apiMethod( userId )// подписаться на пользователя // diff apiMethod = postFollow
        .then( (response: CommRespType) => {
            if (response.resultCode === ResultCodeEnum.Success) {
                dispatch( getUsersThunkCreator( currentPage, userId ) )
                // получить список пользователей после добавления/удаления из избранного
            }
        } )
}

export const followThunkCreator =
    (userId: number, currentPage: number): ComThunkTp<UsersActionTypes> => {//санкреатор follow с данными
        return (dispatch, getState) => {// санка follow
            _followUnfollowFlow( dispatch, userId, currentPage, apiUsers.postFollow.bind( apiUsers ) );
        }
    }

export const unfollowThunkCreator =
    (userId: number, currentPage: number): ComThunkTp<UsersActionTypes> => {//санкреатор unfollow с данными
        return (dispatch, getState) => {// санка unfollow
            _followUnfollowFlow( dispatch, userId, currentPage, apiUsers.deleteFollow.bind( apiUsers ) );
        }
    }
export default usersReducer;





