import React from "react";
import classesCommon from "./dialog2Messages2Common.module.scss";
import Dialog2Render from "./Dialog2/Dialog2Render";
import Messages2Render from "./Messages2/Messages2Render";
import {getDialog2AllType} from "../../api/apiTypes";


type Dialog2RenderType = {
    patch: string,// имя страницы из URL
    PageWidth: number, // ширина страницы
    MobileWidth: number, // ширина страницы, считающаяся мобильной версткой
    Dialog2All: getDialog2AllType, // список всех диалогов для левой колонки
}


const Dialog2Messages2Common: React.FC<Dialog2RenderType> = (
    {patch, PageWidth, MobileWidth, Dialog2All}
    ) => {
    return <div className={classesCommon.dialog2Messages2Common}>
        {/*Отрисовка поля диалогов*/}
        <Dialog2Render PageWidth={PageWidth} MobileWidth={MobileWidth} patch={patch} Dialog2All={Dialog2All}/>

        <Messages2Render PageWidth={PageWidth} MobileWidth={MobileWidth} patch={patch}/>

    </div>
}
export default Dialog2Messages2Common
