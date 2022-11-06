import React from 'react';
import {connect} from "react-redux";
import {
    followThunkCreator,
    getUsersThunkCreator,
    setCurrentPage, unfollowThunkCreator,
} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {getUsersReselect, usersSelectorsSimple} from "./users-selectors";

class UsersAPI extends React.Component {

    componentDidMount() {
        const {getUsersThunkCreator, currentPage, pageSize } = this.props;
        getUsersThunkCreator(currentPage, pageSize);
    }
    onPageChanged = (setPage) => {
        const {setCurrentPage, getUsersThunkCreator, pageSize} = this.props;
        setCurrentPage(setPage);
        getUsersThunkCreator(setPage, pageSize);
    }
    followAPI = (id) => {
        this.props.followThunkCreator(id, this.props.currentPage,this.props.pageSize)
    }
    unfollowAPI = (id) => {
        this.props.unfollowThunkCreator(id, this.props.currentPage,this.props.pageSize)
    }
    render() {
        const {isFetching, totalUsersCount, pageSize, currentPage, users, followingInProgress, isAuth} = this.props;
        return <>
            {isFetching ? <Preloader/> : null}
            <Users onPageChanged={this.onPageChanged}
                   totalUsersCount={totalUsersCount}
                   pageSize={pageSize}
                   currentPage={currentPage}
                   users={users}
                   unfollowAPI={this.unfollowAPI}
                   followAPI={this.followAPI}
                   followingInProgress={followingInProgress}
                   isAuth={isAuth}
            />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsersReselect(state), // Реселектор users- список пользователей в пачке от сервера
        pageSize: usersSelectorsSimple.getPageSize(state),// селектор pageSize - количество пользователей на странице
        totalUsersCount: usersSelectorsSimple.getTotalUsersCount(state), // селектор totalUsersCount - общее число пользователей с сервера
        currentPage: usersSelectorsSimple.getCurrentPage(state),// селектор currentPage - текущая страница пачки пользователей с сервера
        isFetching: usersSelectorsSimple.getIsFetching(state), // селектор isFetching - показать крутилку при загрузке страницы
        followingInProgress: usersSelectorsSimple.getFollowingInProgress(state), // селектор followingInProgress - массив на кого мы подписались, кнопка неактивна
        isAuth: usersSelectorsSimple.getIsAuth(state) // селектор isAuth - флаг авторизации
    }
}

let UsersContainer = connect(mapStateToProps,
    { setCurrentPage,
        getUsersThunkCreator, followThunkCreator, unfollowThunkCreator})(UsersAPI);

export default UsersContainer;












