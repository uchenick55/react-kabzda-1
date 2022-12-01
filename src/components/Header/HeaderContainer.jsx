import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {deleteLoginThunkCreator} from "../../redux/auth-reducer";
import {getProfileThunkCreator} from "../../redux/profile-reducer";
import {state_copy_for_debug} from "../../redux/store-redux";
import {setFriends} from "../../redux/sidebar-reducer";


class HeaderContainer extends React.Component {
    deleteLogin = () => {
        this.props.deleteLoginThunkCreator()// логаут текущего пользователя
        this.props.setFriends([])// зануление стека текущих друзей
    }
    render() {
        return <Header {...this.props} deleteLogin={this.deleteLogin} /> // отрисовка целевой компоненты
    }
}
let mapStateToProps = (state) => {
    return {
        myLogin: state.auth.myLogin,
        myId: state.auth.myID,
        isAuth: state.auth.isAuth,
        myProfile: state.auth.myProfile
    }
}
export default connect(mapStateToProps, {getProfileThunkCreator, deleteLoginThunkCreator, setFriends})(HeaderContainer);









