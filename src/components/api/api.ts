import axios from "axios";
import {ApiFeedBackDataType, ProfileType} from "../common/types/commonTypes";
import {
    CommRespType,
    GetCaptchaType,
    GetDialog2AllType,
    GetProfileType,
    GetUsersType,
    SendMessageType
} from "./apiTypes";
import {ResultCodeEnum, ResultCodeEnumCaptcha} from "./enum";
import {appActions} from "../../redux/app-reducer";
import store from "../../redux/store-redux";
import {saveDataToNotify} from "../common/functions/commonFunctions";

const instance = axios.create( {
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "6b13711a-1b5c-4624-ab7a-2cd0c376f794"
    }
} );

instance.interceptors.response.use(
    function (response) {
        // Любой код состояния, находящийся в диапазоне 2xx, вызывает срабатывание этой функции
        if (
            response?.data.resultCode === ResultCodeEnum.Error ||
            response?.data.resultCode === ResultCodeEnumCaptcha.CaptchaIsReqiured
        ) { // resultcode ошибка 1 или 10 (все возможные ошибки))
            for (let i = 0; i < response?.data.messages.length; i++) {
                saveDataToNotify( response?.data?.messages[i] ) // записать ошибку в массив уведомлений с временем возникновения
            }
            store.dispatch( appActions.toggleIsFetching( false ) ) //убрать крутилку загрузки с сервера
        }
        return response;// данные успешного ответа для дальнейшего перехвата методами
    },
    function (errorGlobal) {
        // Любые коды состояния, выходящие за пределы диапазона 2xx, вызывают срабатывание этой функции
        console.log( "axios.interceptors.response.use", errorGlobal )
        store.dispatch( appActions.setAppErrorAC( errorGlobal ) ) // запись данных ошибки в стейт
        store.dispatch( appActions.toggleIsFetching( false ) ) //убрать крутилку загрузки с сервера
        // return Promise.reject( err ); //дальше ошибку не передаем в обработчики
    } );


export const apiUsers = { // объект с методами api для USERS и follow/unfollow
    getUsers: async (currentPage: number, pageSize: number, term: string, friend: boolean = false) => {// получить стек пользователей
        const friendLocal = friend ? friend : null
        const response = await instance.get<GetUsersType>( `users?count=${pageSize}&page=${currentPage}&term=${term}&friend=${friendLocal}` )
        return (response.data) //возврат данных из поля data
    },
    postFollow: async (userId: number) => {// подписаться на выбранного пользователя
        const response = await instance.post<CommRespType>( `follow/${userId}` )
        return (response.data) //возврат данных из поля data
    },
    deleteFollow: async (userId: number) => {// отписаться от выбранного пользователя
        const response = await instance.delete<CommRespType>( `follow/${userId}` )
        return (response.data) //возврат данных из поля data
    }
}

type DataType1 = {
    id: number,
    email: string,
    login: string
}
type ResultCodeLoginType = ResultCodeEnum | ResultCodeEnumCaptcha

export const apiProfile = { // объект с методами api для профайла и авторизации
    getAuthMe: async () => {// запрос "я авторизован?"
        const response = await instance.get<CommRespType<DataType1>>( `auth/me` )
        return response.data //возврат данных из поля data
    },
    getProfile: async (userId: number) => {// получить данные профиля выбранного пользователя по userId
        const response = await instance.get<GetProfileType>( `profile/` + userId )
        return (response.data) //возврат данных из поля data
    },
    getStatus: async (userId: number) => { // получить статус выбранного пользователя по userId
        const response = await instance.get<string>( `/profile/status/${userId}` )
        return (response.data) //возврат данных из поля data
    },
    putStatus: async (statusTmpInput: string) => { // отправка моего статуса
        const response = await instance.put<CommRespType>( `/profile/status/`, {status: statusTmpInput} )
        return (response.data) //возврат данных из поля data
    },
    postLogin: async (email: string, password: string, rememberme?: boolean, captcha?: string) => { //авторизация на сервере по  данным из login формы
        const response = await instance.post<CommRespType<{ userId: string }, ResultCodeLoginType>>( `/auth/login`, {
            email: email,
            password: password,
            rememberme: rememberme,
            captcha: captcha
        } )
        return (response.data) //возврат данных из поля data
    },
    deleteLogin: async () => { // логаут текущего пользователя
        const response = await instance.delete<CommRespType>( `/auth/login` )
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
        const response = await instance.put<CommRespType>( `/profile/photo`, data, config ) // отправка фото на сервер
        return (response.data) //возврат данных из поля data
    },

    putMyProfileData: async (MyProfile: ProfileType) => { // отправка новых данных профиля пользователя на сервер
        const response = await instance.put<CommRespType>( `/profile`, MyProfile ) //
        return (response.data) //ответ от сервера
    },

    getCaptcha: async () => { // запрс картинки captcha при многократном неправильном вводе
        const response = await instance.get<GetCaptchaType>( `/security/get-captcha-url` ) //
        return (response.data) //ответ от сервера
    },
}


type PostFeedBack2Type = (data: ApiFeedBackDataType) => any

export const postFeedBack22: PostFeedBack2Type = async (data) => {// отправить письмо

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

export const apiDialog2 = {

    putDialog2Start: async (userId: number) => {
        const response = await instance.put<CommRespType>( `dialogs/${userId}` )
        return (response.data)  // начало диалога с пользователем по его ID
        //putDialog2Start  | dialogs/{userId} - начать диалог, собеседник поднимается вверх??
    },
    getDialog2All: async () => { // получить список всех диалогов
        const response = await instance.get<GetDialog2AllType>( `dialogs` )
        return response.data //- получить список сообщений по id пользователя

        //getDialog2All | dialogs/{userId}/messages
        // userId - (number) - user id of your friend
        // page (number,default 1) number of requested portion
        // count (number, default 10) size of requestedPortion
    },
    postDialog2Message: async (userId: number, body: string) => {
        const response = await instance.post<CommRespType<SendMessageType>>( `dialogs/${userId}/messages`, {body: body} )
        return (response.data) // - отправить сообщение пользователю
        //postDialog2Message | dialogs / {userId}/messages
        //- отправить новое сообщение диалога
        // RI Parameters:
        //     userId - (number) - user id of your friend
        // required params:
        //    body - (string) - your message to friend
    },
    getDialog2MessageIdViewed: async (messageId: string) => {
        const response = await instance.get<boolean>( `dialogs/messages/${messageId}/viewed` )
        return (response) //- проверить, было ли прочитано сообщение по Id сообщения
        // getDialog2MessageIdViewed | dialogs/messages/{messageId}/viewed
        //URI Parameters:
        //    messageId- (number) - user message ID
    },
    postDialog2MessageIdToSpam: async (messageId: string) => {
        const response = await instance.post<CommRespType>( `dialogs/messages/${messageId}/spam` )
        return (response.data) // - пометить сообщение как спам
        // postDialog2MessageIdToSpam | dialogs/messages/{messageId}/spam
        //URI Parameters:
        //   messageId- (number) - message ID to spam
    },
    deleteDialog2MessageId: async (messageId: string) => {
        const response = await instance.delete<CommRespType>( `dialogs/messages/${messageId}` )
        return (response.data) //- удалить сообщение (только у себя) по ID сообщения
        // deleteDialog2MessageId | dialogs/messages/{messageId}
        //URI Parameters:
        // messageId- (number) - message ID to delete
    },
    putDialog2MessageIdRestore: async (messageId: string) => {
        const response = await instance.put<CommRespType>( `dialogs/messages/${messageId}/restore` )
        return (response.data) // - восстановить сообщение из спама и удаленных
        // putDialog2MessageIdRestore | dialogs/messages/{messageId}/restore
        //URI Parameters:
        // messageId- (number) - message ID to restore
    },
    getDialog2MessagesNewerThen: async (userId: number, date: string) => {
        const response = await instance.get<Array<SendMessageType>>( `dialogs/${userId}/messages/new?newerThen=${date}` )
        return (response.data) // - вернуть сообщения новее определенной даты
        // getDialog2MessagesNewerThen | dialogs/{userId}/messages/new?newerThen={date}
        //URI Parameters:
        //    userId- (number) - user id of your friend
        //date - (string) - desired date (string in date format)*/
    },
    getDailog2UnreadMessages: async () => {
        const response = await instance.get<number>( `dialogs/messages/new/count` )
        return (response.data) // - вернуть количество непрочтенных сообщений

    },
}

export const apiTasks = {  // получить новости для tasks
    getNews: async (query: string) => {
        const response = await axios.get( `https://hn.algolia.com/api/v1/search?query=${query}` )
        return (response.data.hits)  // вернуть данные news
    }
}


//27045 evgeniysazonov1983@googlemail.com
//25528 evgeniysazonov1983@gmail.com
