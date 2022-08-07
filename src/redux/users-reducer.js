const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";

export let followAC = (userID) => {
    return {type: FOLLOW, userID}
};
export let unfollowAC = (userID) => {
    return {type: UNFOLLOW, userID}
};
export let setUsersAC = (users) => {
    return {type: SET_USERS, users}
};
export let setCurrentPageAC = (currentPage) => {
    return {type: SET_CURRENT_PAGE, currentPage}
};
export let setUsersTotalCountAC = (totalUsersCount) => {
    return {type: SET_TOTAL_USERS_COUNT, totalUsersCount}
};
export let toggleIsFetchingAC = (isFetching) => {
    return {type: TOGGLE_IS_FETCHING, isFetching}
};

let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 2,
    isFetching: false
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
           case SET_CURRENT_PAGE:
               stateCopy = {
                   ...state,
                   currentPage: action.currentPage
               }
               return stateCopy;
           case SET_TOTAL_USERS_COUNT:
               stateCopy = {
                   ...state,
                   totalUsersCount: action.totalUsersCount
               }
               return stateCopy;
           case TOGGLE_IS_FETCHING:
               stateCopy = {
                   ...state,
                   isFetching: action.isFetching
               }
               return stateCopy;
           default:
               return state;
    }
}
export default usersReducer;










