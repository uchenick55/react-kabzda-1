import React from "react";
import {ThemeProvider} from "styled-components";
import {useDarkMode} from "./components/Dark_light_theme/useDarkMode";
import {
    GlobalStyles,
} from "./components/Dark_light_theme/globalStyles";
import {lightTheme, darkTheme} from "./components/Dark_light_theme/Themes";
import App from "./App";
import {connect} from "react-redux";

const AppDayNightContainer = ({themeBLL}) => {
    //Определяем themeMode в зависимости от значения темы, записаной в BLL
    const themeMode = themeBLL === "light" ? lightTheme : darkTheme;
    return (
        <div>
            <ThemeProvider theme={themeMode}>
                {/* передача стилей во все вложенные компонеты*/}
                <GlobalStyles/> {/* определение глобального стиля*/}


                    <App/>

            </ThemeProvider>
        </div>
    );
};

const mapStateToProps = (state) => {
      return {
        themeBLL: state.theme.themeBLL
    }
}

export default connect(mapStateToProps, null)(AppDayNightContainer);







