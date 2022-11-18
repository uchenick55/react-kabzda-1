import {apiUsers} from "../components/api/api";

const SET_TERM = "myApp/users-reducer/SET_TERM";
const SET_USERS = "myApp/users-reducer/SET_USERS";
const SET_CURRENT_PAGE = "myApp/users-reducer/SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "myApp/users-reducer/SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "myApp/users-reducer/TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "myApp/users-reducer/TOGGLE_IS_FOLLOWING_PROGRESS";

export let setTerm = (term) => {
    return {type: SET_TERM, term}
};
let setUsers = (users) => {
    return {type: SET_USERS, users}
};
export let setCurrentPage = (currentPage) => {
    return {type: SET_CURRENT_PAGE, currentPage}
};
let setUsersTotalCount = (totalUsersCount) => {
    return {type: SET_TOTAL_USERS_COUNT, totalUsersCount}
};
let toggleIsFetching = (isFetching) => {
    return {type: TOGGLE_IS_FETCHING, isFetching}
};
let toggleIsFollowingProgerss = (isFetching, id) => {
    return {type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, id}
};

let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
    term: ""
}
let usersReducer = (state = initialState, action) => {
    let stateCopy; // объявлениечасти части стейта до изменения редьюсером
    switch (action.type) {
        case TOGGLE_IS_FOLLOWING_PROGRESS: // disable кнопки от многократного нажатия (follow/unfollow)
            stateCopy = {
                ...state,
                followingInProgress: action.isFetching
                    ? [state.followingInProgress, action.id] // кнопка follow/unfollow нажата, добавление в массив followingInProgress id кнопки
                    : state.followingInProgress.filter(id => id !== action.id)// пришел ответ от сервера OK, удаляем id кнопки из массива followingInProgress
            }
            return stateCopy;
        case SET_USERS:
            stateCopy = {...state, users: action.users};
            return stateCopy;
        case SET_CURRENT_PAGE:
            stateCopy = {
                ...state,
                currentPage: action.currentPage
            }
            return stateCopy;
        case SET_TERM:
            stateCopy = {
                ...state,
                term: action.term
            }
            return stateCopy;
        case SET_TOTAL_USERS_COUNT:
            stateCopy = {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
            return stateCopy;
        case TOGGLE_IS_FETCHING:
            stateCopy = {
                ...state,
                isFetching: action.isFetching
            }
            return stateCopy;
        default:
            return state;
    }
}

export let getUsersThunkCreator = (currentPage, pageSize, term) => {//санкреатор получить пользователей с данными
    let getUsersThunk = (dispatch) => { // санка получить пользователей
        dispatch(toggleIsFetching(true)) //показать крутилку загрузки с сервера
        apiUsers.getUsers(currentPage, pageSize, term) //получить пользователей по текущей странице и размере страницы
            .then((data) => {
                dispatch(toggleIsFetching(false))  //убрать крутилку загрузки с сервера
                dispatch(setUsers(data.items))//записать в стейт закгруженный стек пользователей
                dispatch(setUsersTotalCount(data.totalCount))//записать в сейт общее количество пользователей
            })

    }
    return getUsersThunk
}

const followUnfollowFlow = (dispatch, userId, currentPage, pageSize, apiMethod, term) => {
    dispatch(toggleIsFollowingProgerss(true, userId))//внести ID кнопки пользователя в массив followingInProgress от повторного нажатия
    apiMethod(userId)// подписаться на пользователя // diff apiMethod = postFollow
        .then((response) => {
            if (response.resultCode === 0) {
                apiUsers.getUsers(currentPage, pageSize, term) //получить пользователей по текущей странице и размере страницы
                    .then((response) => {
                        dispatch(setUsers(response.items))//записать в стейт закгруженный стек пользователей
                        dispatch(toggleIsFollowingProgerss(false, userId))//убрать ID кнопки пользователя из массива followingInProgress, кнопка раздизаблена
                    })
            }
        })
}

export let followThunkCreator = (userId, currentPage, pageSize, term) => {//санкреатор follow с данными
    return (dispatch) => {// санка follow
        followUnfollowFlow(dispatch, userId, currentPage, pageSize, apiUsers.postFollow.bind(apiUsers), term);
    }
}
export let unfollowThunkCreator = (userId, currentPage, pageSize, term) => {//санкреатор unfollow с данными
    return (dispatch) => {// санка unfollow
        followUnfollowFlow(dispatch, userId, currentPage, pageSize, apiUsers.deleteFollow.bind(apiUsers), term);
    }
}
export default usersReducer;











