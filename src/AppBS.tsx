import React from "react";
import './theme.scss';
import commonClasses from "./components/common/CommonClasses/common.module.css";
import {HashRouter} from "react-router-dom";
import HeaderContainer from "./components/Header/HeaderContainer";
import {connect} from "react-redux";
import {AppActions, initialisedAppThunkCreator} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import ContentContainer from "./components/Content/ContentContainer";
import ErrorBoundary from "./components/common/ErrorBoundary/ErrorBoundary";
import Container from "react-bootstrap/Container";
import FooterBS from "./components/Footer/FooterBS";
import {GlobalStateType} from "./redux/store-redux";

const {setPageWidth, setPatch} = AppActions // деструктуризация методов ActionCreator из объекта

type AppBSPropsType = {
    initialisedApp: boolean,
    theme: "light" | "dark"
    initialisedAppThunkCreator: () => void,
    setPatch: (patch:string) => void,
    setPageWidth: (PageWidth:number) => void
}
class AppBS extends React.Component <AppBSPropsType> { // конвертируем app в классовую компоненту для жизненного цикла
    componentDidMount() {
        this.props.initialisedAppThunkCreator() // запускаем инициализацию приложения
    }

    render() {

        if (!this.props.initialisedApp) { // если приложение еще не инициализировано
            return <Preloader/> // показать статус загрузки
        }
        return ( // иначе показать все приложение
            <HashRouter> {/*BrowserRouter для продакшн, HashRouter для gh-pages*/}
                <div className={`${"themeCommon"} ${this.props.theme === "light"?"light":"dark"}`}>
                    {/*класс в зависимости от темы*/}
                    <ErrorBoundary> {/*Общий обработчик ошибок во всем приложении*/}
                        <Container className={commonClasses.minwidth}>
                            <HeaderContainer/>  {/*плавающий заголовок*/}
                            <ContentContainer setPatch={this.props.setPatch} setPageWidth={this.props.setPageWidth}/>
                            {/*страницы контента в зависмости от URL*/}
                            <FooterBS/>
                        </Container>
                    </ErrorBoundary>
                </div>

            </HashRouter>

        );
    }
}

const mapStateToProps = (state:GlobalStateType) => {
    return {
        initialisedApp: state.app.initialisedApp, // флаг инициализации приложения
        theme: state.theme.themeBLL, // флаг включения комментариев по телу сайта
    }
}
type mapStateToPropsType = {
    initialisedApp: boolean,
    theme: "light" | "dark"
}
type mapDispatchToPropsType = {
    initialisedAppThunkCreator: () => void,
    setPatch: (patch:string) => void,
    setPageWidth: (PageWidth:number) => void
}

export default connect<
    mapStateToPropsType,
    mapDispatchToPropsType,
    unknown,
    GlobalStateType
    >(mapStateToProps, {initialisedAppThunkCreator, setPatch, setPageWidth})(AppBS);
// коннектим к app флаг и санки инициализации
