import React from "react";
import './App.css';
import {HashRouter} from "react-router-dom";
import HeaderContainer from "./components/Header/HeaderContainer";
import NavBarContainer from "./components/Navbar/NavBarContainer";
import {connect} from "react-redux";
import {initialisedAppThunkCreator} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import InfoContainer from "./components/Info/InfoContainer";
import ContentContainer from "./components/Content/ContentContainer";
import ErrorBoundary from "./components/common/ErrorBoundary/ErrorBoundary";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

class App extends React.Component { // конвертируем app в классовую компоненту для жизненного цикла
    componentDidMount() {
        this.props.initialisedAppThunkCreator() // запускаем инициализацию приложения
    }

    render() {

        if (!this.props.initialisedApp) { // если приложение еще не инициализировано
            return <Preloader/> // показать статус загрузки
        }
        return ( // иначе показать все приложение
            <HashRouter> {/*BrowserRouter для продакшн, HashRouter для gh-pages*/}
                <div
                    className={this.props.info_mode ? 'app-wrapper' : 'app-wrapper-no-info'}> {/*позиционирование по сетке гридов*/}
                    <ErrorBoundary> {/*Общий обработчик ошибок во всем приложении*/}
                        <Container>
                            <HeaderContainer/>

                        <div className='app-wrapper-content g-5'>
                            <div className='mt-5 mt-5'>
                                <ContentContainer/> {/*страницы контента в зависмости от URL*/}
                            </div>
                        </div></Container>
                    </ErrorBoundary>
                </div>
            </HashRouter>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        initialisedApp: state.app.initialisedApp, // флаг инициализации приложения
        info_mode: state.app.info_mode, // флаг включения комментариев по телу сайта
    }
}

export default connect(mapStateToProps, {initialisedAppThunkCreator})(App);
// коннектим к app флаг и санки инициализации
