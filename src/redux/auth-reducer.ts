import {apiProfile} from "../components/api/api";
import {profileActions} from "./profile-reducer";
import {UsersActions} from "./users-reducer";
import {InferActionsTypes} from "./store-redux";
import {getProfileType} from "../components/api/apiTypes";
import {ResultCodeEnum, ResultCodeEnumCaptcha} from "../components/api/enum";
import {ComThunkTp, NulableType} from "../types/commonTypes";
import {Dialog2Actions} from "./dialog2-reducer";
import {AppActions} from "./app-reducer";

const SET_MY_DATA = "myApp/auth-reducer/SET_MY_DATA"; // константа для задания базовых данных моего профиля (ID, Email, login, isAuth)
const AUTH_INITIAL_STATE = "myApp/auth-reducer/AUTH_INITIAL_STATE"; //константа зануления при логауте
const SET_CAPTCHA_URL = "myApp/auth-reducer/SET_CAPTCHA_URL"; //константа задания URL каптчи
const SET_LOGIN_ERROR = "myApp/auth-reducer/SET_LOGIN_ERROR"; //константа задания ошибки авторизации
const SET_MY_PROFILE = "myApp/auth-reducer/SET_MY_PROFILE"; // константа задания расширенных данных моего профиля

type setAuthDataActionType = {
    type: typeof SET_MY_DATA,
    id: number,
    email: string,
    login: string,
    isAuth: boolean
}

export const AuthActions = {
    setMyProfile: (myProfile: getProfileType) => { // экшн креатор задания расширенных данных моего профиля
        return {type: SET_MY_PROFILE, myProfile} as const
    },

    setAuthData: (id: number, email: string, login: string, isAuth: boolean): setAuthDataActionType => {
        return {type: SET_MY_DATA, id, email, login, isAuth} as const
    },

    authInitialState: () => { // экшн креатор зануления при логауте
        return {type: AUTH_INITIAL_STATE} as const
    },

    setCaptchaURL: (captchaURL: string) => { // экшн креатор задания URL каптчи ответа от сервера
        return {type: SET_CAPTCHA_URL, captchaURL} as const
    },

    setLoginError: (loginError: string) => { // экшн креатор задания ошибки с сервера
        return {type: SET_LOGIN_ERROR, loginError} as const
    }
}

export type AuthActionTypes =
    InferActionsTypes<typeof AuthActions> |
    InferActionsTypes<typeof profileActions> |
    InferActionsTypes<typeof UsersActions> |
    InferActionsTypes<typeof Dialog2Actions> |
    InferActionsTypes<typeof AppActions>

const initialState = { // стейт по умолчанию для моего профиля
    myId: 0 as number, // мой ID по умолчанию
    myEmail: "" as string,// мой Email по умолчанию
    myLogin: "" as string,// мой логин по умолчанию
    isAuth: false, // Флаг авторизации
    myProfile: null as NulableType<getProfileType>, // мой расширенный профиль по умолчанию
    captchaURL: "" as string, // URL каптчи после 5 неправильных вводов
    loginError: "" as string, // ошибка авторизации с сервера
}
type initialStateAuthType = typeof initialState
const authReducer = (state: initialStateAuthType = initialState, action: AuthActionTypes): initialStateAuthType => { // редьюсер авторизации и моего профиля
    let stateCopy: initialStateAuthType; // объявлениечасти части стейта до изменения редьюсером
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

export const getAuthMeThunkCreator = (): ComThunkTp<AuthActionTypes> => {//санкреатор я авторизован?. Данных для запроса нет
    return async (dispatch, getState) => {
        const {response, err} = await apiProfile.getAuthMe() // я авторизован?
        if (response?.resultCode === ResultCodeEnum.Success) { //если верно ввели логин/пароль
            const {id, email, login} = response.data // мой ID, емейл, логин
            dispatch( AuthActions.setAuthData(
                id, email, login, // записать в стейт мои ID, емейл, логин
                true // отметить что а авторизован
            ) )
            const response2 = await apiProfile.getProfile( response?.data.id )//получение моих дополнительных данных после авторизации

            dispatch( AuthActions.setMyProfile( response2 ) )//задание в стейт моих доп данных
            if (response.resultCode !== ResultCodeEnum.Success) { //пользователь не авторизован
                dispatch( AuthActions.authInitialState() ) // запустить зануление стейта
            }
        } else {
            dispatch(AppActions.setAppErrorAC(err))
            console.log( (err) )// в консоль ошибку
        }


        // if (response1.resultCode === ResultCodeEnum.Success) { //если неверно ввели логин/пароль 5 раз
        //     dispatch( AuthActions.setAuthData(
        //         response1.data.id, // записать с стейт мой ID
        //         response1.data.email, // записать с стейт мой емейл
        //         response1.data.login, // записать с стейт мой логин
        //         true // отметить что а авторизован
        //     ) )//задание в стейт текущего пользователя


    };
}

export const postLoginThunkCreator = (email: string, password: string, rememberme?: boolean, captcha?: string): ComThunkTp<AuthActionTypes> => {
    //санкреатор на логин
    return async (dispatch, getState) => { // объявление санки на логин
        const response = await apiProfile.postLogin( email, password, rememberme, captcha ) // отправка данных на авторизацию из формы логина
        if (response.resultCode === ResultCodeEnum.Success) { // если успешная авторизация на сервере
            dispatch( getAuthMeThunkCreator() ) // получить данные с сервера авторизованного пользователя
        } else { // если логин или пароль не подошли
            const message =  // определение локальной переменной message - ответ от сервера
                !response.messages[0] // если ответа от сервера нет
                    ? "no responce from server" // вывести сообщение заглушку
                    : response.messages[0] // иначе вывести ответ от сервера
            if (response.resultCode === ResultCodeEnumCaptcha.CaptchaIsReqiured) { // если ошибка в многократном неправильном вводе логина и пароля
                dispatch( getCaptchaThunkCreator() )
            }
            dispatch( AuthActions.setLoginError( message ) ) // ошибка авторизации для формика
        }
    };
}

export const deleteLoginThunkCreator = (): ComThunkTp<AuthActionTypes> => {//санкреатор на логАут
    return async (dispatch, getState) => { // объявление санки на логаут
        const response = await apiProfile.deleteLogin() // отправка запроса на логаут
        if (response.resultCode === ResultCodeEnum.Success) { // если сессия успешно закрыта
            setTimeout( () => {

                dispatch( AuthActions.authInitialState() )// зануление авторизации при логауте

                dispatch( profileActions.profileInitialState() )// зануление профиля при логауте

                dispatch( UsersActions.usersInitialState() )// зануление Users при логауте

                dispatch( Dialog2Actions.setDialog2InitialState() )// зануление Dialog2 при логауте

            }, 300 )
        } else {
            console.log( response.messages ) // вывести в консоль сообщение ошибки логаута
        }
    };
}

export const getCaptchaThunkCreator = (): ComThunkTp<AuthActionTypes> => {//санкреатор на получение каптчи
    return async (dispatch, getState) => { // санка на получение каптчи
        const response2 = await apiProfile.getCaptcha() // запрос каптчи
        dispatch( AuthActions.setCaptchaURL( response2.url ) ) // получить данные с сервера авторизованного пользователя
    };
}

export default authReducer;










