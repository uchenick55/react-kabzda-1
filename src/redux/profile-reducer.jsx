import {apiProfile} from "../components/api/api";
import {state_copy_for_debug} from "./store-redux";

const DELETE_POST = "myApp/profile-reducer/DELETE_POST";// константа удаления новых постов
const ADD_POST = "myApp/profile-reducer/ADD-POST";// константа отправки новых постов
const SET_USER_PROFILE = "myApp/profile-reducer/SET_USER_PROFILE"; // константа задания в локальный стейт профиля просматриваемого пользователя
const SET_STATUS = "myApp/profile-reducer/SET_STATUS" // константа задания моего статуса


export let deletePostActionCreator = (postId) => { // экшнкреатор удаления поста по postId
    return {type: DELETE_POST, postId}
};
export let addPostActionCreator = (newPostData) => { // экшнкреатор добавления поста
    return {type: ADD_POST, newPostData}
};
let setUserProfile = (profile) => { // экшнкреатор задания в локальный стейт профиля просматриваемого пользователя
    return {type: SET_USER_PROFILE, profile}
};
export let setStatus = (newStatus) => { //экшнкреатор задания моего статуса (после API запроса)
    return {type: SET_STATUS, newStatus}
};
let initialState = {
    posts: [// заглушка постов на странице профиля
        {id: 1, message: "state 2 Hi, how are you?", like: "12"},
        {id: 2, message: "state 2 it's, my first post", like: "15"},
    ],
    profile: null, // нулевой профиль просматриваемого пользователя по умолчанию
    status: null, // нулевой статус просматриваемого пользователя по умолчанию
}
export let profileReducer = (state = initialState, action) => { // редьюсер профиля
    let stateCopy; // объявлениечасти части стейта до изменения редьюсером
    switch (action.type) {
        case SET_USER_PROFILE: // задание в локальный стейт профиля просматриваемого пользователя
            stateCopy = {
                ...state,
                profile: action.profile // профиль выбранного пользователя с сервера
            }
            return stateCopy;
        case ADD_POST: {// добавление поста
            let newPost = { // задание локального объекта с постом
                id: 5, // id сообщения в постах (заглушка)
                message: action.newPostData, // сообщение введенное в форме диалогов
                like: 2 // лайки сообщений (заглушка)
            };
            return {
                ...state,
                posts: [...state.posts, newPost], // добавление созданного локального объекта в посты
            }
        }
        case DELETE_POST: {// удаления поста по postId
            return {
                ...state,
                posts: [...state.posts.filter(f=>f.id!==action.postId)], // удаление локального объекта в постах
            }
        }
        case SET_STATUS: //задание моего статуса в локальный стейт (после API запроса)
            stateCopy = {
                ...state,
                status: action.newStatus
            }
            return stateCopy;

        default:
            return state;
    }
}

export let getProfileThunkCreator = (userId) => { // санкреатор на получение профиля выбранного пользователя
    return async (dispatch) => { // нонейм санка на получение профиля выбранного пользователя
        if (!userId) { // если userId не задан в URL (переход на страницу моего профиля не подставляет ID в браузере)
            const response = await apiProfile.getAuthMe() // запрос на сервер "я авторизован?" чтобы получить мой ID (авторизованного пользователя)
            if (response.resultCode === 0) { // успешное получение с сервера данных о моем ID
                userId = response.data.id; // задание моего ID в userId
                const response2 = await apiProfile.getProfile(userId) // получение полных данных о моем профиле
                dispatch(setUserProfile(response2)) // задание полных этих данных в профиль
                dispatch(getStatusThunkCreator(userId)) // запрос моего статуса
            }
        } else { // если userId задан в URL
            const response = await apiProfile.getProfile(userId) //
            dispatch(setUserProfile(response)) // получение полных данных о профиле выбранного пользователе
            dispatch(getStatusThunkCreator(userId))  // запрос статуса выбранного пользователя
        }
    }
}

export let getStatusThunkCreator = (userId) => {  // санкреатор запроса статуса выбранного пользователя
    return async (dispatch) => { // нонейм санка запроса статуса выбранного пользователя
        const response = await apiProfile.getStatus(userId) // api запрос получение статуса по userId
        dispatch(setStatus(response)) // задание статуса в локальный стейт с последующей переотрисовкой
    }
}
export let putStatusThunkCreator = (statusTmpInput, myId) => { // санкреатор обновления моего статуса
    return async (dispatch) => { // нонеййм санка обновления моего статуса
        const response = await apiProfile.putStatus(statusTmpInput) // отправка нового статуса на сервер
        if (response.resultCode === 0) { // если успешное обновление статуса с сервера
            dispatch(getStatusThunkCreator(myId))// получение нового статуса с сервера после обновления
        }
    }
}

export default profileReducer;










