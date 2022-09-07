import {getAuthMe, getProfile} from "../components/api/api";

const SET_USER_DATA = "SET_USER_DATA";
const SET_USER_PROFILE = "SET_USER_PROFILE";

export let setAuthUserData = (id, email, login, sentRequestIsAuth, isAuth) => {
    return {type: SET_USER_DATA, id, email, login, sentRequestIsAuth, isAuth}
};
export let setUserProfile = (profile) => {
    return {type: SET_USER_PROFILE, profile}
};

let initialState = {
    userID: null,
    email: null,
    login: null,
    isAuth: false, //
    sentRequestIsAuth: false, // проверка, что запрос авторизации на сервер проводился
    profile: null
}

let authReducer = (state = initialState, action) => {
    let stateCopy;
    switch (action.type) {
        case SET_USER_DATA:
            stateCopy = {
                ...state,
                userID: action.id,
                email: action.email,
                login: action.login,
                isAuth: action.isAuth,
                sentRequestIsAuth: action.sentRequestIsAuth,
            }
            return stateCopy;
        case SET_USER_PROFILE:
            stateCopy = {
                ...state,
                profile: action.profile
            }
            return stateCopy;
        default:
            return state;
    }
}

export let getAuthMeThunkCreator = () =>{//санкреатор я авторизован?. Данных для запроса нет
    let getAuthMeThunk = (dispatch) => {
        getAuthMe() // я авторизован?
            .then((response) => {
                if (response.resultCode === 0) { //пользователь авторизован
                    let id = response.data.id;
                    let email = response.data.email;
                    let login = response.data.login;
                    let sentRequestIsAuth = true;
                    let isAuth = true;
                    dispatch(setAuthUserData(id, email, login, sentRequestIsAuth, isAuth))//задание в стейт текущего пользователя
                    getProfile(id)//получение данных текущего пользователя
                        .then((response) => {
                            dispatch(setUserProfile(response))//задание в стейт доп данных текущего пользователя
                        })
                }
                if (!response.resultCode == 0) { //пользователь не авторизован
                    let id = initialState.userID;
                    let email = initialState.email;
                    let login = initialState.login;
                    let sentRequestIsAuth = true; // запрос авторизации был, но пользователь не авторизован
                    let isAuth = false;
                    dispatch(setAuthUserData(id, email, login, sentRequestIsAuth, isAuth))//задание в стейт текущего пользователя
                }
            })
    }
    return getAuthMeThunk;
}
export default authReducer;










