import React from 'react';
import {connect} from "react-redux";
import {
    setCurrentPage,
    setUsers,
    setUsersTotalCount,
    toggleIsFetching,
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
    unfollowAPI = (id) => {
        deleteFollow(id)
            .then((response) => {
                if (response.resultCode === 0) {
                    getUsers(this.props.currentPage,this.props.pageSize)
                        .then((response) => {
                            this.props.setUsers(response.items)
                        })
                }
            })
    }
    followAPI = (id) => {
        postFollow(id)
            .then((response) => {
                if (response.resultCode === 0) {
                    getUsers(this.props.currentPage,this.props.pageSize)
                        .then((response) => {
                            this.props.setUsers(response.items)
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
        isFetching: state.usersPage.isFetching
    }
}

let UsersContainer = connect(mapStateToProps,
    { setUsers, setCurrentPage, setUsersTotalCount, toggleIsFetching})(UsersAPI);

export default UsersContainer;













