import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {deleteLoginThunkCreator} from "../../redux/auth-reducer";
import {getProfileThunkCreator} from "../../redux/profile-reducer";
import {setInfoMode} from "../../redux/app-reducer";


class HeaderContainer extends React.Component {
    deleteLogin = () => {
        this.props.deleteLoginThunkCreator()// логаут текущего пользователя
    }
    switchInfo = () => {
        let info_modeLocal = !this.props.info_mode
        this.props.setInfoMode(info_modeLocal)

    }
    render() {
        return <Header {...this.props} deleteLogin={this.deleteLogin} switchInfo={this.switchInfo} /> // отрисовка целевой компоненты
    }
}
let mapStateToProps = (state) => {
    return {
        myLogin: state.auth.myLogin,
        myId: state.auth.myID,
        isAuth: state.auth.isAuth,
        myProfile: state.auth.myProfile,
        info_mode: state.app.info_mode,
    }
}
export default connect(mapStateToProps, {getProfileThunkCreator, deleteLoginThunkCreator, setInfoMode})(HeaderContainer);









