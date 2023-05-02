import React from "react";
import classesCommon from "../dialog2Messages2Common.module.css";

type Dialog2RenderType = {
    PageWidth: number
    MobileWidth: number
}
const Dialog2Render: React.FC<Dialog2RenderType> = ({PageWidth, MobileWidth}) => {
    return <div>
        <div  //Fixed слева вверху.
            // Поле остается на странице dialog2 всегда.
            // На странице messages только при десктопной версии
            className={`${classesCommon.dialog2HeaderCommon} ${PageWidth < MobileWidth ? classesCommon.isMobile : classesCommon.isDesktop}`}
            /*поиск по списку друзей, по вводу с задержкой, без кнопки отправить. Fixed*/

        > поиск по списку друзей, по вводу с задержкой, без кнопки отправить
        </div>
        <div // Fixed слева внизу + прокрутка. Поле остается на странице dialog2 при мобильной версии
            className={`${classesCommon.dialog2ListCommon} ${PageWidth < MobileWidth ? classesCommon.isMobile : classesCommon.isDesktop}`}

        >
            список диалогов с фильтрацией по имени из заголовка
            {/*список диалогов с фильтрацией по имени из заголовка. */}
        </div>
    </div>
}
export default Dialog2Render
