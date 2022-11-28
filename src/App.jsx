import React, {Suspense} from "react";
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HeaderContainer from "./components/Header/HeaderContainer";
import NavBarContainer from "./components/Navbar/NavBarContainer";
import {connect} from "react-redux";
import {Component} from "react";
import {initialisedAppThunkCreator} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";

const ProfileContainer = React.lazy(()=>import("./components/Profile/ProfileInfo/ProfileContainer"))
const DialogsContainer = React.lazy(()=>import("./components/Dialogs/DialogsContainer"))
const UsersContainer = React.lazy(()=>import("./components/users/UsersContainer"))
const LoginContainer = React.lazy(()=>import("./components/Login/LoginContainer"))


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
                <div className='app-wrapper'>
                    <HeaderContainer/>
                    <NavBarContainer/>
                    <Suspense fallback={<div>Загрузка...</div>}>
                    <div className='app-wrapper-content'>
                        <Routes>
                            <Route path='/profile/*' element={<ProfileContainer/>}/>
                            <Route path='/dialogs/*' element={<DialogsContainer/>}/>
                            <Route path='/users/*' element={<UsersContainer/>}/>
                            <Route path='/login/*' element={<LoginContainer/>}/>
                        </Routes>
                    </div>
                    </Suspense>
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








