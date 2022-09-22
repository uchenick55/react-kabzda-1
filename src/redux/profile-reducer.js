import {apiProfile} from "../components/api/api";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS"


export let addPostActionCreator = (newPostData) => {
    return {type: ADD_POST, newPostData}
};
let setUserProfile = (profile) => {
    return {type: SET_USER_PROFILE, profile}
};
export let setStatus = (newStatus) => {
    return {type: SET_STATUS, newStatus}
};
let initialState = {
    posts: [
        {id: 1, message: "state 2 Hi, how are you?", like: "12"},
        {id: 2, message: "state 2 it's, my first post", like: "15"},
    ],
    profile : null,
    status: null,
}
let profileReducer = (state=initialState, action) => {
    let stateCopy;
    switch (action.type) {
        case SET_USER_PROFILE:
            stateCopy = {
                ...state,
                profile: action.profile
            }
            return stateCopy;
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.newPostData,
                like: 2
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
            }
        }
        case SET_STATUS:
            stateCopy = {
                ...state,
                status: action.newStatus
            }
            return stateCopy;

        default:
            return state;
    }
}

export let getProfileThunkCreator = (userId) => {
    return (dispatch) => {
        if (!userId) {
            apiProfile.getAuthMe()
                .then((response)=>{
                    userId = response.data.id;
                    apiProfile.getProfile(userId)
                        .then((response) => {
                            dispatch(setUserProfile(response))
                            dispatch(getStatusThunkCreator(userId))
                        })
                })
        }
        else {
            apiProfile.getProfile(userId)
                .then((response) => {
                    dispatch(setUserProfile(response))
                    dispatch(getStatusThunkCreator(userId))
                })
        }
    }
}

export let getStatusThunkCreator = (userId) => {
    return (dispatch) => {
        apiProfile.getStatus(userId)
            .then((response) => {
                dispatch(setStatus(response))
            })
    }
}
export let putStatusThunkCreator = (statusTmpInput, myId) => { // санкреатор обновления моего статуса
    return (dispatch) => { // санка
        apiProfile.putStatus(statusTmpInput) // отправка нового статуса на сервер
            .then((response) => {// ответ 200 с сервера
                if (response.resultCode ===0) { // если успешное обновление статуса с сервера
                    dispatch(getStatusThunkCreator(myId))// получение нового статуса с сервера после обновления
                }
            })
    }
}

export default profileReducer;










