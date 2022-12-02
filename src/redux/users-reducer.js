import {apiUsers} from "../components/api/api";
import {bedug_mode, debugItem} from "./store-redux";

const SET_TERM = "myApp/users-reducer/SET_TERM";
const SET_USERS = "myApp/users-reducer/SET_USERS";
const SET_CURRENT_PAGE = "myApp/users-reducer/SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "myApp/users-reducer/SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "myApp/users-reducer/TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "myApp/users-reducer/TOGGLE_IS_FOLLOWING_PROGRESS";
const NEED_UPDATE_FRIENDS = "myApp/users-reducer/NEED_UPDATE_FRIENDS";


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
export let needUpdateFriendsAC = (needUpdateFriends) => {
    return {type: NEED_UPDATE_FRIENDS, needUpdateFriends}
};



let initialState = {
    users: [], // массив пользователей по умолчанию (пока пустой)
    pageSize: 50, // размер пачки пользователей при загрузке с сервера
    totalUsersCount: 0, // общее количество пользователей по умолчанию
    currentPage: 1, // текущая страница загрузки пользователей по умолчанию
    isFetching: false, // статус загрузки (крутилка)
    followingInProgress: [], // массив тех пользователей, которые в процессе follow/unfollow для disable button
    term: "", // поисковый запрос среди пользователей
    needUpdateFriends: false // флаг, что список друзей изменился, нужно обновить
}
let usersReducer = (state = initialState, action) => {
  let stateCopy; // объявлениечасти части стейта до изменения редьюсером
    switch (action.type) {
        case TOGGLE_IS_FOLLOWING_PROGRESS: // disable кнопки от многократного нажатия (follow/unfollow)
            stateCopy = {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.id] // кнопка follow/unfollow нажата, добавление в массив followingInProgress id кнопки
                    : state.followingInProgress.filter(id => id !== action.id)// пришел ответ от сервера OK, удаляем id кнопки из массива followingInProgress
            }
            if (bedug_mode) {console.log("users-reducer.js, TOGGLE_IS_FOLLOWING_PROGRESS: ", state, stateCopy)} // дебаг
            return stateCopy; // вернуть копию стейта
        case SET_USERS:
            stateCopy = {...state, users: action.users};
          if (bedug_mode) {console.log("users-reducer.js, SET_USERS: ", state, stateCopy)} // дебаг
          return stateCopy; // вернуть копию стейта
        case SET_CURRENT_PAGE:
            stateCopy = {
                ...state,
                currentPage: action.currentPage
            }
          if (bedug_mode) {console.log("users-reducer.js, SET_CURRENT_PAGE: ", state, stateCopy)} // дебаг
          return stateCopy; // вернуть копию стейта
        case SET_TERM:
            stateCopy = {
                ...state, // копия основного стейта
                term: action.term // задать значение поиска
            }
          if (bedug_mode) {console.log("users-reducer.js, SET_TERM: ", state, stateCopy)} // дебаг
          return stateCopy; // вернуть копию стейта
        case SET_TOTAL_USERS_COUNT:
            stateCopy = {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
          if (bedug_mode) {console.log("users-reducer.js, SET_TOTAL_USERS_COUNT: ", state, stateCopy)} // дебаг
          return stateCopy; // вернуть копию стейта
        case TOGGLE_IS_FETCHING:
            stateCopy = {
                ...state,
                isFetching: action.isFetching
            }
          if (bedug_mode) {console.log("users-reducer.js, TOGGLE_IS_FETCHING: ", state, stateCopy)} // дебаг
          return stateCopy; // вернуть копию стейта
        case NEED_UPDATE_FRIENDS:
          if (bedug_mode) {console.log("NEED_UPDATE_FRIENDS", debugItem)}

          stateCopy = {
                ...state,
              needUpdateFriends: action.needUpdateFriends
            }
          if (bedug_mode) {console.log("users-reducer.js, NEED_UPDATE_FRIENDS: ", state, stateCopy)} // дебаг
          return stateCopy; // вернуть копию стейта
        default:
            return state;
    }
}

export let getUsersThunkCreator = (currentPage, pageSize, term) => {//санкреатор получить пользователей с данными
  if (bedug_mode) {console.log("getUsersThunkCreator", debugItem)}

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
  if (bedug_mode) {console.log("followUnfollowFlow", debugItem)}

  dispatch(toggleIsFollowingProgerss(true, userId))//внести ID кнопки пользователя в массив followingInProgress от повторного нажатия
    apiMethod(userId)// подписаться на пользователя // diff apiMethod = postFollow
        .then((response) => {
            if (response.resultCode === 0) {
                apiUsers.getUsers(currentPage, pageSize, term) //получить пользователей по текущей странице и размере страницы
                    .then((response) => {
                        dispatch(setUsers(response.items))//записать в стейт закгруженный стек пользователей
                        dispatch(needUpdateFriendsAC(true))
                        dispatch(toggleIsFollowingProgerss(false, userId))//убрать ID кнопки пользователя из массива followingInProgress, кнопка раздизаблена
                    })
            }
        })
}

export let followThunkCreator = (userId, currentPage, pageSize, term) => {//санкреатор follow с данными
  if (bedug_mode) {console.log("followThunkCreator", debugItem)}

  return (dispatch) => {// санка follow
        followUnfollowFlow(dispatch, userId, currentPage, pageSize, apiUsers.postFollow.bind(apiUsers), term);
    }
}
export let unfollowThunkCreator = (userId, currentPage, pageSize, term) => {//санкреатор unfollow с данными
  if (bedug_mode) {console.log("unfollowThunkCreator", debugItem)}

  return (dispatch) => {// санка unfollow
        followUnfollowFlow(dispatch, userId, currentPage, pageSize, apiUsers.deleteFollow.bind(apiUsers), term);
    }
}
export default usersReducer;











