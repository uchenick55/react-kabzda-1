import {apiProfile} from "../components/api/api";

const SET_MY_DATA = "SET_MY_DATA";
const SET_MY_PROFILE = "SET_MY_PROFILE";

export let setAuthData = (id, email, login, sentRequestIsAuth, isAuth) => {
    return {type: SET_MY_DATA, id, email, login, sentRequestIsAuth, isAuth}
};
export let setMyProfile = (myProfile) => {
    return {type: SET_MY_PROFILE, myProfile}
};

let initialState = {
    myID: null,
    myEmail: null,
    myLogin: null,
    isAuth: false, //
    sentRequestIsAuth: false, // проверка, что запрос авторизации на сервер проводился
    myProfile: null
}

let authReducer = (state = initialState, action) => {
    let stateCopy;
    switch (action.type) {
        case SET_MY_DATA:
            stateCopy = {
                ...state,
                myID: action.id,
                myEmail: action.email,
                myLogin: action.login,
                isAuth: action.isAuth,
                sentRequestIsAuth: action.sentRequestIsAuth,
            }
            return stateCopy;
        case SET_MY_PROFILE:
            stateCopy = {
                ...state,
                myProfile: action.myProfile
            }
            return stateCopy;
        default:
            return state;
    }
}

export let getAuthMeThunkCreator = () =>{//санкреатор я авторизован?. Данных для запроса нет
    let getAuthMeThunk = (dispatch) => {
        apiProfile.getAuthMe() // я авторизован?
            .then((response) => {
                if (response.resultCode === 0) { //пользователь авторизован
                    let id = response.data.id;
                    let email = response.data.email;
                    let login = response.data.login;
                    let sentRequestIsAuth = true;
                    let isAuth = true;
                    dispatch(setAuthData(id, email, login, sentRequestIsAuth, isAuth))//задание в стейт текущего пользователя
                    apiProfile.getProfile(id)//получение данных текущего пользователя
                        .then((response) => {
                            dispatch(setMyProfile(response))//задание в стейт доп данных текущего пользователя
                        })
                }
                if (!response.resultCode == 0) { //пользователь не авторизован
                    let id = initialState.userID;
                    let email = initialState.email;
                    let login = initialState.login;
                    let sentRequestIsAuth = true; // запрос авторизации был, но пользователь не авторизован
                    let isAuth = false;
                    dispatch(setAuthData(id, email, login, sentRequestIsAuth, isAuth))//задание в стейт текущего пользователя
                }
            })
    }
    return getAuthMeThunk;
}
export let postLoginThunkCreator = (email, password, rememberme) =>{//санкреатор на логин
    let postLoginThunk = (dispatch) => {
        apiProfile.postLogin(email, password, rememberme) // отправка данных на авторизацию
            .then((response) => {
                if (response.resultCode ===0) { // если успешное обновление статуса с сервера
                    dispatch(getAuthMeThunkCreator()) // проверка авторизации
                } else {
                }
            })
    }
    return postLoginThunk;
}
export let deleteLoginThunkCreator = () =>{//санкреатор на логАут
    let deleteLoginThunk = (dispatch) => {
        apiProfile.deleteLogin() // отправка данных на авторизацию
            .then((response) => {
                if (response.resultCode ===0) { // если успешное обновление статуса с сервера (сессия закрыта)
                    dispatch(getAuthMeThunkCreator()) // проверка авторизации и зануление стейта
                } else {
                }
            })
    }
    return deleteLoginThunk;
}
export default authReducer;










