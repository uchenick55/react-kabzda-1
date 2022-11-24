import React from "react";
import {ThemeProvider} from "styled-components";
import {useDarkMode} from "./components/Dark_light_theme/useDarkMode";
import {
    GlobalStyles,
    PointerCursor
} from "./components/Dark_light_theme/globalStyles";
import {lightTheme, darkTheme} from "./components/Dark_light_theme/Themes";
import App from "./App";
import CallTheme from "./components/Dark_light_theme/CallTheme";
import {connect} from "react-redux";
import {setTheme} from "./redux/dark-light-reducer";

const AppDayNightContainer = ({themeBLL, setTheme}) => {
    const [theme, themeToggler] = useDarkMode(themeBLL); // в LocalStorage записываю значение темы по
  // умолчанию, взятое из BLL
    setTheme(theme) // записываю в BLL состояние темы, взятое из localStorage
    // (после изменения через themeToggler в том числе)

    //Определяем themeMode в зависимости от значения темы, записаной в BLL
    const themeMode = themeBLL === "light" ? lightTheme : darkTheme;
    return (
        <div>
            <ThemeProvider theme={themeMode}>
                {/* передача стилей во все вложенные компонеты*/}
                <GlobalStyles/> {/* определение глобального стиля*/}
                <div>
                    <PointerCursor>
                        {/* придание курсору вида руки*/}
                        <CallTheme themeToggler={themeToggler}/>
                        {/*отрисовка картинки с вызовом смены темы*/}
                    </PointerCursor>
                    <App/>
                </div>
            </ThemeProvider>
        </div>
    );
};

const mapStateToProps = (state) => {
      return {
        themeBLL: state.theme.themeBLL
    }
}

export default connect(mapStateToProps, {setTheme})(AppDayNightContainer);







