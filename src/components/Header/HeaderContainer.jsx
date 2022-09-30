import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {deleteLoginThunkCreator, getAuthMeThunkCreator} from "../../redux/auth-reducer";
import {getProfileThunkCreator} from "../../redux/profile-reducer";

class HeaderContainer extends React.Component {
    componentDidMount() {
        this.props.getAuthMeThunkCreator() // санки, я авторизован?
    }
    deleteLogin = () => {
        this.props.deleteLoginThunkCreator()// логаут текущего пользователя
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
export default connect(mapStateToProps, {getAuthMeThunkCreator, getProfileThunkCreator, deleteLoginThunkCreator})(HeaderContainer);









