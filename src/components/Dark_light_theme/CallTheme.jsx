import React from 'react'
import {PointerCursor} from "./globalStyles";
import dayNightLight from "../../assets/images/swg/day-night.svg"
import classes from "../Header/Header.module.css";


const CallTheme = ({themeTogglerLocal}) => { // отображение картинки смены темы
    return (
        <span>
            <PointerCursor>
                <img src={dayNightLight} className={classes.myHeaderWH1}
                     onClick={themeTogglerLocal} // по клику вызвать themeTogglerLocal
                     alt="Switch Theme" // альтернативный текст
                />

            </PointerCursor>
        </span>
    );
};
export default CallTheme;
