import React, {memo} from "react";
import classesCommon from "./dialog2Messages2COM.module.scss";
import Dialog2Render from "./Dialog2/Dialog2Render";
import Messages2Render from "./Messages2/Messages2Render";
import {GetDialog2AllType, D2ItemType, SendMessageType} from "../api/apiTypes";


type Dialog2RenderType = {
    patch: string,// имя страницы из URL
    PageWidth: number, // ширина страницы
    MobileWidth: number, // ширина страницы, считающаяся мобильной версткой
    userId: number, // id пользователя из URL
    Dialog2All: GetDialog2AllType, // список всех диалогов для левой колонки
    MessagesNewerThen: Array<SendMessageType> // сообщения выбранного диалога, новее заданной даты
    D2Item: D2ItemType, // отфильтрованый  из Dialog2All выбранный пользователь по userId
    myId: number // номер моего id
    Msg2SendMessage: (messageBody:string) => void // отправить сообщение указанному пользователю
 }

const Dialog2Messages2COM: React.FC<Dialog2RenderType> = memo( (
    {patch, PageWidth, MobileWidth, Dialog2All, MessagesNewerThen, Msg2SendMessage, userId,
        D2Item, myId}
    ) => {
    return <div className={classesCommon.dialog2Messages2Common}>
        {/*Отрисовка поля диалогов*/}
        <Dialog2Render PageWidth={PageWidth} MobileWidth={MobileWidth} patch={patch} Dialog2All={Dialog2All}/>

        <Messages2Render PageWidth={PageWidth} MobileWidth={MobileWidth} patch={patch}
                         MessagesNewerThen={MessagesNewerThen} Msg2SendMessage={Msg2SendMessage}
                         userId={userId} D2Item={D2Item} myId={myId}
        />
    </div>
})
export default Dialog2Messages2COM
