import {apiProfile} from "../components/api/api";
import {bedug_mode} from "./store-redux";
import {getAuthMeThunkCreator} from "./auth-reducer";

const DELETE_POST = "myApp/profile-reducer/DELETE_POST";// константа удаления новых постов
const ADD_POST = "myApp/profile-reducer/ADD-POST";// константа отправки новых постов
const SET_USER_PROFILE = "myApp/profile-reducer/SET_USER_PROFILE"; // константа задания в локальный стейт профиля просматриваемого пользователя
const SET_STATUS = "myApp/profile-reducer/SET_STATUS" // константа задания моего статуса
const PROFILE_INITIAL_STATE = "myApp/profile-reducer/PROFILE_INITIAL_STATE" // константа зануления при логауте
const SET_PROFILE_PHOTO = "myApp/profile-reducer/SET_PROFILE_PHOTO" // константа задания фото профиля


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
export let profileInitialState = () => { //экшнкреатор зануления при логауте
    return {type: PROFILE_INITIAL_STATE}
};
export let setProfilePhoto = () => { //экшнкреатор задания фото профиля
    return {type: SET_PROFILE_PHOTO}
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
            if (bedug_mode) {console.log("profile-reducer.jsx, SET_USER_PROFILE: ", state, stateCopy)} // дебаг
            return stateCopy;
        case ADD_POST: {// добавление поста
            let newPost = { // задание локального объекта с постом
                id: 5, // id сообщения в постах (заглушка)
                message: action.newPostData, // сообщение введенное в форме диалогов
                like: 2 // лайки сообщений (заглушка)
            };
            stateCopy = {
                ...state,
                posts: [...state.posts, newPost], // добавление созданного локального объекта в посты
            }
            if (bedug_mode) {console.log("profile-reducer.jsx, ADD_POST: ", state, stateCopy)} // дебаг
            return stateCopy;
        }
        case DELETE_POST: {// удаления поста по postId
            stateCopy = {
                ...state,
                posts: [...state.posts.filter(f=>f.id!==action.postId)], // удаление локального объекта в постах
            }
            if (bedug_mode) {console.log("profile-reducer.jsx, DELETE_POST: ", state, stateCopy)} // дебаг
            return stateCopy;
        }
        case SET_STATUS: //задание моего статуса в локальный стейт (после API запроса)
            stateCopy = {
                ...state,
                status: action.newStatus
            }
            if (bedug_mode) {console.log("profile-reducer.jsx, SET_STATUS: ", state, stateCopy)} // дебаг
            return stateCopy;
        case PROFILE_INITIAL_STATE: //зануления при логауте
            stateCopy = initialState
            if (bedug_mode) {console.log("profile-reducer.jsx, PROFILE_INITIAL_STATE: ", state, stateCopy)} // дебаг
            return stateCopy;
        default:
            return state;
    }
}

export let getProfileThunkCreator = (userId) => { // санкреатор на получение профиля выбранного пользователя
    return async (dispatch) => { // нонейм санка на получение профиля выбранного пользователя

        let CommonPart = (response, userId) => { // общая часть для задания статуса профиля и получения статуса
            if (bedug_mode) {console.log("profile-reducer.jsx, getProfileThunkCreator.await getAuthMe()->await .getProfile() :   dispatch(setUserProfile()) ->SET_USER_PROFILE" )} // дебаг
            dispatch(setUserProfile(response)) // задание полных данных в профиль
            if (bedug_mode) {console.log("profile-reducer.jsx, getProfileThunkCreator.await getAuthMe()->await .getProfile() :   dispatch(getStatusThunkCreator())" )} // дебаг
            dispatch(getStatusThunkCreator(userId)) // запрос моего статуса
        }

        if (!userId) { // если userId не задан в URL (переход на страницу моего профиля не подставляет ID в браузере)
            const response = await apiProfile.getAuthMe() // запрос на сервер "я авторизован?" чтобы получить мой ID (авторизованного пользователя)
            if (response.resultCode === 0) { // успешное получение с сервера данных о моем ID
                userId = response.data.id; // задание моего ID в userId
                const response2 = await apiProfile.getProfile(userId) // получение полных данных о моем профиле
                CommonPart(response2, userId)  // общая часть для задания статуса профиля и получения статуса
            }
        } else { // если userId задан в URL
            const response = await apiProfile.getProfile(userId) //
            CommonPart(response, userId) // общая часть для задания статуса профиля и получения статуса
        }
    }
}

export let getStatusThunkCreator = (userId) => {  // санкреатор запроса статуса выбранного пользователя
    return async (dispatch) => { // нонейм санка запроса статуса выбранного пользователя
        const response = await apiProfile.getStatus(userId) // api запрос получение статуса по userId
        if (bedug_mode) {console.log("profile-reducer.jsx, getStatusThunkCreator.await getStatus(): dispatch(setStatus()) -> SET_STATUS" )} // дебаг
        dispatch(setStatus(response)) // задание статуса в локальный стейт с последующей переотрисовкой
    }
}
export let putStatusThunkCreator = (statusTmpInput, myId) => { // санкреатор обновления моего статуса
    return async (dispatch) => { // нонеййм санка обновления моего статуса
        const response = await apiProfile.putStatus(statusTmpInput) // отправка нового статуса на сервер
        if (response.resultCode === 0) { // если успешное обновление статуса с сервера
            if (bedug_mode) {console.log("profile-reducer.jsx, putStatusThunkCreator.await putStatus(): dispatch(getStatusThunkCreator())" )} // дебаг
            dispatch(getStatusThunkCreator(myId))// получение нового статуса с сервера после обновления
        }
    }
}
export let setprofilePhotoThunkCreator = (profilePhoto, myId) => { // санкреатор установки фотографии моего профиля
    return async (dispatch) => { // нонеййм санка установки фотографии моего профиля
        const response = await apiProfile.putPhoto(profilePhoto) // отправка нового статуса на сервер
        if (response.resultCode === 0) { // если успешное обновление статуса с сервера
            if (bedug_mode) {console.log("profile-reducer.jsx, setprofilePhotoThunkCreator.await putPhoto(): dispatch(getProfileThunkCreator())" )} // дебаг
            dispatch(getProfileThunkCreator(myId));// перезапрашиваем данные профиля после обновления фото
            dispatch(getAuthMeThunkCreator()) // обновить данные моего профиля (header photo) при обновлении фото
        }
    }
}

export default profileReducer;










