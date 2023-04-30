import axios from "axios";
import {apiFeedBackDataType, ProfileType} from "../../types/commonTypes";
import {commonResponseType, getAuthMeType, getCaptchaType, getProfileType, getUsersType} from "./apiTypes";

const instance = axios.create( {
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "Access-Control-Allow-Origin"
    }
} );


export const apiUsers = { // объект с методами api для USERS и follow/unfollow
    getUsers: async (currentPage: number, pageSize: number, term: string, friend: boolean = false) => {// получить стек пользователей
        const friendLocal = friend ? friend : null
        const response = await instance.get<getUsersType>( `users?count=${pageSize}&page=${currentPage}&term=${term}&friend=${friendLocal}` )
        return (response.data) //возврат данных из поля data
    },
    postFollow: async (userId: number) => {// подписаться на выбранного пользователя
        const response = await instance.post<commonResponseType>( `follow/${userId}` )
        return (response.data) //возврат данных из поля data
    },
    deleteFollow: async (userId: number) => {// отписаться от выбранного пользователя
        const response = await instance.delete<commonResponseType>( `follow/${userId}` )
        return (response.data) //возврат данных из поля data
    }
}


export const apiProfile = { // объект с методами api для профайла и авторизации
    getAuthMe: async () => {// запрос "я авторизован?"
        const response = await instance.get<getAuthMeType>( `auth/me` )
        return (response.data) //возврат данных из поля data
    },
    getProfile: async (userId: number) => {// получить данные профиля выбранного пользователя по userId
        const response = await instance.get<getProfileType>( `profile/` + userId )
        return (response.data) //возврат данных из поля data
    },
    getStatus: async (userId: number) => { // получить статус выбранного пользователя по userId
        const response = await instance.get<string>( `/profile/status/${userId}` )
        return (response.data) //возврат данных из поля data
    },
    putStatus: async (statusTmpInput: string) => { // отправка моего статуса
        const response = await instance.put<commonResponseType>( `/profile/status/`, {status: statusTmpInput} )
        return (response.data) //возврат данных из поля data
    },
    postLogin: async (email: string, password: string, rememberme?: boolean, captcha?: string) => { //авторизация на сервере по  данным из login формы
        const response = await instance.post<commonResponseType>( `/auth/login`, {
            email: email,
            password: password,
            rememberme: rememberme,
            captcha: captcha
        } )
        return (response.data) //возврат данных из поля data
    },
    deleteLogin: async () => { // логаут текущего пользователя
        const response = await instance.delete<commonResponseType>( `/auth/login` )
        return (response.data) //возврат данных из поля data
    },
    putPhoto: async (profilePhoto: File) => { // отправка фото пользователя

        const data = new FormData() // создаем новый объект
        data.append( 'image', profilePhoto ) // добавляем в созданный объект загруженое фото
        const config = {
            headers: {
                'content-type': 'multipart/form-data' // задаем тип отправляемых данных
            }
        }
        const response = await instance.put<commonResponseType>( `/profile/photo`, data, config ) // отправка фото на сервер
        return (response.data) //возврат данных из поля data
    },

    putMyProfileData: async (MyProfile: ProfileType) => { // отправка новых данных профиля пользователя на сервер
        const response = await instance.put<commonResponseType>( `/profile`, MyProfile ) //
        return (response.data) //ответ от сервера
    },

    getCaptcha: async () => { // запрс картинки captcha при многократном неправильном вводе
        const response = await instance.get<getCaptchaType>( `/security/get-captcha-url` ) //
        return (response.data) //ответ от сервера
    },
}

type postFeedBack2Type = (data: apiFeedBackDataType) => any

export const postFeedBack22:postFeedBack2Type = async (data) => {// отправить письмо

    const FORM_ENDPOINT = "https://public.herotofu.com/v1/e595a3c0-83b2-11ed-b38f-a1ed22f366b1";// конечная точка
    const response = await fetch( FORM_ENDPOINT, {
        method: "POST", // метод отправить
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json", // тип отправления
        },
        body: JSON.stringify( data ),
    } )
    return (response) //возврат данных из поля data

}
