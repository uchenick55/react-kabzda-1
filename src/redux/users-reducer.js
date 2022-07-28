const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";

export let followAC = (userID) => {
    return {type: FOLLOW, userID}
};
export let unfollowAC = (userID) => {
    return {type: UNFOLLOW, userID}
};
export let setUsersAC = (users) => {
    return {type: SET_USERS, users}
};
let initialState = {
        users: []
}

let usersReducer = (state = initialState, action) => {
    let stateCopy;

       switch (action.type) {
           case SET_USERS:
               return {...state, users: action.users};
           case FOLLOW:
               stateCopy = {
                   ...state,
                   users: state.users.map((u) => {
                       if (u.id === action.userID) {
                           return {...u, followed: true}
                       }
                       return(u)
                   })
               }
               return stateCopy;
           case UNFOLLOW:
               stateCopy = {
                   ...state,
                   users: state.users.map((u) => {
                       if (u.id === action.userID) {
                           return {...u, followed: false}
                       }
                       return(u)
                   })
               }
               return stateCopy;
           default:
               return state;
    }
}
export default usersReducer;
