const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";

export let setUsers = (users) => {
    return {type: SET_USERS, users}
};
export let setCurrentPage = (currentPage) => {
    return {type: SET_CURRENT_PAGE, currentPage}
};
export let setUsersTotalCount = (totalUsersCount) => {
    return {type: SET_TOTAL_USERS_COUNT, totalUsersCount}
};
export let toggleIsFetching = (isFetching) => {
    return {type: TOGGLE_IS_FETCHING, isFetching}
};
export let toggleIsFollowingProgerss = (isFetching, id) => {
    return {type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, id}
};

let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}
let usersReducer = (state = initialState, action) => {
    let stateCopy;
       switch (action.type) {
           case TOGGLE_IS_FOLLOWING_PROGRESS: // disable кнопки от многократного нажатия (follow/unfollow)
               stateCopy = {
                   ...state,
                   followingInProgress: action.isFetching
                       ?[state.followingInProgress, action.id] // кнопка follow/unfollow нажата, добавление в массив followingInProgress id кнопки
                       : state.followingInProgress.filter(id=>id!=action.id)// пришел ответ от сервера OK, удаляем id кнопки из массива followingInProgress
               }
               return stateCopy;
           case SET_USERS:
               stateCopy = {...state, users: action.users};
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










