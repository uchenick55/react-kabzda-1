import * as axios from "axios";
import {bedug_mode} from "../../redux/store-redux";

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    "API-KEY": "672204d9-92d7-4a15-9913-d64f4d26dd62"
  }
});

//672204d9-92d7-4a15-9913-d64f4d26dd62
//5498d71c-4755-4089-8800-ce606df9ca6f
//

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
  postLogin: async (email, password, rememberme, captchaURL) => { //авторизация на сервере по  данным из login формы
    const response = await instance.post(`/auth/login`, {email: email, password: password, rememberme: rememberme, captcha: captchaURL})
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

  putMyProfileData: async (MyProfile) => { // отправка новых данных профиля пользователя на сервер
    const response = await instance.put(`/profile`, MyProfile ) //
    return (response.data) //ответ от сервера
  },

  getCaptcha: async () => { // запрс картинки captcha при многократном неправильном вводе
    const response = await instance.get(`/security/get-captcha-url` ) //
    return (response.data) //ответ от сервера
  },

}

export let apiDialogs2 = { // объект с методами api для Dialogs
  getFollow: async (dialogUserID) => {// проверить follow/unfollow выбранного пользователя
    const response = await instance.get(`follow/${dialogUserID}`)
    return (response.data) //возврат данных из поля data
  }
}

const instance2 = axios.create({
  baseURL: 'https://public.herotofu.com/v1/',
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
 // body: JSON.stringify(data),
});

export let apiFeedBack = { // объект с методами api FeedBack
  postFeedBack: async () => {// отправить письмо
    await instance2.post(`e595a3c0-83b2-11ed-b38f-a1ed22f366b1`,
      {name: "testName12", email: "testEmail12", message: "testMessage12"})
  }
}






