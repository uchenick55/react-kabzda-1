import React from 'react'
import {PointerCursor} from "./globalStyles";
import dayNightLight from "../../assets/images/day-night.png"
import classes from "../Header/Header.module.css";


const CallTheme = ({themeTogglerLocal}) => { // отображение картинки смены темы
    return (
        <span>
            <PointerCursor>
            <img className={classes.dayNight}
                src="https://cdn-icons-png.flaticon.com/512/2490/2490365.png" //
                onClick={themeTogglerLocal} // по клику вызвать themeTogglerLocal
                alt="Switch Theme" // альтернативный текст
            />
            </PointerCursor>
        </span>
    );
};
export default CallTheme;
