//CallThemeRemote

import React from "react";
import {connect} from "react-redux";
import {setTheme} from "../../redux/dark-light-reducer";
import {useDarkMode} from "./useDarkMode";
import {PointerCursor} from "./globalStyles";
import CallTheme from "./CallTheme";

const CallThemeRemote = ({themeBLL, setTheme}) => {
    const [theme, themeToggler] = useDarkMode(themeBLL); // в LocalStorage записываю значение темы по
    const themeTogglerLocal = () => {
        themeToggler()
        setTheme(theme) // записываю в BLL состояние темы, взятое из localStorage
        // (после изменения через themeToggler в том числе)
    }
    return (
        <div>
            <PointerCursor>
                {/* придание курсору вида руки*/}
                <CallTheme themeTogglerLocal={themeTogglerLocal}/>
                {/*отрисовка картинки с вызовом смены темы*/}
            </PointerCursor>
        </div>)
}

const mapStateToProps = (state) => {
    return {
        themeBLL: state.theme.themeBLL
    }
}

export default connect(mapStateToProps, {setTheme})(CallThemeRemote);
