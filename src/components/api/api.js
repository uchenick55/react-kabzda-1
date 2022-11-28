import * as axios from "axios";
import {state_copy_for_debug} from "../../redux/store-redux";

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    "API-KEY": "672204d9-92d7-4a15-9913-d64f4d26dd62"
  }
});


export let apiUsers = { // объект с методами api для USERS и follow/unfollow
  getUsers: async (currentPage, pageSize, term, friend = undefined) => {// получить стек пользователей
    if (state_copy_for_debug) {console.log("getUsers")}
    const response = await instance.get(`users?count=${pageSize}&page=${currentPage}&term=${term}&friend=${friend}`)
    return (response.data) //возврат данных из поля data
  },
  postFollow: async (userId) => {// подписаться на выбранного пользователя
    const response = await instance.post(`follow/${userId}`)
    return (response.data) //возврат данных из поля data
  },
  deleteFollow: async (userId) => {// отписаться от выбранного пользователя
    const response = await instance.delete(`follow/${userId}`)
    return (response.data) //возврат данных из поля data
  }
}

export let apiProfile = { // объект с методами api для профайла и авторизации
  getProfile: async (userId) => {// получить данные профиля выбранного пользователя по userId
    const response = await instance.get(`profile/` + userId)
    return (response.data) //возврат данных из поля data
  },
  getAuthMe: async () => {// запрос "я авторизован?"
    const response = await instance.get(`auth/me`)
    return (response.data) //возврат данных из поля data
  },
  getStatus: async (userId) => { // получить статус выбранного пользователя по userId
    const response = await instance.get(`/profile/status/${userId}`)
    return (response.data) //возврат данных из поля data
  },
  putStatus: async (statusTmpInput) => { // отправка моего статуса
    const response = await instance.put(`/profile/status/`, {status: statusTmpInput})
    return (response.data) //возврат данных из поля data
  },
  postLogin: async (email, password, rememberme) => { //авторизация на сервере по  данным из login формы
    const response = await instance.post(`/auth/login`, {email: email, password: password, rememberme: rememberme})
    return (response.data) //возврат данных из поля data
  },
  deleteLogin: async () => { // логаут текущего пользователя
    const response = await instance.delete(`/auth/login`)
    return (response.data) //возврат данных из поля data
  }
}











