import * as axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "672204d9-92d7-4a15-9913-d64f4d26dd62"
    }
});

export let apiUsers = { // объект с методами api для USERS и follow/unfollow
    getUsers: (currentPage, pageSize) => {
        return (
            instance.get(`users?count=${pageSize}&page=${currentPage}`)
                .then((response) => {
                    return (response.data) //возврат данных из поля data
                })
        )
    },
    postFollow: (userId) => {
        return (
            instance.post(`follow/${userId}`)
                .then((response) => {
                    return (response.data) //возврат данных из поля data
                })
        )
    },
    deleteFollow: (userId) => {
        return (
            instance.delete(`follow/${userId}`)
                .then((response) => {
                    return (response.data) //возврат данных из поля data
                })
        )
    }
}

export let apiProfile = { // объект с методами api для профайла и авторизации
    getProfile: (userId) => {// получить данные профиля выбранного пользователя по userId
        return (
            instance.get(`profile/` + userId)
                .then((response) => {
                    return (response.data) //возврат данных из поля data
                })
        )
    },
    getAuthMe: () => {// запрос "я авторизован?"
        return (
            instance.get(`auth/me`)
                .then((response) => {
                    return (response.data) //возврат данных из поля data
                })
        )
    },
    getStatus: (userId) => { // получить статус выбранного пользователя по userId
        return (
            instance.get(`/profile/status/${userId}`)
                .then((response) => {
                    return (response.data) //возврат данных из поля data
                })
        )
    },
    putStatus: (statusTmpInput) => { // отправка моего статуса
        return (
            instance.put(`/profile/status/`, {status: statusTmpInput})
                .then((response) => {
                    return (response.data) //возврат данных из поля data
                })
        )
    },
    postLogin: (email, password, rememberme) => { //авторизация на сервере по  данным из login формы
        return (
            instance.post(`/auth/login`, {email: email, password: password, rememberme: rememberme })
                .then((response) => {
                    return (response.data) //возврат данных из поля data
                })
        )
    },
    deleteLogin: () => { // логаут текущего пользователя
        return (
            instance.delete(`/auth/login`)
                .then((response) => {
                    return (response.data) //возврат данных из поля data
                })
        )
    }
}











