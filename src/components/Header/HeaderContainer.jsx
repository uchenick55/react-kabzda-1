import React from 'react';
import Header from "./HeaderBS";
import {connect} from "react-redux";
import {deleteLoginThunkCreator} from "../../redux/auth-reducer";
import {getProfileThunkCreator} from "../../redux/profile-reducer";
import {getInfoModeThunkCreator, setInfoMode, setInfoModeThunkCreator} from "../../redux/app-reducer";
import ErrorBoundary from "../common/ErrorBoundary/ErrorBoundary";


class HeaderContainer extends React.Component {
    componentDidMount() {
        this.props.getInfoModeThunkCreator() // считыаем с localStorage флаг комментариев по сайту
    }

    deleteLogin = () => {
        this.props.deleteLoginThunkCreator()// логаут текущего пользователя
    }
    switchInfo = () => {
        let info_modeLocal = !this.props.info_mode // меняем infoMode на противоположный и отправляем в localStorage
        this.props.setInfoModeThunkCreator(info_modeLocal) // задать infoMode в localStorage

    }
    goToMyPage = () => {
        getProfileThunkCreator(this.props.myId); //получить профиль по моему ID
    }
    render() {
        return <ErrorBoundary> {/*Локальный обработчик ошибок Header*/}
                <Header
                    {...this.props}
                    deleteLogin={this.deleteLogin}
                    switchInfo={this.switchInfo}
                    goToMyPage={this.goToMyPage}
                /> {/*отрисовка целевой компоненты*/}
            </ErrorBoundary>
    }
}
let mapStateToProps = (state) => {
    return {
        myLogin: state.auth.myLogin,
        myId: state.auth.myId,
        isAuth: state.auth.isAuth,
        myProfile: state.auth.myProfile,
        info_mode: state.app.info_mode,
    }
}
export default connect(mapStateToProps, {
    getProfileThunkCreator,
    deleteLoginThunkCreator,
    setInfoMode,
    setInfoModeThunkCreator,
    getInfoModeThunkCreator
})(HeaderContainer);









