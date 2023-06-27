import {apiProfile} from "../components/api/api";
import {authActions} from "./auth-reducer";
import {ComThunkTp, NulableType, PostsType, ProfileType} from "../components/common/types/commonTypes";
import {InferActionsTypes} from "./store-redux";
import {GetProfileType} from "../components/api/apiTypes";
import {ResultCodeEnum} from "../components/api/enum";
import {appActions} from "./app-reducer";
import {saveDataToNotify} from "../components/common/functions/commonFunctions";

const SET_EDIT_PROFILE_ERROR = "myApp/auth-reducer/SET_EDIT_PROFILE_ERROR"; //константа задания ошибки правеки профиля
const DELETE_POST = "myApp/profile-reducer/DELETE_POST";// константа удаления новых постов
const ADD_POST = "myApp/profile-reducer/ADD-POST";// константа отправки новых постов
const SET_USER_PROFILE = "myApp/profile-reducer/SET_USER_PROFILE"; // константа задания в локальный стейт профиля просматриваемого пользователя
const SET_STATUS = "myApp/profile-reducer/SET_STATUS" // константа задания моего статуса
const PROFILE_INITIAL_STATE = "myApp/profile-reducer/PROFILE_INITIAL_STATE" // константа зануления при логауте

export const profileActions = {
    setEditProfileStatus: (editProfileStatus: Array<string>) => { // экшн креатор задания ошибки с сервера в стейт после правки профиля
        return {type: SET_EDIT_PROFILE_ERROR, editProfileStatus} as const
    },

    deletePostActionCreator: (postId: number) => { // экшнкреатор удаления поста по postId
        return {type: DELETE_POST, postId} as const
    },

    addPostActionCreator: (newPostData: string) => { // экшнкреатор добавления поста
        return {type: ADD_POST, newPostData} as const
    },

    setUserProfile: (profile: GetProfileType) => { // экшнкреатор задания в локальный стейт профиля просматриваемого пользователя
        return {type: SET_USER_PROFILE, profile} as const
    },

    setStatus: (newStatus: string) => { //экшнкреатор задания моего статуса (после API запроса)
        return {type: SET_STATUS, newStatus} as const
    },

    profileInitialState: () => { //экшнкреатор зануления при логауте
        return {type: PROFILE_INITIAL_STATE} as const
    },
}

type ProfileActionTypes = InferActionsTypes<typeof profileActions> | InferActionsTypes<typeof authActions>
    | InferActionsTypes<typeof appActions>

const initialState = {
    posts: [// заглушка постов на странице профиля
        {id: 1, message: "state 2 Hi, how are you?", like: 12},
        {id: 2, message: "state 2 it's, my first post", like: 15},
    ] as Array<PostsType>,
    profile: null as NulableType<GetProfileType>, // нулевой профиль просматриваемого пользователя по умолчанию
    status: "", // нулевой статус просматриваемого пользователя по умолчанию
    editProfileStatus: [] as Array<string>, // список ошибок правки формы профиля с сервера
}

type InitialStateType = typeof initialState

export const profileReducer = (state: InitialStateType = initialState, action: ProfileActionTypes): InitialStateType => { // редьюсер профиля
    let stateCopy: InitialStateType; // объявлениечасти части стейта до изменения редьюсером
    switch (action.type) {
        case SET_USER_PROFILE: // задание в локальный стейт профиля просматриваемого пользователя
            stateCopy = {
                ...state,
                profile: action.profile // профиль выбранного пользователя с сервера
            }
            return stateCopy;
        case ADD_POST: {// добавление поста
            const newPost: PostsType = { // задание локального объекта с постом
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

export const getProfileThunkCreator = (userId: number): ComThunkTp<ProfileActionTypes> => { // санкреатор на получение профиля выбранного пользователя
    return async (dispatch, getState) => { // нонейм санка на получение профиля выбранного пользователя
       // dispatch( appActions.toggleIsFetching( true ) ) //показать крутилку загрузки с сервера

        const idLocal = !userId? getState().auth.myId : userId // если userId не задан в URL (переход на страницу моего профиля не подставляет ID в браузере)
        const response = await apiProfile.getProfile( idLocal) // получение полных данных о моем профиле

        dispatch( profileActions.setUserProfile( response ) ) // задание полных данных в профиль
        !getState().profilePage.status && dispatch( getStatusThunkCreator( idLocal ) ) // запрос моего статуса, если его нет
       // dispatch( appActions.toggleIsFetching( false ) ) //убрать крутилку загрузки с сервера
    }
}

export const getStatusThunkCreator = (userId: number): ComThunkTp<ProfileActionTypes> => {  // санкреатор запроса статуса выбранного пользователя
    return async (dispatch, getState) => { // нонейм санка запроса статуса выбранного пользователя
        const response = await apiProfile.getStatus( userId ) // api запрос получение статуса по userId
        dispatch( profileActions.setStatus( response ) ) // задание статуса в локальный стейт с последующей переотрисовкой
    }
}
export const putStatusThunkCreator = (statusTmpInput: string): ComThunkTp<ProfileActionTypes> => { // санкреатор обновления моего статуса
    return async (dispatch, getState) => { // нонеййм санка обновления моего статуса
        const response = await apiProfile.putStatus( statusTmpInput ) // отправка нового статуса на сервер
        if (response.resultCode === ResultCodeEnum.Success) { // если успешное обновление статуса с сервера
            dispatch( getStatusThunkCreator( getState().auth.myId ) )// получение нового статуса с сервера после обновления
        }
    }
}
export const setprofilePhotoThunkCreator = (profilePhoto: File): ComThunkTp<ProfileActionTypes> => { // санкреатор установки фотографии моего профиля
    return async (dispatch, getState) => { // нонеййм санка установки фотографии моего профиля
      // dispatch( appActions.toggleIsFetching( true ) ) //показать крутилку загрузки с сервера
        const response = await apiProfile.putPhoto( profilePhoto ) // отправка нового фото на сервер
        if (response.resultCode === ResultCodeEnum.Success) { // если успешное обновление статуса с сервера

         //   dispatch( appActions.toggleIsFetching( false ) ) //убрать крутилку загрузки с сервера
            dispatch (getProfileThunkCreator(getState().auth.myId)) // получить данные о профиле с новым фото
        }
    }
}

export const putMyProfileThunkCreator = (MyProfile: ProfileType): ComThunkTp<ProfileActionTypes> => { // санкреатор установки моего профиля myProfile
    return async (dispatch, getState) => { // нонеййм санка установки моего профиля myProfile

       // dispatch( appActions.toggleIsFetching( true ) ) //показать крутилку загрузки с сервера

        const response = await apiProfile.putMyProfileData( MyProfile ) // отправка нового статуса на сервер
        if (response.resultCode === ResultCodeEnum.Success) { // если успешное обновление профиля на сервере
            const response2 = await apiProfile.getProfile( getState().auth.myId )//получение моих дополнительных данных после записи на сервер
            dispatch( authActions.setMyProfile( response2 ) )//задание в стейт моих доп данных
            dispatch( getProfileThunkCreator( getState().auth.myId ) )
            saveDataToNotify("Edited successfully!", "Success") // вывести уведомление - редактировано успешно
            dispatch(profileActions.setEditProfileStatus([])) // занулить список ошибок профиля

          //  dispatch( appActions.toggleIsFetching( false ) ) //убрать крутилку загрузки с сервера

        } else { // если пришла ошибка с сервера ввода формы правки профиля
            const message =  // определение локальной переменной message - ответ от сервера
                response.messages && response.messages.length !== 0  // если response.messages емсть и их длина не равна 0
                    ? response.messages //  вывести ответ от сервера
                    : ["no responce from server"] // иначе вывести сообщение заглушку
            dispatch( profileActions.setEditProfileStatus( message ) ) // отправить данные ошибки в стейт
        }
    }
}

export default profileReducer;










