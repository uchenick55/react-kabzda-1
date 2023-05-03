import React from "react";
import classes from "./dialog2Render.module.css"

type Dialog2RenderType = {
    PageWidth: number
    MobileWidth: number
    patch: string
}
const Dialog2Render: React.FC<Dialog2RenderType> = ({PageWidth, MobileWidth, patch}) => {
    return <div>
        { // Компонента Dialog2Render отрисовывается на странице dialog всегда.
            // На странице messages только при десктопной версии
            (patch === "messages" && PageWidth > MobileWidth || patch === "dialog2")
            && <div>
                <div  //Fixed слева вверху.
                    // Поле остается на странице dialog2 всегда.
                    // На странице messages только при десктопной версии
                    className={`${classes.Fixed} ${classes.dialog2HeaderCommon} ${PageWidth < MobileWidth ? classes.MobileDialogWidth : classes.DesktopDialogWidth}`}
                    /*поиск по именам списка диалогов, с задержкой после ввода, без кнопки отправить*/

                > поиск, без кнопки отправить, с задержкой после ввода.
                </div>
                <div // Fixed слева внизу + прокрутка. Поле остается на странице dialog2 всегда
                    className={`${classes.Fixed} ${classes.dialog2ListCommon} ${PageWidth < MobileWidth ? classes.MobileDialogWidth : classes.DesktopDialogWidth}`}
                >
                    список диалогов
                    {/*список диалогов с фильтрацией по имени из заголовка. */}
                </div>
            </div>}

    </div>
}
export default Dialog2Render
