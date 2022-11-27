import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileInfo/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginContainer from "./components/Login/LoginContainer";
import {connect} from "react-redux";
import {Component} from "react";
import {initialisedAppThunkCreator} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import {getFriendsThunkCreator} from "./redux/sidebar-reducer";
import NavBarContainer from "./components/Navbar/NavBarContainer";

class App extends Component { // конвертируем app в классовую компоненту для жизненного цикла
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
                    <div className='app-wrapper-content'>
                        <Routes>
                            <Route path='/profile/*' element={<ProfileContainer/>}/>
                            <Route path='/dialogs/*' element={<DialogsContainer/>}/>
                            <Route path='/users/*' element={<UsersContainer/>}/>
                            <Route path='/login/*' element={<LoginContainer/>}/>
                        </Routes>
                    </div>
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








