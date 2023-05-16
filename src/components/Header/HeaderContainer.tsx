import React from 'react';
import Header from "./HeaderBS";
import {connect} from "react-redux";
import {deleteLoginThunkCreator} from "../../redux/auth-reducer";
import {getProfileThunkCreator} from "../../redux/profile-reducer";
import ErrorBoundary from "../common/ErrorBoundary/ErrorBoundary";
import {compose} from "redux";
import {setThemeThunkCreator} from "../../redux/theme-reducer";
import {NulableType} from "../../types/commonTypes";
import {getProfileType} from "../api/apiTypes";
import {GlobalStateType} from "../../redux/store-redux";

type HeaderContainerPropsType = {
    myLogin: string,// мой логин по умолчанию
    myId: number, // мой ID по умолчанию
    isAuth: boolean, // Флаг авторизации
    myProfile: NulableType<getProfileType>, // мой расширенный профиль по умолчанию
    themeBLL: "light" | "dark", // тема в bll по умолчанию
    getProfileThunkCreator: (userId: number, shouldUpdateDialogList: boolean, myId: number) => void,
    deleteLoginThunkCreator: () => void,
    setThemeThunkCreator: (themeBLL: "light" | "dark") => void
}

class HeaderContainer extends React.Component<HeaderContainerPropsType, null> {

    setTheme1 = () => {
        const themeBLL = this.props.themeBLL === "light" ? "dark" : "light" //берем значение темы из стора
        this.props.setThemeThunkCreator( themeBLL ) // вызов смены темы
    }

    deleteLogin = () => {
        this.props.deleteLoginThunkCreator()// логаут текущего пользователя
    }

    goToMyPage = () => {
        getProfileThunkCreator( this.props.myId, false, 0 ); //получить профиль по моему ID
    }

    render() {
        return <ErrorBoundary> {/*Локальный обработчик ошибок Header*/}
            <Header
                {...this.props}
                deleteLogin={this.deleteLogin}
                goToMyPage={this.goToMyPage}
                setTheme1={this.setTheme1} // задание темы1
            /> {/*отрисовка целевой компоненты*/}
        </ErrorBoundary>
    }
}

type mapStateToPropsType = {
    myLogin: string,// мой логин по умолчанию
    myId: NulableType<number>, // мой ID по умолчанию
    isAuth: boolean, // Флаг авторизации
    myProfile: NulableType<getProfileType>, // мой расширенный профиль по умолчанию
    themeBLL: "light" | "dark", // тема в bll по умолчанию

}
let mapStateToProps = (state: GlobalStateType) => {
    return {
        myLogin: state.auth.myLogin,
        myId: state.auth.myId,
        isAuth: state.auth.isAuth,
        myProfile: state.auth.myProfile,
        themeBLL: state.theme.themeBLL,
    }
}
type mapDispatchToPropsType = {
    getProfileThunkCreator: (userId: number, shouldUpdateDialogList: boolean, myId: number) => void,
    deleteLoginThunkCreator: () => void,
    setThemeThunkCreator: (themeBLL: "light" | "dark") => void
}
export default compose<React.ComponentType>(
    connect<mapStateToPropsType, mapDispatchToPropsType, unknown, GlobalStateType>
        // @ts-ignore
        ( mapStateToProps,
        {
            getProfileThunkCreator,
            deleteLoginThunkCreator,
            setThemeThunkCreator
        } ),
)( HeaderContainer )




