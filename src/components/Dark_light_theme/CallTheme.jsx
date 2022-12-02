import React from 'react'
import {bedug_mode, debugItem} from "../../redux/store-redux";

const CallTheme = ({themeTogglerLocal}) => { // отображение картинки смены темы
    return (
        <span>
            <img
                src="https://cdn-icons-png.flaticon.com/512/2490/2490365.png" // источник в инете
                onClick={themeTogglerLocal} // по клику вызвать themeTogglerLocal
                alt="Switch Theme" // альтернативный текст
                width="80px" // ширина картинки
            />
        </span>
    );
};
export default CallTheme;
