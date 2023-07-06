import React, {memo, useEffect, useMemo} from "react";
import './theme.scss';
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
import Service from "./components/common/Service/Service";

const AppBS: React.FC = memo(() => {
    console.log("AppBS")
    const theme:"light" | "dark" = useSelector((state:GlobalStateType) =>state.theme.themeBLL )
    const initialisedApp:boolean = useSelector((state:GlobalStateType) =>state.app.initialisedApp )
    const errorGlobal: ErrorType = useSelector( (state: GlobalStateType) => state.app.errorGlobal )

    const serviceMemo = useMemo(()=><Service/>,[])

    const dispatch = useDispatch<AppDispatch>();

        useEffect( () => {
            dispatch( initialisedAppThunkCreator()) // запускаем инициализацию приложения
    }, [dispatch] )//dispatch

    if (!initialisedApp && !errorGlobal) { // если не инициализировано приложение и ошибки отсутствуют, показать прелоадер
        return <Preloader/> // показать статус загрузки
    }
    return <div>
        {errorGlobal.message  // вывод ошибок запроса или контента
            ? <ErrorsRender error={errorGlobal} /> //вывод глобальных ошибок (все кроме 200 ответа)
            : <HashRouter> {/*BrowserRouter для продакшн, HashRouter для gh-pages*/}
                <div className={`${"themeCommon"} ${theme === "light" ? "light" : "dark"}`}>
                    {/*класс в зависимости от темы*/}
                    <ErrorBoundary> {/*Общий обработчик ошибок во всем приложении*/}
                        <Container>
                            {initialisedApp && serviceMemo}{/*прелоадер, измерение ширины страницы и получение пути с URL*/}
                            <HeaderContainer/> {/*плавающий заголовок*/}
                            <ContentContainer/>{/*страницы контента в зависмости от URL*/}
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
