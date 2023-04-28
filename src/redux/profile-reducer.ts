import {apiProfile} from "../components/api/api";
import {getAuthMeThunkCreator, SET_MY_PROFILE, setMyProfile} from "./auth-reducer";
import {updateDialogListThunkCreator} from "./dialogs-reducer";
import {NulableType, postsType, ProfileType} from "../types/commonTypes";
import {ThunkAction} from "redux-thunk";
import {GlobalStateType} from "./store-redux";
import {getProfileType} from "../components/api/apiTypes";
import {ResultCodeEnum} from "../components/api/enum";
import {inferStringLiteral} from "./inferLiteral";

type setMyProfileActionType = { type: typeof SET_MY_PROFILE, myProfile: getProfileType }

const SET_EDIT_PROFILE_ERROR = "myApp/auth-reducer/SET_EDIT_PROFILE_ERROR"; //константа задания ошибки правеки профиля
const DELETE_POST = "myApp/profile-reducer/DELETE_POST";// константа удаления новых постов
const ADD_POST = "myApp/profile-reducer/ADD-POST";// константа отправки новых постов
const SET_USER_PROFILE = "myApp/profile-reducer/SET_USER_PROFILE"; // константа задания в локальный стейт профиля просматриваемого пользователя
const SET_STATUS = "myApp/profile-reducer/SET_STATUS" // константа задания моего статуса
export const PROFILE_INITIAL_STATE = "myApp/profile-reducer/PROFILE_INITIAL_STATE" // константа зануления при логауте
const SET_PROFILE_PHOTO = "myApp/profile-reducer/SET_PROFILE_PHOTO" // константа задания фото профиля

export const ProfileActions = {
     setEditProfileStatus: (editProfileStatus: Array<string>) => { // экшн креатор задания ошибки с сервера в стейт после правки профиля
        return {type: inferStringLiteral( SET_EDIT_PROFILE_ERROR ), editProfileStatus}
    },

    deletePostActionCreator: (postId: number) => { // экшнкреатор удаления поста по postId
        return {type: inferStringLiteral( DELETE_POST ), postId}
    },

    addPostActionCreator: (newPostData: string) => { // экшнкреатор добавления поста
        return {type: inferStringLiteral( ADD_POST ), newPostData}
    },

    setUserProfile: (profile: getProfileType) => { // экшнкреатор задания в локальный стейт профиля просматриваемого пользователя
        return {type: inferStringLiteral( SET_USER_PROFILE ), profile}
    },

    setStatus: (newStatus: string) => { //экшнкреатор задания моего статуса (после API запроса)
        return {type: inferStringLiteral( SET_STATUS ), newStatus}
    },

    profileInitialState: () => { //экшнкреатор зануления при логауте
        return {type: inferStringLiteral( PROFILE_INITIAL_STATE )}
    },

    setProfilePhoto: () => { //экшнкреатор задания фото профиля
        return {type: inferStringLiteral( SET_PROFILE_PHOTO )}
    }

}


type ActionTypes =
    ReturnType<typeof ProfileActions.setProfilePhoto> | ReturnType<typeof ProfileActions.profileInitialState> |
    ReturnType<typeof ProfileActions.setStatus> | ReturnType<typeof ProfileActions.setUserProfile> |
    ReturnType<typeof ProfileActions.addPostActionCreator> | ReturnType<typeof ProfileActions.deletePostActionCreator> |
    ReturnType<typeof ProfileActions.setEditProfileStatus> | setMyProfileActionType

let initialState = {
    posts: [// заглушка постов на странице профиля
        {id: 1, message: "state 2 Hi, how are you?", like: 12},
        {id: 2, message: "state 2 it's, my first post", like: 15},
    ] as Array<postsType>,
    profile: null as NulableType<getProfileType>, // нулевой профиль просматриваемого пользователя по умолчанию
    status: "", // нулевой статус просматриваемого пользователя по умолчанию
    editProfileStatus: [] as Array<string>, // список ошибок правки формы профиля с сервера
}

type initialStateType = typeof initialState

export const profileReducer = (state: initialStateType = initialState, action: ActionTypes): initialStateType => { // редьюсер профиля
    let stateCopy: initialStateType; // объявлениечасти части стейта до изменения редьюсером
    switch (action.type) {
        case SET_USER_PROFILE: // задание в локальный стейт профиля просматриваемого пользователя
            stateCopy = {
                ...state,
                profile: action.profile // профиль выбранного пользователя с сервера
            }
            return stateCopy;
        case ADD_POST: {// добавление поста
            const newPost: postsType = { // задание локального объекта с постом
                id: 5, // id сообщения в постах (заглушка)
                message: action.newPostData, // сообщение введенное в форме диалогов
                like: 2 // лайки сообщений (заглушка)
            };
            stateCopy = {
                ...state,
                posts: [...state.posts, newPost], // добавление созданного локального объекта в посты
            }
            return stateCopy;

        }
        case DELETE_POST: {// удаления поста по postId
            stateCopy = {
                ...state,
                posts: [...state.posts.filter( f => f.id !== action.postId )], // удаление локального объекта в постах
            }
            return stateCopy;
        }
        case SET_STATUS: //задание моего статуса в локальный стейт (после API запроса)
            stateCopy = {
                ...state,
                status: action.newStatus
            }
            return stateCopy;
        case PROFILE_INITIAL_STATE: //зануления при логауте
            stateCopy = initialState
            return stateCopy;
        case SET_EDIT_PROFILE_ERROR: // экшн задания ошибки с сервера в стейт после правки профиля
            stateCopy = {
                ...state,
                editProfileStatus: action.editProfileStatus
            }
            return stateCopy; // возврат копии стейта после изменения
        default:
            return state;
    }
}

type ThunkType = ThunkAction<void,    // санка ничего не возвращает
    GlobalStateType,    // глобальный стейт из redux
    unknown,    // нет доп параметров
    ActionTypes // все типы ActionCreator
    >


export const getProfileThunkCreator = (userId: number, shouldUpdateDialogList: boolean, myId: number): ThunkType => { // санкреатор на получение профиля выбранного пользователя
    return async (dispatch, getState) => { // нонейм санка на получение профиля выбранного пользователя
        const CommonPart = (response: getProfileType, userId: number) => { // общая часть для задания статуса профиля и получения статуса
            dispatch( ProfileActions.setUserProfile( response ) ) // задание полных данных в профиль
            dispatch( getStatusThunkCreator( userId ) ) // запрос моего статуса
            if (shouldUpdateDialogList) {// проверка нужно ли обновить диалоглист
                dispatch( updateDialogListThunkCreator( myId, response.userId, response.fullName, response.photos.small ) ) // обновление длиалоглиста
            }
        }

        if (!userId) { // если userId не задан в URL (переход на страницу моего профиля не подставляет ID в браузере)
            const response = await apiProfile.getAuthMe() // запрос на сервер "я авторизован?" чтобы получить мой ID (авторизованного пользователя)
            if (response.resultCode === ResultCodeEnum.Success) { // успешное получение с сервера данных о моем ID
                userId = response.data.id; // задание моего ID в userId
                const response2 = await apiProfile.getProfile( userId ) // получение полных данных о моем профиле
                CommonPart( response2, userId )  // общая часть для задания статуса профиля и получения статуса
            }
        } else { // если userId задан в URL
            const response = await apiProfile.getProfile( userId ) //
            CommonPart( response, userId ) // общая часть для задания статуса профиля и получения статуса
        }
    }
}

export const getStatusThunkCreator = (userId: number): ThunkType => {  // санкреатор запроса статуса выбранного пользователя
    return async (dispatch, getState) => { // нонейм санка запроса статуса выбранного пользователя
        const response = await apiProfile.getStatus( userId ) // api запрос получение статуса по userId
        dispatch( ProfileActions.setStatus( response ) ) // задание статуса в локальный стейт с последующей переотрисовкой
    }
}
export const putStatusThunkCreator = (statusTmpInput: string, myId: number): ThunkType => { // санкреатор обновления моего статуса
    return async (dispatch, getState) => { // нонеййм санка обновления моего статуса
        const response = await apiProfile.putStatus( statusTmpInput ) // отправка нового статуса на сервер
        if (response.resultCode === ResultCodeEnum.Success) { // если успешное обновление статуса с сервера
            dispatch( getStatusThunkCreator( myId ) )// получение нового статуса с сервера после обновления
        }
    }
}
export const setprofilePhotoThunkCreator = (profilePhoto: any, myId: number): ThunkType => { // санкреатор установки фотографии моего профиля
    return async (dispatch, getState) => { // нонеййм санка установки фотографии моего профиля
        const response = await apiProfile.putPhoto( profilePhoto ) // отправка нового фото на сервер
        if (response.resultCode === ResultCodeEnum.Success) { // если успешное обновление статуса с сервера
            dispatch( getProfileThunkCreator( myId, false, 0 ) );// перезапрашиваем данные профиля после обновления фото
            dispatch( getAuthMeThunkCreator() ) // обновить данные моего профиля (header photo) при обновлении фото
        }
    }
}

export const putMyProfileThunkCreator = (MyProfile: ProfileType, myId: number): ThunkType => { // санкреатор установки моего профиля myProfile
    return async (dispatch, getState) => { // нонеййм санка установки моего профиля myProfile
        const response = await apiProfile.putMyProfileData( MyProfile ) // отправка нового статуса на сервер
        if (response.resultCode === ResultCodeEnum.Success) { // если успешное обновление профиля на сервере
            const response2 = await apiProfile.getProfile( myId )//получение моих дополнительных данных после записи на сервер
            dispatch( setMyProfile( response2 ) )//задание в стейт моих доп данных
            dispatch( getProfileThunkCreator( myId, false, 0 ) )
            dispatch( ProfileActions.setEditProfileStatus( ["Edited successfully!"] ) ) // отправить данные ошибки в стейт
        } else { // если пришла ошибка с сервера ввода формы правки профиля
            const message =  // определение локальной переменной message - ответ от сервера
                response.messages && response.messages.length !== 0  // если response.messages емсть и их длина не равна 0
                    ? response.messages //  вывести ответ от сервера
                    : ["no responce from server"] // иначе вывести сообщение заглушку
            dispatch( ProfileActions.setEditProfileStatus( message ) ) // отправить данные ошибки в стейт
        }
    }
}


export default profileReducer;










