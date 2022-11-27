import React from 'react';
import {connect} from "react-redux";
import {getFriendsThunkCreator} from "../../redux/sidebar-reducer";
import Navbar from "./Navbar";


class NavBarContainer extends React.Component {
    componentDidMount() {
      const {friendsCurrentPage, friendsPageSize,
          friendsTerm, friend, getFriendsThunkCreator } = this.props; // получение из пропсов данных по друзьям
        getFriendsThunkCreator(friendsCurrentPage, friendsPageSize, friendsTerm, friend); // получение друзей с сервера
    }

    render() {
        const {myFriends2} = this.props; // получение из пропсов данных по друзьям
        return <Navbar myFriends2={myFriends2} /> // отрисовка целевой компоненты
    }
}
const mapStateToProps = (state) => {
    return {
        myFriends2: state.sideBar.myFriends2, // массив списка друзей
        friendsCurrentPage: state.sideBar.friendsCurrentPage, // текущая страница выгрузки друзей
        friendsPageSize: state.sideBar.friendsPageSize, // количество друзей в одной выгрузке с сервера
        friendsTerm: state.sideBar.friendsTerm, // поиск по друзьям
        friend: state.sideBar.friend // поиск по друзьям (только те, что follow = true)
    }
}
export default connect(mapStateToProps, { getFriendsThunkCreator})(NavBarContainer);









