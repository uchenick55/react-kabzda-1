import React from 'react'
import {PointerCursor} from "./globalStyles";

const CallTheme = ({themeTogglerLocal}) => { // отображение картинки смены темы
    return (
        <span>
            <PointerCursor>
            <img
                src="https://cdn-icons-png.flaticon.com/512/2490/2490365.png" // источник в инете
                onClick={themeTogglerLocal} // по клику вызвать themeTogglerLocal
                alt="Switch Theme" // альтернативный текст
            />
            </PointerCursor>
        </span>
    );
};
export default CallTheme;
