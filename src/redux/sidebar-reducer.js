import {apiUsers} from "../components/api/api";
import {bedug_mode} from "./store-redux";

const SET_FRIENDS = "myApp/users-reducer/SET_FRIENDS"; // редакс дакс

export let setFriends = (users) => {
  return {type: SET_FRIENDS, users}
};

let initialState = {
  myFriends2: [], // массив списка друзей
  friendsCurrentPage: 1, // текущая страница выгрузки друзей
  friendsPageSize: 30, // количество друзей в одной выгрузке с сервера
  friendsTerm: "", // поиск по друзьям
  friend: true // поиск по друзьям (только те, что follow = true)

}
const sidebarReducer = (state = initialState, action) => {
  let stateCopy; // объявлениечасти части стейта до изменения редьюсером
  switch (action.type) {
    case SET_FRIENDS:
      stateCopy = {...state, myFriends2: action.users};
      if (bedug_mode) {console.log("sidebar-reducer.js, SET_FRIENDS: ", state, stateCopy)} // дебаг
      return stateCopy; // вернуть копию стейта
    default:
      return state;
  }
}

export let getFriendsThunkCreator = (currentPage, pageSize, term, friend) => {//санкреатор получить друзей с данными
  let getUsersThunk = (dispatch) => { // санка получить друзей
    if (bedug_mode) {console.log("getFriendsThunkCreator")}

    apiUsers.getUsers(currentPage, pageSize, term, friend) //получить друзей по текущей странице и размере страницы
      .then((data) => {
        if (bedug_mode) {console.log("sidebar-reducer.js, getFriendsThunkCreator getUsers().then: dispatch(setFriends( -> SET_FRIENDS" )} // дебаг
        dispatch(setFriends(data.items))//записать в стейт загруженный стек друзей
      })
      .catch((error)=>{
        console.log("=======================>", error) // отображение ошибки в случае, если then ее выдаст
      })
  }
  return getUsersThunk
}

export default sidebarReducer;
