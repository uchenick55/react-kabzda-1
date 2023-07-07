import React, {useMemo} from 'react';
import Header from "./HeaderBS";
import {useDispatch, useSelector} from "react-redux";
import {deleteLoginThunkCreator} from "../../redux/auth-reducer";
import ErrorBoundary from "../common/ErrorBoundary/ErrorBoundary";
import {setThemeThunkCreator} from "../../redux/theme-reducer";
import {GlobalStateType} from "../../redux/store-redux";

const HeaderContainer: React.FC = () => {

    const dispatch = useDispatch()
    const themeBLL = useSelector((state:GlobalStateType) => state.theme.themeBLL )
    const isAuth = useSelector((state:GlobalStateType) => state.auth.isAuth )
    const myProfile = useSelector((state:GlobalStateType) => state.auth.myProfile )
    const path = useSelector((state:GlobalStateType) => state.app.patch )

    const setTheme1 = () => {
        const themeBLL1:"light" | "dark" = themeBLL === "light" ? "dark" : "light" //инверсия темы при вызове
        dispatch(  setThemeThunkCreator( themeBLL1 )) // вызов смены темы
    }

    const deleteLogin = () => {
        dispatch( deleteLoginThunkCreator())// логаут текущего пользователя
    }
    return <ErrorBoundary> {/*Локальный обработчик ошибок Header*/}
        <Header
            isAuth={isAuth}
            myProfile={useMemo(()=>myProfile,[myProfile]) }
            deleteLogin={deleteLogin}
            setTheme1={setTheme1} // задание темы1
            path={path}
        /> {/*отрисовка целевой компоненты*/}
    </ErrorBoundary>
}

export default HeaderContainer




