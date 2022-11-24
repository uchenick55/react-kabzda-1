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

const AppDayNightContainer = () => {
  const [theme, themeToggler] = useDarkMode();
  // переменной хука theme и его функции обновления themeToggler присваиваются
  //значения после return useDarkMode()
  const themeMode = theme === "light" ? lightTheme : darkTheme;
  // если theme === "light", то themeMode присваивается объект lightTheme.
  //Его свойства берутся из Themes.js. Иначе darkTheme
  return (
    < div >
    < ThemeProvider
  theme = {themeMode} >
    {" "}
  {/* передача глобального стиля во все вложенные компонеты*/
  }
<
  GlobalStyles / > {/* определение глобального стиля*/}
  < div >
  < PointerCursor >
  {/* придание курсору вида руки*/}
  < CallTheme
  themeToggler = {themeToggler}
  />
  {/*отрисовка картинки с вызовом смены темы*/
  }
<
  /PointerCursor>
  < App / >
  < /div>
  < /ThemeProvider>
  < /div>
)
  ;
};
export default AppDayNightContainer;
