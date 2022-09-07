import React from 'react';
import {connect} from "react-redux";
import {
    followThunkCreator,
    getUsersThunkCreator,
    setCurrentPage, unfollowThunkCreator,
} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";

class UsersAPI extends React.Component {

    componentDidMount() {
        this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize);
    }
    onPageChanged = (setPage) => {
        this.props.setCurrentPage(setPage)
        this.props.getUsersThunkCreator(setPage, this.props.pageSize);
    }
    followAPI = (id) => {
        this.props.followThunkCreator(id, this.props.currentPage,this.props.pageSize)
    }
    unfollowAPI = (id) => {
        this.props.unfollowThunkCreator(id, this.props.currentPage,this.props.pageSize)
    }
    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users onPageChanged={this.onPageChanged}
                   totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   users={this.props.users}
                   unfollowAPI={this.unfollowAPI}
                   followAPI={this.followAPI}
                   followingInProgress={this.props.followingInProgress}
                   isAuth={this.props.isAuth}
            />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
        isAuth: state.auth.isAuth
    }
}

let UsersContainer = connect(mapStateToProps,
    { setCurrentPage,
        getUsersThunkCreator, followThunkCreator, unfollowThunkCreator})(UsersAPI);

export default UsersContainer;












