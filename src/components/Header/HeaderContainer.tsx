import React, {useMemo} from 'react';
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

const HeaderContainer: React.FC<mapStateToPropsType & mapDispatchToPropsType> = (
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
            myProfile={useMemo(()=>myProfile,[]) }
            deleteLogin={deleteLogin}
            setTheme1={setTheme1} // задание темы1
        /> {/*отрисовка целевой компоненты*/}
    </ErrorBoundary>
}

let mapStateToProps = (state: GlobalStateType) => {
    return {
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




