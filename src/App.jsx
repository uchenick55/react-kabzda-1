import React, {Suspense} from "react";
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HeaderContainer from "./components/Header/HeaderContainer";
import NavBarContainer from "./components/Navbar/NavBarContainer";
import {connect} from "react-redux";
import {initialisedAppThunkCreator} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import InfoContainer from "./components/Info/InfoContainer";
import ContentContainer from "./components/Content/ContentContainer";

class App extends React.Component { // конвертируем app в классовую компоненту для жизненного цикла
    componentDidMount() {
        this.props.initialisedAppThunkCreator() // запускаем инициализацию приложения
    }

    render() {
        if (!this.props.initialisedApp) { // если приложение еще не инициализировано
            return <Preloader/> // показать статус загрузки
        }
        return ( // иначе показать все приложение
            <BrowserRouter>
                <div className='app-wrapper'> {/*позиционирование по сетке гридов*/}
                    {/*    <ErrorBoundary> Общий обработчик ошибок во всем приложении*/}
                    <HeaderContainer/> {/*Header с пользователем и day/night режимом*/}
                    <div className='app-wrapper-navbar'>
                        <NavBarContainer/> {/*Навигационная панель со ссылками и FriendList*/}
                    </div>
                    <div className='app-wrapper-info'>
                        <InfoContainer/> {/*поле комментариев функциональности к страницам в зависмости от URL*/}
                    </div>
                    <div className='app-wrapper-content'>
                        <div><ContentContainer/> {/*страницы контента в зависмости от URL*/}</div>
                    </div>
                    {/*
                    </ErrorBoundary>
*/}
                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        initialisedApp: state.app.initialisedApp
    }
}

export default connect(mapStateToProps, {initialisedAppThunkCreator})(App);
// коннектим к app флаг и санки инициализации








