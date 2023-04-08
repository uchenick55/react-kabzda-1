import {apiProfile} from "../components/api/api";
import {friendsInitialState, friendsInitialStateActionType} from "./sidebar-reducer";
import {dialogsInitialState, dialogsInitialStateType} from "./dialogs-reducer";
import {profileInitialState, profileInitialStateActionType} from "./profile-reducer";
import {usersInitialState, usersInitialStateActonType} from "./users-reducer";
import {GlobalStateType} from "./store-redux";
import {ThunkAction} from "redux-thunk";
import {getProfileType} from "../components/api/apiTypes";
import {ResultCodeEnum} from "../components/api/enum";

const SET_MY_DATA = "myApp/auth-reducer/SET_MY_DATA"; // константа для задания базовых данных моего профиля (ID, Email, login, isAuth)
const AUTH_INITIAL_STATE = "myApp/auth-reducer/AUTH_INITIAL_STATE"; //константа зануления при логауте
const SET_CAPTCHA_URL = "myApp/auth-reducer/SET_CAPTCHA_URL"; //константа задания URL каптчи
const SET_LOGIN_ERROR= "myApp/auth-reducer/SET_LOGIN_ERROR"; //константа задания ошибки авторизации
const SET_MY_PROFILE = "myApp/auth-reducer/SET_MY_PROFILE"; // константа задания расширенных данных моего профиля

export type setMyProfileActionType = {type: typeof SET_MY_PROFILE, myProfile: getProfileType}
export let setMyProfile = (myProfile:getProfileType):setMyProfileActionType => { // экшн креатор задания расширенных данных моего профиля
    return {type: SET_MY_PROFILE, myProfile}
};

type setAuthDataActionType = {
    type: typeof SET_MY_DATA,
    id:number,
    email:string,
    login:string,
    isAuth: boolean
}
export let setAuthData = (id:number, email:string, login:string, isAuth:boolean):setAuthDataActionType => {
    // экшн креатор задания моих ID, Email, login
    return {type: SET_MY_DATA, id, email, login, isAuth}
};

type authInitialStateActionType = {type: typeof AUTH_INITIAL_STATE}
export let authInitialState = ():authInitialStateActionType => { // экшн креатор зануления при логауте
    return {type: AUTH_INITIAL_STATE}
};

type setCaptchaURLActionType = {type: typeof SET_CAPTCHA_URL, captchaURL: string}
export let setCaptchaURL = (captchaURL:string):setCaptchaURLActionType => { // экшн креатор задания URL каптчи ответа от сервера
    return {type: SET_CAPTCHA_URL, captchaURL}
};

type setLoginErrorActionType = {type: typeof SET_LOGIN_ERROR, loginError: string}
export let setLoginError = (loginError: string):setLoginErrorActionType => { // экшн креатор задания ошибки с сервера
    return {type: SET_LOGIN_ERROR, loginError}
};

type ActionTypes = setLoginErrorActionType | setCaptchaURLActionType | authInitialStateActionType |
    setAuthDataActionType | setMyProfileActionType | dialogsInitialStateType | profileInitialStateActionType |
friendsInitialStateActionType | usersInitialStateActonType

type initialStateType = { // стейт по умолчанию для моего профиля
    myId: number | null, // мой ID по умолчанию
    myEmail: string | null,// мой Email по умолчанию
    myLogin: string | null,// мой логин по умолчанию
    isAuth: boolean, // Флаг авторизации
    myProfile: object | null, // мой расширенный профиль по умолчанию
    captchaURL: string | null, // URL каптчи после 5 неправильных вводов
    loginError: string | null, // ошибка авторизации с сервера
}
let initialState:initialStateType = { // стейт по умолчанию для моего профиля
    myId: null, // мой ID по умолчанию
    myEmail: null,// мой Email по умолчанию
    myLogin: null,// мой логин по умолчанию
    isAuth: false, // Флаг авторизации
    myProfile: null, // мой расширенный профиль по умолчанию
    captchaURL: null, // URL каптчи после 5 неправильных вводов
    loginError: null, // ошибка авторизации с сервера
}

let authReducer = (state:initialStateType = initialState, action:ActionTypes):initialStateType => { // редьюсер авторизации и моего профиля
    let stateCopy:initialStateType; // объявлениечасти части стейта до изменения редьюсером
    switch (action.type) {
        case SET_MY_DATA: // экшн задания моих id, email, login
            stateCopy = {
                ...state,
                myId: action.id,
                myEmail: action.email,
                myLogin: action.login,
                isAuth: action.isAuth,
            }

            return stateCopy; // возврат копии стейта после изменения
        case SET_MY_PROFILE: // экшн задания моего расширенного профиля
            stateCopy = {
                ...state,
                myProfile: action.myProfile
            }

            return stateCopy; // возврат копии стейта после изменения
        case AUTH_INITIAL_STATE: // экшн зануления при логауте
            stateCopy = initialState
            return stateCopy; // возврат копии стейта после изменения
        case SET_CAPTCHA_URL: // экшн установки URL каптчи при логине
            stateCopy = {
                ...state,
                captchaURL: action.captchaURL
            }
            return stateCopy; // возврат копии стейта после изменения
        case SET_LOGIN_ERROR: // экшн задания ошибки авторизации с сервера
            stateCopy = {
                ...state,
                loginError: action.loginError
            }

            return stateCopy; // возврат копии стейта после изменения
        default:
            return state; // по умолчанию стейт возврашается неизмененным
    }
}
type ThunkType = ThunkAction<
    void,    // санка ничего не возвращает
    GlobalStateType,    // глобальный стейт из redux
    unknown,    // нет доп параметров
    ActionTypes // все типы ActionCreator
    >
export let getAuthMeThunkCreator = ():ThunkType => {//санкреатор я авторизован?. Данных для запроса нет
    return async (dispatch, getState) => {
        const response1 = await apiProfile.getAuthMe() // я авторизован?
        if (response1.resultCode === ResultCodeEnum.Success) { //если неверно ввели логин/пароль 5 раз
            dispatch(setAuthData(
                response1.data.id, // записать с стейт мой ID
                response1.data.email, // записать с стейт мой емейл
                response1.data.login, // записать с стейт мой логин
                true // отметить что а авторизован
            ))//задание в стейт текущего пользователя

            const response2 = await apiProfile.getProfile(response1.data.id)//получение моих дополнительных данных после авторизации

            dispatch(setMyProfile(response2))//задание в стейт моих доп данных
        }
        if (response1.resultCode !== ResultCodeEnum.Success) { //пользователь не авторизован
            dispatch(authInitialState()) // запустить зануление стейта
        }
    };
}

export let postLoginThunkCreator = (email:string, password:string, rememberme:boolean, captchaURL:string):ThunkType => {
    //санкреатор на логин
    return async (dispatch, getState) => { // объявление санки на логин
        const response = await apiProfile.postLogin(email, password, rememberme, captchaURL) // отправка данных на авторизацию из формы логина
        if (response.resultCode === ResultCodeEnum.Success) { // если успешная авторизация на сервере
            dispatch(getAuthMeThunkCreator()) // получить данные с сервера авторизованного пользователя
        } else { // если логин или пароль не подошли
            let message =  // определение локальной переменной message - ответ от сервера
                !response.messages[0] // если ответа от сервера нет
                    ? "no responce from server" // вывести сообщение заглушку
                    : response.messages[0] // иначе вывести ответ от сервера
            if (response.resultCode === ResultCodeEnum.CaptchaIsReqiured) { // если ошибка в многократном неправильном вводе логина и пароля
                dispatch(getCaptchaThunkCreator())
            }
            dispatch(setLoginError(message)) // ошибка авторизации для формика
        }
    };
}

export let deleteLoginThunkCreator = ():ThunkType => {//санкреатор на логАут
    return async (dispatch, getState) => { // объявление санки на логаут
        const response = await apiProfile.deleteLogin() // отправка запроса на логаут
        if (response.resultCode === ResultCodeEnum.Success) { // если сессия успешно закрыта
            setTimeout(() => {

                dispatch(dialogsInitialState())// зануление диалогов при логауте

                dispatch(authInitialState())// зануление авторизации при логауте

                dispatch(profileInitialState())// зануление профиля при логауте

                dispatch(friendsInitialState())// зануление FriendList при логауте

                dispatch(usersInitialState())// зануление UsersBS при логауте

            }, 300)
        } else {
            console.log(response.messages) // вывести в консоль сообщение ошибки логаута
        }
    };
}

export let getCaptchaThunkCreator = ():ThunkType => {//санкреатор на получение каптчи
    return async (dispatch, getState) => { // санка на получение каптчи
        const response2 = await apiProfile.getCaptcha() // запрос каптчи
        dispatch(setCaptchaURL(response2.url)) // получить данные с сервера авторизованного пользователя
    };
}

export default authReducer;










