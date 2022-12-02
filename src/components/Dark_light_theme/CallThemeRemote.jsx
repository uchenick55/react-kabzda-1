import React, {useEffect} from "react";
import {connect} from "react-redux";
import {setTheme} from "../../redux/dark-light-reducer";
import {useDarkMode} from "./useDarkMode";
import {PointerCursor} from "./globalStyles";
import CallTheme from "./CallTheme";
import {bedug_mode, debugItem} from "../../redux/store-redux";

const CallThemeRemote = ({themeBLL, setTheme}) => {
    const [theme, themeToggler] = useDarkMode(themeBLL); // в LocalStorage записывает значение темы из
    // редакса после изменения, и читает оттуда же после повторной загрузки страницы

    const themeTogglerLocal = () => {  // themeTogglerLocal - локальный обработчик
        themeToggler() // 1) переключает localStorage на противоположную тему
        setTheme(theme) // 2) меняет тему themeBLL в редаксе
    }
    useEffect(()=>{
        if (theme!=themeBLL) {
            setTheme(theme) // записывает в BLL состояние темы, взятое из localStorage при ререндере
        }
    },[theme, themeBLL]) // useEffect зависит от theme и themeBLL
    return (
        <span>
            <PointerCursor>
                {/* придание курсору вида руки*/}
                <CallTheme themeTogglerLocal={themeTogglerLocal}/>
                {/*отрисовка картинки с вызовом смены темы*/}
            </PointerCursor>
        </span>)
}

const mapStateToProps = (state) => {
    return {
        themeBLL: state.theme.themeBLL// берем из стейта значение темы и передаем в CallThemeRemote
        // для отображения темы
    }
}

export default connect(mapStateToProps, {setTheme})(CallThemeRemote);









