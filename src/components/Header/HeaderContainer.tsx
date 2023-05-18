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

class HeaderContainer extends React.Component<mapStateToPropsType & mapDispatchToPropsType> {

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

let mapStateToProps = (state: GlobalStateType) => {
    return {
        myLogin: state.auth.myLogin as string,// мой логин по умолчанию
        myId: state.auth.myId as number, // мой ID по умолчанию
        isAuth: state.auth.isAuth as boolean, // Флаг авторизации
        myProfile: state.auth.myProfile as NulableType<getProfileType>, // мой расширенный профиль по умолчанию
        themeBLL: state.theme.themeBLL as "light" | "dark", // тема в bll по умолчанию,
    }
}
type mapStateToPropsType = ReturnType<typeof mapStateToProps>

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




