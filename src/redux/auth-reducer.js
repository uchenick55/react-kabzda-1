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
export default authReducer;










