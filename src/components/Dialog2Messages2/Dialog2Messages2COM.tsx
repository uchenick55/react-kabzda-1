import React from "react";
import classesCommon from "./Messages2/msg2.module.css";
import Dialog2Render from "./Dialog2/Dialog2Render";
import Messages2Render from "./Messages2/Messages2Render";
import {GetDialog2AllType} from "../api/apiTypes";


type Dialog2RenderType = {
    patch: string,// имя страницы из URL
    pageWidth: number, // ширина страницы
    mobileWidth: number, // ширина страницы, считающаяся мобильной версткой
    dialog2All: GetDialog2AllType, // список всех диалогов для левой колонки
}

const Dialog2Messages2COM: React.FC<Dialog2RenderType> = (
    {patch, pageWidth, mobileWidth, dialog2All}
) => {
    return <div className={classesCommon.dialog2Messages2Common}>
        {/*Отрисовка поля диалогов*/}
        <Dialog2Render pageWidth={pageWidth} mobileWidth={mobileWidth} patch={patch} dialog2All={dialog2All}/>

        <Messages2Render/> {/* отрисовка сообщений (шапка, сообщения, поле ввода)*/}
    </div>
}
export default Dialog2Messages2COM
