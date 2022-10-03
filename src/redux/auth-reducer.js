import {apiProfile} from "../components/api/api";
import {stopSubmit} from "redux-form";

const SET_MY_DATA = "SET_MY_DATA"; // константа для задания базовых данных моего профиля (ID, Email, login, isAuth)
const SET_MY_PROFILE = "SET_MY_PROFILE"; // константа задания расширенных данных моего профиля

export let setAuthData = (id, email, login, sentRequestIsAuth, isAuth) => { // экшн креатор задания моих ID, Email, login
    return {type: SET_MY_DATA, id, email, login, sentRequestIsAuth, isAuth}
};
export let setMyProfile = (myProfile) => { // экшн креатор задания расширенных данных моего профиля
    return {type: SET_MY_PROFILE, myProfile}
};

let initialState = { // стейт по умолчанию для моего профиля
    myID: null, // мой ID по умолчанию
    myEmail: null,// мой Email по умолчанию
    myLogin: null,// мой логин по умолчанию
    isAuth: false, // Флаг авторизации
    sentRequestIsAuth: false, // проверка, что запрос авторизации на сервер проводился, независимо от результата
    myProfile: null // мой расширенный профиль по умолчанию
}

let authReducer = (state = initialState, action) => { // редьюсер авторизации и моего профиля
    let stateCopy; // объявлениечасти части стейта до изменения редьюсером
    switch (action.type) {
        case SET_MY_DATA: // экшн задания моих id, email, login
            stateCopy = {
                ...state,
                myID: action.id,
                myEmail: action.email,
                myLogin: action.login,
                isAuth: action.isAuth,
                sentRequestIsAuth: action.sentRequestIsAuth,
            }
            return stateCopy; // возврат копии стейта после изменения
        case SET_MY_PROFILE: // экшн задания моего расширенного профиля
            stateCopy = {
                ...state,
                myProfile: action.myProfile
            }
            return stateCopy; // возврат копии стейта после изменения
        default:
            return state; // по умолчанию стейт возврашается неизмененным
    }
}

export let getAuthMeThunkCreator = () =>{//санкреатор я авторизован?. Данных для запроса нет
    let getAuthMeThunk = (dispatch) => {
        apiProfile.getAuthMe() // я авторизован?
            .then((response) => {
                if (response.resultCode === 0) { //если я авторизован
                    let id = response.data.id; // записать с стейт мой ID
                    let email = response.data.email; // записать с стейт мой емейл
                    let login = response.data.login; // записать с стейт мой логин
                    let sentRequestIsAuth = true;  // отметить что попытка авторизации была
                    let isAuth = true; // отметить что а авторизован
                    dispatch(setAuthData(id, email, login, sentRequestIsAuth, isAuth))//задание в стейт текущего пользователя
                    apiProfile.getProfile(id)//получение моих дополнительных данных после авторизации
                        .then((response) => {
                            dispatch(setMyProfile(response))//задание в стейт моих доп данных
                        })
                }
                if (!response.resultCode == 0) { //пользователь не авторизован
                    let id = initialState.userID; // занулить в стейте мой ID
                    let email = initialState.email;// занулить в стейте мой email
                    let login = initialState.login;// занулить в стейте мой логин
                    let sentRequestIsAuth = true; // запрос авторизации был, но пользователь не авторизован
                    let isAuth = false; // занулить флаг авторизации
                    dispatch(setAuthData(id, email, login, sentRequestIsAuth, isAuth))//задание в стейт зануленных значений если пользователь не авторизован
                }
            })
    }
    return getAuthMeThunk;
}
export let postLoginThunkCreator = (email, password, rememberme) =>{//санкреатор на логин
    let postLoginThunk = (dispatch) => { // объявление санки на логин
        apiProfile.postLogin(email, password, rememberme) // отправка данных на авторизацию из формы логина
            .then((response) => {
                if (response.resultCode ===0) { // если успешная авторизация на сервере
                    dispatch(getAuthMeThunkCreator()) // получить данные с сервера авторизованного пользователя
                } else { // если логин или пароль не подошли
                    let message =  // определение локальной переменной message - ответ от сервера
                        !response.messages[0] // если ответа от сервера нет
                            ?"no responce from server" // вывести сообщение заглушку
                            :response.messages[0] // иначе вывести ответ от сервера
                    let action = stopSubmit("loginForm", {_error: message})
                    // loginForm это наша форма логина.
                    // объект _error является общей ошибкой для всей формы с сообщением message
                    dispatch(action) // отправить данные в форму
                }
            })
    }
    return postLoginThunk;
}
export let deleteLoginThunkCreator = () =>{//санкреатор на логАут
    let deleteLoginThunk = (dispatch) => { // объявление санки на логаут
        apiProfile.deleteLogin() // отправка запроса на логаут
            .then((response) => {
                if (response.resultCode ===0) { // если сессия успешно закрыта
                    dispatch(getAuthMeThunkCreator()) // проверка авторизации и зануление стейта
                } else {// пока еще не придумал
                }
            })
    }
    return deleteLoginThunk;
}
export default authReducer;










