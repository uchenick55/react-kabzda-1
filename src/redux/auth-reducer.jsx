import {apiProfile} from "../components/api/api";
import {bedug_mode} from "./store-redux";
import {friendsInitialState} from "./sidebar-reducer";
import {dialogsInitialState} from "./dialogs-reducer";
import {profileInitialState} from "./profile-reducer";
import {usersInitialState} from "./users-reducer.tsx";

const SET_MY_DATA = "myApp/auth-reducer/SET_MY_DATA"; // константа для задания базовых данных моего профиля (ID, Email, login, isAuth)
const AUTH_INITIAL_STATE = "myApp/auth-reducer/AUTH_INITIAL_STATE"; //константа зануления при логауте
const SET_CAPTCHA_URL = "myApp/auth-reducer/SET_CAPTCHA_URL"; //константа задания URL каптчи
const SET_LOGIN_ERROR= "myApp/auth-reducer/SET_LOGIN_ERROR"; //константа задания ошибки авторизации
const SET_MY_PROFILE = "myApp/auth-reducer/SET_MY_PROFILE"; // константа задания расширенных данных моего профиля

export let setMyProfile = (myProfile) => { // экшн креатор задания расширенных данных моего профиля
    return {type: SET_MY_PROFILE, myProfile}
};
export let setAuthData = (id, email, login, isAuth) => { // экшн креатор задания моих ID, Email, login
    return {type: SET_MY_DATA, id, email, login, isAuth}
};
export let authInitialState = () => { // экшн креатор зануления при логауте
    return {type: AUTH_INITIAL_STATE}
};
export let setCaptchaURL = (captchaURL) => { // экшн креатор задания URL каптчи ответа от сервера
    return {type: SET_CAPTCHA_URL, captchaURL}
};
export let setLoginError = (loginError) => { // экшн креатор задания моих ID, Email, login
    return {type: SET_LOGIN_ERROR, loginError}
};


let initialState = { // стейт по умолчанию для моего профиля
    myId: null, // мой ID по умолчанию
    myEmail: null,// мой Email по умолчанию
    myLogin: null,// мой логин по умолчанию
    isAuth: false, // Флаг авторизации
    myProfile: null, // мой расширенный профиль по умолчанию
    captchaURL: null, // URL каптчи после 5 неправильных вводов
    loginError: null, // ошибка авторизации с сервера
}

let authReducer = (state = initialState, action) => { // редьюсер авторизации и моего профиля
    let stateCopy; // объявлениечасти части стейта до изменения редьюсером
    switch (action.type) {
        case SET_MY_DATA: // экшн задания моих id, email, login
            stateCopy = {
                ...state,
                myId: action.id,
                myEmail: action.email,
                myLogin: action.login,
                isAuth: action.isAuth,
            }
            if (bedug_mode) {
                console.log("auth-reducer.jsx, SET_MY_DATA: ", state, stateCopy)
            } // дебаг

            return stateCopy; // возврат копии стейта после изменения
        case SET_MY_PROFILE: // экшн задания моего расширенного профиля
            stateCopy = {
                ...state,
                myProfile: action.myProfile
            }
            if (bedug_mode) {
                console.log("auth-reducer.jsx, SET_MY_PROFILE: ", state, stateCopy)
            } // дебаг
            return stateCopy; // возврат копии стейта после изменения
        case AUTH_INITIAL_STATE: // экшн зануления при логауте
            stateCopy = initialState
            if (bedug_mode) {
                console.log("auth-reducer.jsx, AUTH_INITIAL_STATE: ", state, stateCopy)
            } // дебаг
            return stateCopy; // возврат копии стейта после изменения
        case SET_CAPTCHA_URL: // экшн зануления при логауте
            stateCopy = {
                ...state,
                captchaURL: action.captchaURL
            }
            if (bedug_mode) {
                console.log("auth-reducer.jsx, SET_CAPTCHA_URL: ", state, stateCopy)
            } // дебаг
            return stateCopy; // возврат копии стейта после изменения
        case SET_LOGIN_ERROR: // экшн задания ошибки авторизации с сервера
            stateCopy = {
                ...state,
                loginError: action.loginError
            }
            if (bedug_mode) {
                console.log("auth-reducer.jsx, SET_LOGIN_ERROR: ", state, stateCopy)
            } // дебаг
            return stateCopy; // возврат копии стейта после изменения
        default:
            return state; // по умолчанию стейт возврашается неизмененным
    }
}

export let getAuthMeThunkCreator = () => {//санкреатор я авторизован?. Данных для запроса нет
    let getAuthMeThunk = async (dispatch) => {
        const response1 = await apiProfile.getAuthMe() // я авторизован?
        if (response1.resultCode === 0) { //если я авторизован
            if (bedug_mode) {
                console.log("auth-reducer.jsx, getAuthMeThunkCreator.await getAuthMe() : dispatch(setAuthData)->SET_MY_DATA  (пользователь авторизован)")
            } // дебаг
            dispatch(setAuthData(
                response1.data.id, // записать с стейт мой ID
                response1.data.email, // записать с стейт мой емейл
                response1.data.login, // записать с стейт мой логин
                true // отметить что а авторизован
            ))//задание в стейт текущего пользователя

            const response2 = await apiProfile.getProfile(response1.data.id)//получение моих дополнительных данных после авторизации
            if (bedug_mode) {
                console.log("auth-reducer.jsx, getAuthMeThunkCreator.await(getAuthMe)->await .getProfile() : dispatch(setMyProfile()->SET_MY_PROFILE")
            } // дебаг
            dispatch(setMyProfile(response2))//задание в стейт моих доп данных
        }
        if (response1.resultCode !== 0) { //пользователь не авторизован
            dispatch(authInitialState()) // запустить зануление стейта
        }
    }
    return getAuthMeThunk;
}

export let postLoginThunkCreator = (email, password, rememberme, captchaURL) => {//санкреатор на логин
    let postLoginThunk = async (dispatch) => { // объявление санки на логин
        const response = await apiProfile.postLogin(email, password, rememberme, captchaURL) // отправка данных на авторизацию из формы логина
        if (response.resultCode === 0) { // если успешная авторизация на сервере
            if (bedug_mode) {
                console.log("auth-reducer.jsx, postLoginThunkCreator.await .postLogin(): dispatch(getAuthMeThunkCreator())")
            } // дебаг
            dispatch(getAuthMeThunkCreator()) // получить данные с сервера авторизованного пользователя
        } else { // если логин или пароль не подошли
            let message =  // определение локальной переменной message - ответ от сервера
                !response.messages[0] // если ответа от сервера нет
                    ? "no responce from server" // вывести сообщение заглушку
                    : response.messages[0] // иначе вывести ответ от сервера
            if (bedug_mode) {
                console.log("auth-reducer.jsx, postLoginThunkCreator.await / если логин или пароль не подошли: dispatch(action) // отправить данные в форму")
            } // дебаг
            if (response.resultCode === 10) { // если ошибка в многократном неправильном вводе логина и пароля
                dispatch(getCaptchaThunkCreator())
            }
            dispatch(setLoginError(message)) // ошибка авторизации для формика
        }
    }
    return postLoginThunk;
}
export let deleteLoginThunkCreator = () => {//санкреатор на логАут
    let deleteLoginThunk = async (dispatch) => { // объявление санки на логаут
        const response = await apiProfile.deleteLogin() // отправка запроса на логаут
        if (response.resultCode === 0) { // если сессия успешно закрыта
            setTimeout(() => {

                if (bedug_mode) {
                    console.log("auth-reducer.jsx, deleteLoginThunkCreator.await .deleteLogin():dispatch(dialogsInitialState())->DIALOGS_INITIAL_STATE")
                } // дебаг
                dispatch(dialogsInitialState())// зануление диалогов при логауте

                if (bedug_mode) {
                    console.log("auth-reducer.jsx, deleteLoginThunkCreator.await .deleteLogin():dispatch(authInitialState())->AUTH_INITIAL_STATE")
                } // дебаг
                dispatch(authInitialState())// зануление авторизации при логауте

                if (bedug_mode) {
                    console.log("auth-reducer.jsx, deleteLoginThunkCreator.await .deleteLogin():dispatch(profileInitialState())->PROFILE_INITIAL_STATE")
                } // дебаг
                dispatch(profileInitialState())// зануление профиля при логауте


                if (bedug_mode) {
                    console.log("auth-reducer.jsx, deleteLoginThunkCreator.await .deleteLogin():dispatch(friendsInitialState())->FRIENDS_INITIAL_STATE")
                } // дебаг
                dispatch(friendsInitialState())// зануление FriendList при логауте

                if (bedug_mode) {
                    console.log("auth-reducer.jsx, deleteLoginThunkCreator.await .deleteLogin():dispatch(usersInitialState())->USERS_INITIAL_STATE")
                } // дебаг
                dispatch(usersInitialState())// зануление UsersBS при логауте

            }, 300)
        } else {
            console.log(response.messages) // вывести в консоль сообщение ошибки логаута
        }
    }
    return deleteLoginThunk;
}

export let getCaptchaThunkCreator = () => {//санкреатор на получение каптчи
    let getCaptchaThunk = async (dispatch) => { // санка на получение каптчи
        const response2 = await apiProfile.getCaptcha() // запрос каптчи
        if (bedug_mode) {
            console.log("auth-reducer.jsx, postLoginThunkCreator.await .getCaptcha(): dispatch()")
        } // дебаг
        dispatch(setCaptchaURL(response2.url)) // получить данные с сервера авторизованного пользователя
    }
    return getCaptchaThunk;
}

export default authReducer;










