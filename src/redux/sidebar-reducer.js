import {apiUsers} from "../components/api/api";
import {state_copy_for_debug} from "./store-redux";

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
      return stateCopy; // вернуть копию стейта

    default:
      return state;
  }
}

export let getFriendsThunkCreator = (currentPage, pageSize, term, friend) => {//санкреатор получить пользователей с данными
  let getUsersThunk = (dispatch) => { // санка получить пользователей
    if (state_copy_for_debug) {console.log("getFriendsThunkCreator")}

//    dispatch(toggleIsFetching(true)) //показать крутилку загрузки с сервера
    apiUsers.getUsers(currentPage, pageSize, term, friend) //получить пользователей по текущей странице и размере страницы
      .then((data) => {
//        throw new Error ("проверка ошибки then/catch ")
//        dispatch(toggleIsFetching(false))  //убрать крутилку загрузки с сервера
        dispatch(setFriends(data.items))//записать в стейт загруженный стек друзей
//        dispatch(setUsersTotalCount(data.totalCount))//записать в стейт общее количество пользователей
      })
      .catch((error)=>{
        console.log("=======================>", error) // отображение ошибки в случае, если then ее выдаст
      })
  }
  return getUsersThunk
}

export default sidebarReducer;
