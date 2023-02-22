import React from 'react'
import {PointerCursor} from "./globalStyles";
import dayNightLight from "../../assets/images/swg/day-night.svg"
import classes from "../Header/Header.module.css";
import Image from "react-bootstrap/Image";


const CallTheme = ({themeTogglerLocal}) => { // отображение картинки смены темы
    return (
        <span>
            <PointerCursor>
                <Image fluid={true} src={dayNightLight} className={classes.myHeaderWH1}
                     onClick={themeTogglerLocal} // по клику вызвать themeTogglerLocal
                     alt="Switch Theme" // альтернативный текст
                />

            </PointerCursor>
        </span>
    );
};
export default CallTheme;