import React from "react";
import classesCommon from "./dialog2Messages2COM.module.scss";
import Dialog2Render from "./Dialog2/Dialog2Render";
import Messages2Render from "./Messages2/Messages2Render";
import {getDialog2AllType, newMessagesItem, sendMessageType} from "../api/apiTypes";


type Dialog2RenderType = {
    patch: string,// имя страницы из URL
    PageWidth: number, // ширина страницы
    MobileWidth: number, // ширина страницы, считающаяся мобильной версткой
    userId: number, // id пользователя из URL
    Dialog2All: getDialog2AllType, // список всех диалогов для левой колонки
    MessagesNewerThen: Array<sendMessageType> // сообщения выбранного диалога, новее заданной даты
    D2Item: newMessagesItem, // отфильтрованый  из Dialog2All выбранный пользователь по userId
    myId: number // номер моего id
    Msg2DeleteMessage: (message2Id: string) => void // удаление сообщения по его id
    Msg2SendMessage: (messageBody:string) => void // отправить сообщение указанному пользователю
    MSG2ScrollBottom: () => void // колбек прокрутки вниз сообщений после отправки нового сообщения
    Msg2MarkAsSpam: (message2Id: string)=> void // пометить сообщение как спам
    Msg2Restore:  (message2Id: string)=> void // восстановить сообщение из спама и удаленных
}

const Dialog2Messages2COM: React.FC<Dialog2RenderType> = (
    {patch, PageWidth, MobileWidth, Dialog2All, MessagesNewerThen, Msg2DeleteMessage, Msg2SendMessage, userId,
        D2Item, MSG2ScrollBottom, myId, Msg2MarkAsSpam, Msg2Restore}
    ) => {
    return <div className={classesCommon.dialog2Messages2Common}>
        {/*Отрисовка поля диалогов*/}
        <Dialog2Render PageWidth={PageWidth} MobileWidth={MobileWidth} patch={patch} Dialog2All={Dialog2All}/>

        <Messages2Render PageWidth={PageWidth} MobileWidth={MobileWidth} patch={patch}
                         MessagesNewerThen={MessagesNewerThen} Msg2DeleteMessage={Msg2DeleteMessage}
                         Msg2SendMessage={Msg2SendMessage} userId={userId} D2Item={D2Item}
                         MSG2ScrollBottom={MSG2ScrollBottom} myId={myId} Msg2MarkAsSpam={Msg2MarkAsSpam}
                         Msg2Restore={Msg2Restore}
        />
    </div>
}
export default Dialog2Messages2COM
