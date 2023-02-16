import {createSelector} from "reselect";

export const usersSelectorsSimple = { // простой селектор получить из стейта users
    getUsersSL: (state) => {
        return state.usersPage.users
    },
    getPageSize: (state) => {// простой селектор получить из стейта pageSize
        return state.usersPage.pageSize
    },
    getTotalUsersCount: (state) => {// простой селектор получить из стейта totalUsersCount
        return state.usersPage.totalUsersCount
    },
    getCurrentPage: (state) => {// простой селектор получить из стейта currentPage
        return state.usersPage.currentPage
    },
    getIsFetching: (state) => {// простой селектор получить из стейта isFetching
        return state.usersPage.isFetching
    },
    getFollowingInProgress: (state) => {// простой селектор получить из стейта followingInProgress
        return state.usersPage.followingInProgress
    },
    getIsAuth: (state) => {// простой селектор получить из стейта isAuth
        return state.auth.isAuth
    },
    getOnlyFriends: (state) => {// простой селектор сделать выборку только моих друзей
        return state.usersPage.onlyFriends
    },

}

export let getUsersReselect = createSelector(usersSelectorsSimple.getUsersSL, (users) => {
    return users // имитация сложного селектора через реселект
})
