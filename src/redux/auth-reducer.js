import {getAuthMe, getProfile} from "../components/api/api";

const SET_USER_DATA = "SET_USER_DATA";
const SET_USER_PROFILE = "SET_USER_PROFILE";

export let setAuthUserData = (id, email, login) => {
    return {type: SET_USER_DATA, id, email, login}
};
export let setUserProfile = (profile) => {
    return {type: SET_USER_PROFILE, profile}
};

let initialState = {
    userID: null,
    email: null,
    login: null,
    isAuth: false,
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
                isAuth: true,
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
                if (response.resultCode === 0) { //успешный ответ?
                    let id = response.data.id;
                    let email = response.data.email;
                    let login = response.data.login;
                    dispatch(setAuthUserData(id, email, login))//задание в стейт текущего пользователя
                    getProfile(id)//получение данных текущего пользователя
                        .then((response) => {
                            dispatch(setUserProfile(response))//задание в стейт доп данных текущего пользователя
                        })

                }
            })
    }
    return getAuthMeThunk;
}
export default authReducer;










