// @ts-ignore
import {apiUsers} from "../components/api/api";

const SET_TERM = "myApp/users-reducer/SET_TERM";
const SET_USERS = "myApp/users-reducer/SET_USERS";
const SET_CURRENT_PAGE = "myApp/users-reducer/SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "myApp/users-reducer/SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "myApp/users-reducer/TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "myApp/users-reducer/TOGGLE_IS_FOLLOWING_PROGRESS";
const NEED_UPDATE_FRIENDS = "myApp/users-reducer/NEED_UPDATE_FRIENDS";
const USERS_INITIAL_STATE = "myApp/users-reducer/USERS_INITIAL_STATE";
const SET_ONLY_FRIENDS = "myApp/users-reducer/SET_ONLY_FRIENDS";// экшн отображения только моих друзей, или общий список

type setTermActionType = { type: typeof SET_TERM, term: string}
export let setTerm = (term: string):setTermActionType => {
    return {type: SET_TERM, term}
};

type setUsersActionType = { type: typeof SET_USERS, users: Array<object>}
let setUsers = (users: Array<object>): setUsersActionType => {
    return {type: SET_USERS, users}
};

type setCurrentPageActionType = {type: typeof SET_CURRENT_PAGE, currentPage: number}
export let setCurrentPage = (currentPage: number):setCurrentPageActionType  => {
    return {type: SET_CURRENT_PAGE, currentPage}
};

type toggleIsFetchingActionType = { type: typeof TOGGLE_IS_FETCHING, isFetching: boolean}
let toggleIsFetching = (isFetching: boolean):toggleIsFetchingActionType => {
    return {type: TOGGLE_IS_FETCHING, isFetching}
};

type setUsersTotalCountActionType = {type: typeof SET_TOTAL_USERS_COUNT, totalUsersCount: number}
let setUsersTotalCount = (totalUsersCount:number):setUsersTotalCountActionType => {
    return {type: SET_TOTAL_USERS_COUNT, totalUsersCount}
};

type toggleIsFollowingProgerssActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    id: number
}
let toggleIsFollowingProgerss = (isFetching:boolean, id:number):toggleIsFollowingProgerssActionType => {
    return {type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, id}
};

type needUpdateFriendsACActionType = { type: typeof NEED_UPDATE_FRIENDS, needUpdateFriends: boolean}
export let needUpdateFriendsAC = (needUpdateFriends:boolean):needUpdateFriendsACActionType => {
    return {type: NEED_UPDATE_FRIENDS, needUpdateFriends}
};

type usersInitialStateActonType = {type: typeof USERS_INITIAL_STATE}
export let usersInitialState = ():usersInitialStateActonType => {
    return {type: USERS_INITIAL_STATE}
};

type setOnlyFriendsActionType = {type: typeof SET_ONLY_FRIENDS, onlyFriends: boolean}
export let setOnlyFriends = (onlyFriends:boolean):setOnlyFriendsActionType => { // экшн креатор отображения только моих друзей, или общий список
    return {type: SET_ONLY_FRIENDS, onlyFriends}
};

type initialStateType = {
    users: Array<object>, // массив пользователей по умолчанию (пока пустой)
    pageSize: number, // размер пачки пользователей при загрузке с сервера
    totalUsersCount: number, // общее количество пользователей по умолчанию
    currentPage: number, // текущая страница загрузки пользователей по умолчанию
    isFetching: boolean, // статус загрузки (крутилка)
    followingInProgress: Array<number>, // массив тех пользователей, которые в процессе follow/unfollow для disable button
    term: string | "", // поисковый запрос среди пользователей
    needUpdateFriends: boolean, // флаг, что список друзей изменился, нужно обновить
    onlyFriends: boolean
}
let initialState:initialStateType = {
    users: [], // массив пользователей по умолчанию (пока пустой)
    pageSize: 12, // размер пачки пользователей при загрузке с сервера
    totalUsersCount: 0, // общее количество пользователей по умолчанию
    currentPage: 1, // текущая страница загрузки пользователей по умолчанию
    isFetching: false, // статус загрузки (крутилка)
    followingInProgress: [], // массив тех пользователей, которые в процессе follow/unfollow для disable button
    term: "", // поисковый запрос среди пользователей
    needUpdateFriends: false, // флаг, что список друзей изменился, нужно обновить
    onlyFriends: false
    , // получить список только моих друзей
}
let usersReducer = (state:initialStateType = initialState, action:any ):initialStateType => {
    // типы принимаемые и возвращаемые редьюсером
    let stateCopy: initialStateType; // объявление части стейта до изменения редьюсером
    switch (action.type) {
        case TOGGLE_IS_FOLLOWING_PROGRESS: // disable кнопки от многократного нажатия (follow/unfollow)
            stateCopy = {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.id] // кнопка follow/unfollow нажата, добавление в массив followingInProgress id кнопки
                    : state.followingInProgress.filter(id => id !== action.id)// пришел ответ от сервера OK, удаляем id кнопки из массива followingInProgress
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


export let getUsersThunkCreator = (currentPage: number, pageSize: number, term: string, friend:boolean, userId: number) => {
    //санкреатор получить пользователей с данными
    return (dispatch:any) => { // нонейм санка получить пользователей
        dispatch(toggleIsFetching(true)) //показать крутилку загрузки с сервера

        apiUsers.getUsers(currentPage, pageSize, term, friend) //получить пользователей по текущей странице и размере страницы
            .then((data: any) => {
                dispatch(toggleIsFetching(false))  //убрать крутилку загрузки с сервера
                dispatch(setUsers(data.items))//записать в стейт закгруженный стек пользователей
                dispatch(setUsersTotalCount(data.totalCount))//записать в стейт общее количество пользователей

                if (userId) { // если добавление/удаление пользователя в избранное
                    dispatch(needUpdateFriendsAC(true)) // обновить список избранного
                    dispatch(toggleIsFollowingProgerss(false, userId))//убрать ID кнопки пользователя из массива followingInProgress, кнопка раздизаблена
                }
            })
    }
}

const followUnfollowFlow
    : (dispatch, userId:number, currentPage:number, pageSize:number, apiMethod, term:string, friend:boolean)=> void
    = (dispatch, userId, currentPage, pageSize, apiMethod, term, friend) => {
    dispatch(toggleIsFollowingProgerss(true, userId))//внести ID кнопки пользователя в массив followingInProgress от повторного нажатия
    apiMethod(userId)// подписаться на пользователя // diff apiMethod = postFollow
        .then((response) => {
            if (response.resultCode === 0) {
                dispatch(getUsersThunkCreator(currentPage, pageSize, term, friend, userId))
                // получить список пользователей после добавления/удаления из избранного
            }
        })
}

export let followThunkCreator = (userId:number, currentPage:number, pageSize:number, term:string, friend:boolean) => {//санкреатор follow с данными

    return (dispatch) => {// санка follow
        followUnfollowFlow(dispatch, userId, currentPage, pageSize, apiUsers.postFollow.bind(apiUsers), term, friend);
    }
}

export let unfollowThunkCreator: typeof followThunkCreator = (userId, currentPage, pageSize, term, friend) => {//санкреатор unfollow с данными
    return (dispatch) => {// санка unfollow
        followUnfollowFlow(dispatch, userId, currentPage, pageSize, apiUsers.deleteFollow.bind(apiUsers), term, friend);
    }
}
export default usersReducer;





