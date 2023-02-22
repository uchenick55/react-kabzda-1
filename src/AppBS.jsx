import React from "react";
import './App.scss';
import {HashRouter} from "react-router-dom";
import HeaderContainer from "./components/Header/HeaderContainer";
import {connect} from "react-redux";
import {initialisedAppThunkCreator} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import ContentContainer from "./components/Content/ContentContainer";
import ErrorBoundary from "./components/common/ErrorBoundary/ErrorBoundary";
import Container from "react-bootstrap/Container";
import FooterBS from "./components/Footer/FooterBS";
import commonClasses from "./components/common/CommonClasses/common.module.css";

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
                <div className={this.props.theme === "light"?"aaa":"bbb"}> {/*позиционирование по сетке гридов*/}
                    <ErrorBoundary> {/*Общий обработчик ошибок во всем приложении*/}
                        <Container>
                            <HeaderContainer/> {/*плавающий заголовок*/}
                            <div className={'marginForMenu'}></div>
                            <ContentContainer/> {/*страницы контента в зависмости от URL*/}
                            <div className={'marginForMenu'}></div>
                            <FooterBS/>
                        </Container>
                    </ErrorBoundary>
                    <div className={commonClasses.minwidth}></div>
                    {/*Для масштабирования и чтобы не поехал header, делаем div с шириной 350*/}
                </div>

            </HashRouter>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        initialisedApp: state.app.initialisedApp, // флаг инициализации приложения
        theme: state.theme.themeBLL, // флаг включения комментариев по телу сайта
    }
}

export default connect(mapStateToProps, {initialisedAppThunkCreator})(App);
// коннектим к app флаг и санки инициализации
