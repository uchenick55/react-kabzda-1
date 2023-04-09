import {apiUsers} from "../components/api/api";
import {Dispatch} from "redux";
import {GlobalStateType} from "./store-redux";
import {usersType} from "../components/api/apiTypes";
import {NulableType} from "../types/commonTypes";

const SET_FRIENDS = "myApp/users-reducer/SET_FRIENDS"; // редакс дакс
const FRIENDS_INITIAL_STATE = "myApp/users-reducer/FRIENDS_INITIAL_STATE"; //константа зануления при логауте

type setFriendsActyionType = {type: typeof SET_FRIENDS, users: Array<usersType>}
export let setFriends = (users:Array<usersType>):setFriendsActyionType => {//экшн креатор задания списка друзей
  return {type: SET_FRIENDS, users}
};


export type friendsInitialStateActionType = {type: typeof FRIENDS_INITIAL_STATE}
export let friendsInitialState = ():friendsInitialStateActionType => {//экшн креатор зануления при логауте
  return {type: FRIENDS_INITIAL_STATE}
};

type ActionTypes = setFriendsActyionType | friendsInitialStateActionType

let initialState = {
  myFriends2: [] as NulableType<Array<usersType>>, // массив списка друзей
  friendsCurrentPage: 1, // текущая страница выгрузки друзей
  friendsPageSize: 50, // количество друзей в одной выгрузке с сервера
  friendsTerm: "" as string, // поиск по друзьям
  friend: true // поиск по друзьям (только те, что follow = true)
}
type initialStateType = typeof initialState
const sidebarReducer = (state:initialStateType = initialState, action:ActionTypes):initialStateType => {
  let stateCopy:initialStateType; // объявлениечасти части стейта до изменения редьюсером
  switch (action.type) {
    case SET_FRIENDS:
      stateCopy = {
        ...state,
        myFriends2: action.users
      };
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
        .then((data) => {
          dispatch(setFriends(data.items))//записать в стейт загруженный стек друзей
        })
  }
}

export default sidebarReducer;
