import React, {useState} from "react";
import classes from "./dialog2Render.module.css"
import {GetDialog2AllType} from "../../api/apiTypes";
import Dialog2Item from "./Dialog2Item";
import Dialog2SearchRender from "./Dialog2SearchRender";

type Dialog2RenderType = {
    patch: string,// имя страницы из URL
    pageWidth: number, // ширина страницы
    mobileWidth: number, // ширина страницы, считающаяся мобильной версткой
    dialog2All: GetDialog2AllType, // список всех диалогов для левой колонки
}
const Dialog2Render: React.FC<Dialog2RenderType> = (
    {pageWidth, mobileWidth, patch, dialog2All}
) => {
    const [SearchValue, setSearchValue] = useState<string>( "" ) // локальный стейт поискового запроса в диалогах
    const dialog2AllFiltered: GetDialog2AllType = dialog2All && dialog2All.filter( d2 => { //если список диалогов есть,
        return d2.userName.toLowerCase().includes( SearchValue.toLowerCase() ) // фильтруем по поисковому запросу
    } )
    return <div>
        { // Компонента Dialog2Render отрисовывается на странице dialog всегда.
            // На странице messages только при десктопной версии
            ((patch === "messages" && pageWidth > mobileWidth) || (patch === "dialog2"))
            && <div>
                <div  //Fixed слева вверху.
                    // Поле остается на странице dialog2 всегда.
                    // На странице messages только при десктопной версии
                    className={`${classes.Fixed} ${classes.dialog2HeaderCommon} ${pageWidth < mobileWidth ? classes.MobileDialogWidth : classes.DesktopDialogWidth}`}
                    /*поиск по именам списка диалогов, с задержкой после ввода, без кнопки отправить*/

                ><Dialog2SearchRender SearchValue={SearchValue} setSearchValue={setSearchValue}/>
                </div>
                <div // Fixed слева внизу + прокрутка. Поле остается на странице dialog2 всегда
                    className={`${classes.Fixed} ${classes.dialog2ListCommon} ${pageWidth < mobileWidth ? classes.MobileDialogWidth : classes.DesktopDialogWidth}`}
                >
                    {dialog2AllFiltered.map( d2 => {
                        const {id, userName, hasNewMessages, lastDialogActivityDate, newMessagesCount, photos} = d2
                        const photosSmall = photos.small
                        return <Dialog2Item
                            key={id} userName={userName} hasNewMessages={hasNewMessages} photosSmall={photosSmall}
                            lastDialogActivityDate={lastDialogActivityDate} newMessagesCount={newMessagesCount}
                            id={id}/>
                    } )}
                    {/*список диалогов с фильтрацией по имени из заголовка. */}
                </div>
            </div>}

    </div>
}
export default React.memo( Dialog2Render )
