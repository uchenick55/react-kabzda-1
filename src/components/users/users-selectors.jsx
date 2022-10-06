
export const UsersSelectors = {
    getUsersSL: (state) => {
        return state.usersPage.users
    },
    getPageSize: (state) => {
        return state.usersPage.pageSize
    },
    getTotalUsersCount: (state) => {
        return state.usersPage.totalUsersCount
    },
    getCurrentPage: (state) => {
        return state.usersPage.currentPage
    },
    getIsFetching: (state) => {
        return state.usersPage.isFetching
    },
    getFollowingInProgress: (state) => {
        return state.usersPage.followingInProgress
    },
    getIsAuth: (state) => {
        return state.auth.isAuth
    }
}

