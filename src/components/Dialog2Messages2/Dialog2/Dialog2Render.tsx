import React from "react";
import classes from "./dialog2Render.module.css"
import {getDialog2AllType} from "../../api/apiTypes";
import Dialog2Item from "./Dialog2Item";

type Dialog2RenderType = {
    patch: string,// имя страницы из URL
    PageWidth: number, // ширина страницы
    MobileWidth: number, // ширина страницы, считающаяся мобильной версткой
    Dialog2All: getDialog2AllType, // список всех диалогов для левой колонки
}
const Dialog2Render: React.FC<Dialog2RenderType> = (
    {PageWidth, MobileWidth, patch, Dialog2All}
    ) => {
    const hasRendered: Array<number> = [] // массив, какие диалоги в списке уже были отрисованы
    return <div>
        { // Компонента Dialog2Render отрисовывается на странице dialog всегда.
            // На странице messages только при десктопной версии
            ((patch === "messages" && PageWidth > MobileWidth) || (patch === "dialog2"))
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
                    {Dialog2All.map(d2=>{
                        const {id, userName, hasNewMessages, lastDialogActivityDate, newMessagesCount, photos} = d2
                        if (hasRendered.includes(id)) { //был глюк с записью двух одинаковых диалогов на сервер.
                            // Исправил проверкой, что уже отрисовано
                            return <div/>
                        }
                        hasRendered.push(id)
                        return <Dialog2Item
                            key={id} userName={userName} hasNewMessages={hasNewMessages} photos={photos}
                            lastDialogActivityDate={lastDialogActivityDate} newMessagesCount={newMessagesCount} id={id} />
                    })}

                    {/*список диалогов с фильтрацией по имени из заголовка. */}
                </div>
            </div>}

    </div>
}
export default React.memo(Dialog2Render)
