import {apiUsers} from "../components/api/api";
import {Dispatch} from "redux";
import {getUsersType} from "../types/commonTypes";
import {GlobalStateType} from "./store-redux";

const SET_FRIENDS = "myApp/users-reducer/SET_FRIENDS"; // редакс дакс
const FRIENDS_INITIAL_STATE = "myApp/users-reducer/FRIENDS_INITIAL_STATE"; //константа зануления при логауте

type setFriendsActyionType = {type: typeof SET_FRIENDS, users: object}
export let setFriends = (users:object):setFriendsActyionType => {//экшн креатор задания списка друзей
  return {type: SET_FRIENDS, users}
};

type ActionTypes = setFriendsActyionType

export type friendsInitialStateActionType = {type: typeof FRIENDS_INITIAL_STATE}
export let friendsInitialState = ():friendsInitialStateActionType => {//экшн креатор зануления при логауте
  return {type: FRIENDS_INITIAL_STATE}
};


type initialStateType = {
  myFriends2: object[] | null,
  friendsCurrentPage: number,
  friendsPageSize: number,
  friendsTerm: string,
  friend: boolean
}
let initialState:initialStateType = {
  myFriends2: [], // массив списка друзей
  friendsCurrentPage: 1, // текущая страница выгрузки друзей
  friendsPageSize: 50, // количество друзей в одной выгрузке с сервера
  friendsTerm: "", // поиск по друзьям
  friend: true // поиск по друзьям (только те, что follow = true)
}

const sidebarReducer = (state:initialStateType = initialState, action:any):initialStateType => {
  let stateCopy:initialStateType; // объявлениечасти части стейта до изменения редьюсером
  switch (action.type) {
    case SET_FRIENDS:
      stateCopy = {...state, myFriends2: action.users};
      return stateCopy; // вернуть копию стейта
    case FRIENDS_INITIAL_STATE:
      stateCopy = initialState;
      return stateCopy; // вернуть копию стейта
    default:
      return state;
  }
}

export let getFriendsThunkCreator = (currentPage:number, pageSize:number, term:string, friend:boolean) => {//санкреатор получить друзей с данными
  return (dispatch:Dispatch<ActionTypes>, getState: () => GlobalStateType) => { // санка получить друзей
    apiUsers.getUsers(currentPage, pageSize, term, friend) //получить друзей по текущей странице и размере страницы
        .then((data: getUsersType) => {
          dispatch(setFriends(data.items))//записать в стейт загруженный стек друзей
        })
  }
}

export default sidebarReducer;
