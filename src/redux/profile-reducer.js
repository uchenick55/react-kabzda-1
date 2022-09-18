import {getAuthMe, getProfile, getStatus} from "../components/api/api";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS"


export let addPostActionCreator = () => {
    return {type: ADD_POST}
};
export let updateNewPostTextActionCreator = (text2) => {
    return {type: UPDATE_NEW_POST_TEXT, newText: text2}
};
let setUserProfile = (profile) => {
    return {type: SET_USER_PROFILE, profile}
};
let setStatus = (newStatus) => {
    return {type: SET_STATUS, newStatus}
};
let initialState = {
    posts: [
        {id: 1, message: "state 2 Hi, how are you?", like: "12"},
        {id: 2, message: "state 2 it's, my first post", like: "15"},
    ],
    newPostText : "",
    profile : null,
    status: "Hello World"
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
                message: state.newPostText,
                like: 2
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ""
            }
        }
        case UPDATE_NEW_POST_TEXT:{
            return {
                ...state,
                newPostText: action.newText,
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
            getAuthMe()
                .then((response)=>{
                    userId = response.data.id;
                })
        }
        getProfile(userId)
            .then((response) => {
                dispatch(setUserProfile(response))
            })
    }
}

export let getStatusThunkCreator = (userId) => {
    return (dispatch) => {
        getStatus(userId)
            .then((response) => {
                dispatch(setStatus(response))
            })
    }
}

export default profileReducer;










