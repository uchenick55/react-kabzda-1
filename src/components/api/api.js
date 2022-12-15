import * as axios from "axios";
import {bedug_mode} from "../../redux/store-redux";

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    "API-KEY": "672204d9-92d7-4a15-9913-d64f4d26dd62"
  }
});


export let apiUsers = { // объект с методами api для USERS и follow/unfollow
  getUsers: async (currentPage, pageSize, term, friend = undefined) => {// получить стек пользователей
    if (bedug_mode) {console.log("getUsers")}
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
  },
  putPhoto: async (profilePhoto) => { // отправка фото пользователя

    const data = new FormData() // создаем новый объект
    data.append('image', profilePhoto) // добавляем в созданный объект загруженое фото
    const config = {
      headers: {
        'content-type': 'multipart/form-data' // задаем тип отправляемых данных
      }
    }
    const response = await instance.put(`/profile/photo`, data, config) // отправка фото на сервер
    return (response.data) //возврат данных из поля data
  },

  putMyProfileData: async (/*userId, LookingForAJob, LookingForAJobDescription, FullName, contacts, AboutMe*/) => { // отправка данных профиля пользователя

    let MyProfile = {
      userId: 40000, //userId: required(integer)
      LookingForAJob: false, //lookingForAJob: required(boolean)
      AboutMe: "Обо Мне AboutMe",
      LookingForAJobDescription: "myLookingForAJobDescription", //  lookingForAJobDescription: required(string)
      FullName: "myFullName1",//required(string)
      contacts: {
        github: "https://github.com/Alexrus-cyber", //  required(string)
        vk: "https://vk.com/arassadin2014", // required(string)
        facebook: "https://ru.wikipedia.org/wiki/Facebook", // required(string)
        instagram: "https://github.com/Alexrus-cyber", //required(string),
        twitter: "https://vk.com/arassadin2014", //required(string),
        website: "https://ru.wikipedia.org", //required(string),
        youtube: "https://github.com/Alexrus-cyber", //required(string),
        mainLink: "https://github.com/Alexrus-cyber" //required(string)

      }
    }
    const response = await instance.put(`/profile`, MyProfile ) // отправка фото на сервер
    return (response.data) //ответ от сервера
  }

}

export let apiDialogs2 = { // объект с методами api для Dialogs
  getFollow: async (dialogUserID) => {// проверить follow/unfollow выбранного пользователя
    const response = await instance.get(`follow/${dialogUserID}`)
    return (response.data) //возврат данных из поля data
  }
}






