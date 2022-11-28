import React, {Suspense} from "react";
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HeaderContainer from "./components/Header/HeaderContainer";
import NavBarContainer from "./components/Navbar/NavBarContainer";
import {connect} from "react-redux";
import {Component} from "react";
import {initialisedAppThunkCreator} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import ErrorBoundary from "./components/common/ErrorBoundary/ErrorBoundary";

const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileInfo/ProfileContainer"))
const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"))
// В случае именного экспорта, оборачиваем компоненту в промежуточную с экспортом по умолчанию, чтобы работал lazy
const ExportDefaultUsersContainer = React.lazy(() => import("./components/users/ExportDefaultUsersContainer"))
const LoginContainer = React.lazy(() => import("./components/Login/LoginContainer"))

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
                    <ErrorBoundary> {/*Общий обработчик ошибок во всем приложении*/}
                        <HeaderContainer/> {/*Header с пользователем и day/night режимом*/}
                        <NavBarContainer/> {/*Навигационная панель со ссылками и FriendList*/}
                        <Suspense fallback={<div>Загрузка...</div>}> {/*Оборачивает компоненты, по которым идет Lazy import и выдает fallback на время загрузки*/}
                            <div className='app-wrapper-content'> {/*позиционирование контента по сетке гридов*/}
                                <Routes> {/*в зависимости от URL подгрузка разного контента*/}
                                    <Route path='/profile/*' element={<ProfileContainer/>}/> {/*Профиль*/}
                                    <Route path='/dialogs/*' element={<DialogsContainer/>}/> {/*Диалоги*/}
                                    <Route path='/users/*' element={<ExportDefaultUsersContainer/>}/> {/*Поиск по Users*/}
                                    <Route path='/login/*' element={<LoginContainer/>}/> {/*Логин*/}
                                </Routes>
                            </div>
                        </Suspense>
                    </ErrorBoundary>
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








