import React, {useMemo} from 'react';
import Header from "./HeaderBS";
import {connect} from "react-redux";
import {deleteLoginThunkCreator} from "../../redux/auth-reducer";
import {getProfileThunkCreator} from "../../redux/profile-reducer";
import ErrorBoundary from "../common/ErrorBoundary/ErrorBoundary";
import {compose} from "redux";
import {setThemeThunkCreator} from "../../redux/theme-reducer";
import {NulableType} from "../common/types/commonTypes";
import {GetProfileType} from "../api/apiTypes";
import {GlobalStateType} from "../../redux/store-redux";

const HeaderContainer: React.FC<MapStateToPropsType & MapDispatchToPropsType> = (
    {themeBLL, isAuth, myId, deleteLoginThunkCreator, getProfileThunkCreator, myProfile, setThemeThunkCreator}) => {

    const setTheme1 = () => {
        const themeBLL1:"light" | "dark" = themeBLL === "light" ? "dark" : "light" //инверсия темы при вызове
        setThemeThunkCreator( themeBLL1 ) // вызов смены темы
    }

    const deleteLogin = () => {
        deleteLoginThunkCreator()// логаут текущего пользователя
    }
    return <ErrorBoundary> {/*Локальный обработчик ошибок Header*/}
        <Header
            isAuth={isAuth}
            myProfile={useMemo(()=>myProfile,[myProfile]) }
            deleteLogin={deleteLogin}
            setTheme1={setTheme1} // задание темы1
            themeBLL={themeBLL}
        /> {/*отрисовка целевой компоненты*/}
    </ErrorBoundary>
}

const mapStateToProps = (state: GlobalStateType) => {
    return {
        myId: state.auth.myId as number, // мой ID по умолчанию
        isAuth: state.auth.isAuth as boolean, // Флаг авторизации
        myProfile: state.auth.myProfile as NulableType<GetProfileType>, // мой расширенный профиль по умолчанию
        themeBLL: state.theme.themeBLL as "light" | "dark", // тема в bll по умолчанию,
    }
}
type MapStateToPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchToPropsType = {
    getProfileThunkCreator: (userId: number) => void,
    deleteLoginThunkCreator: () => void,
    setThemeThunkCreator: (themeBLL: "light" | "dark") => void
}
export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, unknown, GlobalStateType>
        // @ts-ignore
        ( mapStateToProps,
        {
            getProfileThunkCreator,
            deleteLoginThunkCreator,
            setThemeThunkCreator
        } ),
)( HeaderContainer )




