import {apiUsers} from "../components/api/api";
import {state_copy_for_debug} from "./store-redux";

const SET_FRIENDS = "myApp/users-reducer/SET_FRIENDS"; // редакс дакс

let setFriends = (users) => {
  return {type: SET_FRIENDS, users}
};

let initialState = {
  myFriends: [ // заглушка списка моих друзей в навбаре
    {
      id: 1,
      name: "Artem",
      avaSrc: "https://i.pinimg.com/originals/03/b6/fe/03b6fe528accfd011629f5271e90e9ac.jpg"
    },
    {
      id: 3,
      name: "Danil",
      avaSrc: "https://pixelbox.ru/wp-content/uploads/2020/11/ava-maincraft-youtube-76.jpg"
    },
    {
      id: 4,
      name: "Natasha",
      avaSrc: "https://ulibky.ru/wp-content/uploads/2019/10/avatarki_dlya_vatsap_dlya_devushek_42_28061027.jpg"
    },
  ],
  myFriends2: [], // массив списка друзей
  friendsCurrentPage: 1, // текущая страница выгрузки друзей
  friendsPageSize: 20, // количество друзей в одной выгрузке с сервера
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
//    dispatch(toggleIsFetching(true)) //показать крутилку загрузки с сервера
    apiUsers.getUsers(currentPage, pageSize, term, friend) //получить пользователей по текущей странице и размере страницы
      .then((data) => {
//        dispatch(toggleIsFetching(false))  //убрать крутилку загрузки с сервера
        dispatch(setFriends(data.items))//записать в стейт закгруженный стек друзей
//        dispatch(setUsersTotalCount(data.totalCount))//записать в сейт общее количество пользователей
      })

  }
  return getUsersThunk
}

export default sidebarReducer;
