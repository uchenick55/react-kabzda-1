import React, {memo, useEffect} from "react";
import './theme.scss';
import commonClasses from "./components/common/CommonClasses/common.module.css";
import {HashRouter} from "react-router-dom";
import HeaderContainer from "./components/Header/HeaderContainer";
import {useDispatch, useSelector} from "react-redux";
import type {} from 'redux-thunk/extend-redux';
import {initialisedAppThunkCreator} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import ContentContainer from "./components/Content/ContentContainer";
import ErrorBoundary from "./components/common/ErrorBoundary/ErrorBoundary";
import Container from "react-bootstrap/Container";
import FooterBS from "./components/Footer/FooterBS";
import {AppDispatch, GlobalStateType} from "./redux/store-redux";
import {ErrorType} from "./components/common/types/commonTypes";
import ErrorsRender from "./components/common/ErrorsRender/ErrorsRender";

const AppBS: React.FC = memo(() => {

    const theme:"light" | "dark" = useSelector((state:GlobalStateType) =>state.theme.themeBLL )
    const initialisedApp:boolean = useSelector((state:GlobalStateType) =>state.app.initialisedApp )
    const error: ErrorType = useSelector( (state: GlobalStateType) => state.app.err )

    const dispatch = useDispatch<AppDispatch>();

        useEffect( () => {
            dispatch( initialisedAppThunkCreator()) // запускаем инициализацию приложения
    }, [dispatch] )//dispatch

    if (!initialisedApp && !error) { // если не инициализировано приложение и ошибки отсутствуют, показать прелоадер
        return <Preloader/> // показать статус загрузки
    }
    return <div>
        {error.message  // вывод ошибок запроса или контента
            ? <ErrorsRender error={error} /> //вывод ошибок при наличии
            : <HashRouter> {/*BrowserRouter для продакшн, HashRouter для gh-pages*/}
                <div className={`${"themeCommon"} ${theme === "light" ? "light" : "dark"}`}>
                    {/*класс в зависимости от темы*/}
                    <ErrorBoundary> {/*Общий обработчик ошибок во всем приложении*/}
                        <Container className={commonClasses.minwidth}>
                            <HeaderContainer/> {/*плавающий заголовок*/}
                            <ContentContainer/>
                            {/*страницы контента в зависмости от URL*/}
                            <FooterBS/>
                        </Container>
                    </ErrorBoundary>
                </div>
            </HashRouter>
        }

    </div>
})
export default  AppBS;
// коннектим к app флаг и санки инициализации
