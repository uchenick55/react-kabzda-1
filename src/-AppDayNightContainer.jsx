import React from "react";
import {ThemeProvider} from "styled-components";
import { GlobalStyles} from "./components/-Dark_light_theme/-globalStyles";
import {lightTheme, darkTheme} from "./components/-Dark_light_theme/-Themes";
import App from "./AppBS";
import {connect} from "react-redux";

const AppDayNightContainer = ({themeBLL}) => {
    const themeMode = (themeBLL === "light") ? lightTheme : darkTheme;
    //Определяем themeMode в зависимости от значения темы, записаной в BLL
    return (
        <div>
            <ThemeProvider theme={themeMode}> {/* передача стилей во все вложенные компонеты*/}
                <GlobalStyles/> {/* определение глобального стиля для всех тем*/}
                <App/>
            </ThemeProvider>
        </div>
    );
};
const mapStateToProps = (state) => {
    return {
        themeBLL: state.theme.themeBLL// берем из стейта значение темы и передаем в AppDayNightContainer
        // для отображения темы
    }
}
export default connect(mapStateToProps, null)(AppDayNightContainer);







