import React from 'react';
import {connect} from "react-redux";
import {getFriendsThunkCreator} from "../../redux/sidebar-reducer";
import Navbar from "./Navbar";
import {needUpdateFriendsAC, unfollowThunkCreator} from "../../redux/users-reducer";
import {bedug_mode, debugItem} from "../../redux/store-redux";


class NavBarContainer extends React.Component {
    componentDidMount() {
        const {
            friendsCurrentPage, friendsPageSize,
            friendsTerm, friend, getFriendsThunkCreator
        } = this.props; // получение из пропсов данных по друзьям
        getFriendsThunkCreator(friendsCurrentPage, friendsPageSize, friendsTerm, friend); // получение друзей с сервера
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.needUpdateFriends) {
            const {
                friendsCurrentPage, friendsPageSize,
                friendsTerm, friend, getFriendsThunkCreator
            } = this.props; // получение из пропсов данных по друзьям
            getFriendsThunkCreator(friendsCurrentPage, friendsPageSize, friendsTerm, friend); // получение друзей с сервера
            this.props.needUpdateFriendsAC(false)
        }
    }

    unfollowFriendsAPI = (id) => { // эту функцию пробросим в Friends List и вызовем с id на удаление из списка
        this.props.unfollowThunkCreator(id, this.props.currentPage, this.props.pageSize, this.props.term)
    }

    render() {
        if (bedug_mode) {console.log("NavBarContainer render", debugItem)}

        const {myFriends2} = this.props; // получение из пропсов данных по друзьям
        return <Navbar myFriends2={myFriends2} unfollowFriendsAPI={this.unfollowFriendsAPI}/> // отрисовка целевой компоненты
    }
}

const mapStateToProps = (state) => {
    return {
        myFriends2: state.sideBar.myFriends2, // массив списка друзей
        friendsCurrentPage: state.sideBar.friendsCurrentPage, // текущая страница выгрузки друзей
        friendsPageSize: state.sideBar.friendsPageSize, // количество друзей в одной выгрузке с сервера
        friendsTerm: state.sideBar.friendsTerm, // поиск по друзьям
        friend: state.sideBar.friend, // поиск по друзьям (только те, что follow = true)
        needUpdateFriends: state.usersPage.needUpdateFriends, // флаг что нужно обновить список друзей
//  Данные для удаления пользователя из FriendList через функцию отписки users
        currentPage: state.usersPage.currentPage, // текущая страница users для обновления
        pageSize: state.usersPage.pageSize, // текущий размер страницы пользователей для обновления
        term: state.usersPage.term // текущий поисковый запрос users для обновления
    }
}
export default connect(mapStateToProps, {getFriendsThunkCreator, needUpdateFriendsAC, unfollowThunkCreator})(NavBarContainer);









