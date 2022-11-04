import {apiProfile} from "../components/api/api";
import {stopSubmit} from "redux-form";

const SET_MY_DATA = "SET_MY_DATA"; // константа для задания базовых данных моего профиля (ID, Email, login, isAuth)
const SET_MY_PROFILE = "SET_MY_PROFILE"; // константа задания расширенных данных моего профиля

export let setAuthData = (id, email, login, isAuth) => { // экшн креатор задания моих ID, Email, login
    return {type: SET_MY_DATA, id, email, login, isAuth}
};
export let setMyProfile = (myProfile) => { // экшн креатор задания расширенных данных моего профиля
    return {type: SET_MY_PROFILE, myProfile}
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

export let getAuthMeThunkCreator = () => {//санкреатор я авторизован?. Данных для запроса нет
    let getAuthMeThunk = async (dispatch) => {
        const response1 = await apiProfile.getAuthMe() // я авторизован?
        if (response1.resultCode === 0) { //если я авторизован
            let id = response1.data.id; // записать с стейт мой ID
            let email = response1.data.email; // записать с стейт мой емейл
            let login = response1.data.login; // записать с стейт мой логин
            let isAuth = true; // отметить что а авторизован
            dispatch(setAuthData(id, email, login, isAuth))//задание в стейт текущего пользователя
            const response2 = await apiProfile.getProfile(id)//получение моих дополнительных данных после авторизации
            dispatch(setMyProfile(response2))//задание в стейт моих доп данных
        }
        if (!response1.resultCode == 0) { //пользователь не авторизован
            let id = initialState.userID; // занулить в стейте мой ID
            let email = initialState.email;// занулить в стейте мой email
            let login = initialState.login;// занулить в стейте мой логин
            let isAuth = false; // занулить флаг авторизации
            dispatch(setAuthData(id, email, login, isAuth))//задание в стейт зануленных значений если пользователь не авторизован
        }
    }
    return getAuthMeThunk;
}
export let postLoginThunkCreator = (email, password, rememberme) => {//санкреатор на логин
    let postLoginThunk = async (dispatch) => { // объявление санки на логин
        const response = await apiProfile.postLogin(email, password, rememberme) // отправка данных на авторизацию из формы логина
        if (response.resultCode === 0) { // если успешная авторизация на сервере
            dispatch(getAuthMeThunkCreator()) // получить данные с сервера авторизованного пользователя
        } else { // если логин или пароль не подошли
            let message =  // определение локальной переменной message - ответ от сервера
                !response.messages[0] // если ответа от сервера нет
                    ? "no responce from server" // вывести сообщение заглушку
                    : response.messages[0] // иначе вывести ответ от сервера
            let action = stopSubmit("loginForm", {_error: message})
            // loginForm это наша форма логина.
            // объект _error является общей ошибкой для всей формы с сообщением message
            dispatch(action) // отправить данные в форму
        }
    }
    return postLoginThunk;
}
export let deleteLoginThunkCreator = () => {//санкреатор на логАут
    let deleteLoginThunk = async (dispatch) => { // объявление санки на логаут
        const response = await apiProfile.deleteLogin() // отправка запроса на логаут
        if (response.resultCode === 0) { // если сессия успешно закрыта
            dispatch(getAuthMeThunkCreator()) // проверка авторизации и зануление стейта
        } else {// пока еще не придумал
        }
    }
    return deleteLoginThunk;
}

export default authReducer;









