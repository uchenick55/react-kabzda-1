import React, {memo} from "react";
import classesCommon from "./dialog2Messages2COM.module.scss";
import Dialog2Render from "./Dialog2/Dialog2Render";
import Messages2Render from "./Messages2/Messages2Render";
import {GetDialog2AllType, D2ItemType, SendMessageType} from "../api/apiTypes";


type Dialog2RenderType = {
    patch: string,// имя страницы из URL
    pageWidth: number, // ширина страницы
    mobileWidth: number, // ширина страницы, считающаяся мобильной версткой
    userId: number, // id пользователя из URL
    dialog2All: GetDialog2AllType, // список всех диалогов для левой колонки
    messagesNewerThen: Array<SendMessageType> // сообщения выбранного диалога, новее заданной даты
    d2Item: D2ItemType, // отфильтрованый  из dialog2All выбранный пользователь по userId
    myId: number // номер моего id
    Msg2SendMessage: (messageBody:string) => void // отправить сообщение указанному пользователю
 }

const Dialog2Messages2COM: React.FC<Dialog2RenderType> = memo( (
    {patch, pageWidth, mobileWidth, dialog2All, messagesNewerThen, Msg2SendMessage, userId,
        d2Item, myId}
    ) => {
    return <div className={classesCommon.dialog2Messages2Common}>
        {/*Отрисовка поля диалогов*/}
        <Dialog2Render pageWidth={pageWidth} mobileWidth={mobileWidth} patch={patch} dialog2All={dialog2All}/>

        <Messages2Render pageWidth={pageWidth} mobileWidth={mobileWidth} patch={patch}
                         messagesNewerThen={messagesNewerThen} Msg2SendMessage={Msg2SendMessage}
                         userId={userId} d2Item={d2Item} myId={myId}
        />
    </div>
})
export default Dialog2Messages2COM
