import {apiUsers} from "../components/api/api";

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
  friendsPageSize: 5, // количество друзей в одной выгрузке с сервера
  friendsTerm: "", // поиск по друзьям
  friend: true // поиск по друзьям (только те, что follow = true)

}
const sidebarReducer = (state = initialState, action) => {
  return state; // всегда возвращает входящий стейт
}

export let getFriendsThunkCreator = (currentPage, pageSize, term, friend) => {//санкреатор получить пользователей с данными
  let getUsersThunk = (dispatch) => { // санка получить пользователей
//    dispatch(toggleIsFetching(true)) //показать крутилку загрузки с сервера
    apiUsers.getUsers(currentPage, pageSize, term, friend) //получить пользователей по текущей странице и размере страницы
      .then((data) => {
        console.log(data)
//        dispatch(toggleIsFetching(false))  //убрать крутилку загрузки с сервера
//        dispatch(setUsers(data.items))//записать в стейт закгруженный стек пользователей
//        dispatch(setUsersTotalCount(data.totalCount))//записать в сейт общее количество пользователей
      })

  }
  return getUsersThunk
}

export default sidebarReducer;
