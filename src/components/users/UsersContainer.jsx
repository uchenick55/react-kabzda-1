import React from 'react';
import {connect} from "react-redux";
import {
    setCurrentPage,
    setUsers,
    setUsersTotalCount,
    toggleIsFetching, toggleIsFollowingProgerss,
} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {deleteFollow, getUsers, postFollow} from "../api/api";

class UsersAPI extends React.Component {

    componentDidMount() {
        this.props.toggleIsFetching(true)
        getUsers(this.props.currentPage, this.props.pageSize)
            .then((data) => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(data.items)
                this.props.setUsersTotalCount(data.totalCount)
            })
    }

    onPageChanged = (setPage) => {
        this.props.toggleIsFetching(true)
        this.props.setCurrentPage(setPage)
        getUsers(setPage, this.props.pageSize)
            .then((data) => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(data.items)
            })
    }
    followAPI = (id) => {
        this.props.toggleIsFollowingProgerss(true, id)
        postFollow(id)
            .then((response) => {
                if (response.resultCode === 0) {
                    getUsers(this.props.currentPage,this.props.pageSize)
                        .then((response) => {
                            this.props.setUsers(response.items)
                            this.props.toggleIsFollowingProgerss(false, id)
                        })
                }
            })
    }

    unfollowAPI = (id) => {
        this.props.toggleIsFollowingProgerss(true, id)
        deleteFollow(id)
            .then((response) => {
                if (response.resultCode === 0) {
                    getUsers(this.props.currentPage,this.props.pageSize)
                        .then((response) => {
                            this.props.setUsers(response.items)
                            this.props.toggleIsFollowingProgerss(false, id)
                        })
                }
            })
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
        followingInProgress: state.usersPage.followingInProgress
    }
}

let UsersContainer = connect(mapStateToProps,
    { setUsers, setCurrentPage, setUsersTotalCount, toggleIsFetching, toggleIsFollowingProgerss})(UsersAPI);

export default UsersContainer;













