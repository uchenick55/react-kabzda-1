import {apiProfile} from "../components/api/api";
import {stopSubmit} from "redux-form";
import {bedug_mode} from "./store-redux";
import {friendsInitialState, setFriends} from "./sidebar-reducer";
import {appInitialState} from "./app-reducer";
import {dialogsInitialState} from "./dialogs-reducer";
import {profileInitialState} from "./profile-reducer";
import {usersInitialState} from "./users-reducer";

const SET_MY_DATA = "myApp/auth-reducer/SET_MY_DATA"; // константа для задания базовых данных моего профиля (ID, Email, login, isAuth)
const SET_MY_PROFILE = "myApp/auth-reducer/SET_MY_PROFILE"; // константа задания расширенных данных моего профиля
const AUTH_INITIAL_STATE = "myApp/auth-reducer/AUTH_INITIAL_STATE"; //константа зануления при логауте

export let setAuthData = (id, email, login, isAuth) => { // экшн креатор задания моих ID, Email, login
    return {type: SET_MY_DATA, id, email, login, isAuth}
};
export let setMyProfile = (myProfile) => { // экшн креатор задания расширенных данных моего профиля
    return {type: SET_MY_PROFILE, myProfile}
};
export let authInitialState = () => { // экшн креатор зануления при логауте
    return {type: AUTH_INITIAL_STATE}
};

let initialState = { // стейт по умолчанию для моего профиля
    myID: null, // мой ID по умолчанию
    myEmail: null,// мой Email по умолчанию
    myLogin: null,// мой логин по умолчанию
    isAuth: false, // Флаг авторизации
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
            }
            if (bedug_mode) {console.log("auth-reducer.jsx, SET_MY_DATA: ", state, stateCopy)} // дебаг

            return stateCopy; // возврат копии стейта после изменения
        case SET_MY_PROFILE: // экшн задания моего расширенного профиля
            stateCopy = {
                ...state,
                myProfile: action.myProfile
            }
            if (bedug_mode) {console.log("auth-reducer.jsx, SET_MY_PROFILE: ", state, stateCopy)} // дебаг
            return stateCopy; // возврат копии стейта после изменения
        case AUTH_INITIAL_STATE: // экшн зануления при логауте
            stateCopy = initialState
            if (bedug_mode) {console.log("auth-reducer.jsx, AUTH_INITIAL_STATE: ", state, stateCopy)} // дебаг
            return stateCopy; // возврат копии стейта после изменения
        default:
            return state; // по умолчанию стейт возврашается неизмененным
    }
}

export let getAuthMeThunkCreator = () => {//санкреатор я авторизован?. Данных для запроса нет
    let getAuthMeThunk = async (dispatch) => {
        const response1 = await apiProfile.getAuthMe() // я авторизован?
        if (response1.resultCode === 0) { //если я авторизован
            let id = response1.data.id; // записать с стейт мой ID
            let email = response1.data.email; // записать с стейт мой емейл
            let login = response1.data.login; // записать с стейт мой логин
            let isAuth = true; // отметить что а авторизован
            if (bedug_mode) {console.log("auth-reducer.jsx, getAuthMeThunkCreator.await getAuthMe() : dispatch(setAuthData)->SET_MY_DATA  (пользователь авторизован)" )} // дебаг
            dispatch(setAuthData(id, email, login, isAuth))//задание в стейт текущего пользователя
            const response2 = await apiProfile.getProfile(id)//получение моих дополнительных данных после авторизации
            if (bedug_mode) {console.log("auth-reducer.jsx, getAuthMeThunkCreator.await(getAuthMe)->await .getProfile() : dispatch(setMyProfile()->SET_MY_PROFILE" )} // дебаг
            dispatch(setMyProfile(response2))//задание в стейт моих доп данных
        }
        if (!response1.resultCode == 0) { //пользователь не авторизован
            let id = initialState.userID; // занулить в стейте мой ID
            let email = initialState.email;// занулить в стейте мой email
            let login = initialState.login;// занулить в стейте мой логин
            let isAuth = false; // занулить флаг авторизации
            if (bedug_mode) {console.log("auth-reducer.jsx, getAuthMeThunkCreator.await getAuthMe() : dispatch(setAuthData)->SET_MY_DATA (пользователь не авторизован)" )} // дебаг
            dispatch(setAuthData(id, email, login, isAuth))//задание в стейт зануленных значений если пользователь не авторизован
        }
    }
    return getAuthMeThunk;
}
export let postLoginThunkCreator = (email, password, rememberme) => {//санкреатор на логин
    let postLoginThunk = async (dispatch) => { // объявление санки на логин
        const response = await apiProfile.postLogin(email, password, rememberme) // отправка данных на авторизацию из формы логина
        if (response.resultCode === 0) { // если успешная авторизация на сервере
            if (bedug_mode) {console.log("auth-reducer.jsx, postLoginThunkCreator.await .postLogin(): dispatch(getAuthMeThunkCreator())" )} // дебаг
            dispatch(getAuthMeThunkCreator()) // получить данные с сервера авторизованного пользователя
        } else { // если логин или пароль не подошли
            let message =  // определение локальной переменной message - ответ от сервера
                !response.messages[0] // если ответа от сервера нет
                    ? "no responce from server" // вывести сообщение заглушку
                    : response.messages[0] // иначе вывести ответ от сервера
            let action = stopSubmit("loginForm", {_error: message})
            // loginForm это наша форма логина.
            // объект _error является общей ошибкой для всей формы с сообщением message
            if (bedug_mode) {console.log("auth-reducer.jsx, postLoginThunkCreator.await / если логин или пароль не подошли: dispatch(action) // отправить данные в форму" )} // дебаг
            dispatch(action) // отправить данные в форму
        }
    }
    return postLoginThunk;
}
export let deleteLoginThunkCreator = () => {//санкреатор на логАут
    let deleteLoginThunk = async (dispatch) => { // объявление санки на логаут
        const response = await apiProfile.deleteLogin() // отправка запроса на логаут
        if (response.resultCode === 0) { // если сессия успешно закрыта
            setTimeout(()=>{

                if (bedug_mode) {console.log("auth-reducer.jsx, deleteLoginThunkCreator.await .deleteLogin():dispatch(dialogsInitialState())->DIALOGS_INITIAL_STATE" )} // дебаг
                dispatch(dialogsInitialState())// зануление диалогов при логауте

                if (bedug_mode) {console.log("auth-reducer.jsx, deleteLoginThunkCreator.await .deleteLogin():dispatch(authInitialState())->AUTH_INITIAL_STATE" )} // дебаг
                dispatch(authInitialState())// зануление авторизации при логауте

                if (bedug_mode) {console.log("auth-reducer.jsx, deleteLoginThunkCreator.await .deleteLogin():dispatch(profileInitialState())->PROFILE_INITIAL_STATE" )} // дебаг
                dispatch(profileInitialState())// зануление профиля при логауте


                if (bedug_mode) {console.log("auth-reducer.jsx, deleteLoginThunkCreator.await .deleteLogin():dispatch(friendsInitialState())->FRIENDS_INITIAL_STATE" )} // дебаг
                dispatch(friendsInitialState())// зануление FriendList при логауте

                if (bedug_mode) {console.log("auth-reducer.jsx, deleteLoginThunkCreator.await .deleteLogin():dispatch(usersInitialState())->USERS_INITIAL_STATE" )} // дебаг
                dispatch(usersInitialState())// зануление Users при логауте

            },300)
           // sdfsadfsaf



        } else {// пока еще не придумал
        }
    }
    return deleteLoginThunk;
}

export default authReducer;










