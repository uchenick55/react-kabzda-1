import React from "react";
import classes from "./messages2Render.module.scss"

type Messages2ItemType = {
    id: string// "cde7821a-6981-4f49-8b12-faf681cb1621",
    body: string// "555",
    addedAt: string// "2023-05-01T07:13:00.54",
    senderId: number// 25528,
    senderName: string// "evgeniysazonov1983",
    recipientId: number//27045,
    recipientName: string// "evgeniysazonov",
    viewed: boolean// false,
    Msg2DeleteMessage: (message2Id: string) => void // удаление сообщения по его id
    myId: number // номер моего id

}
const Messages2Item: React.FC<Messages2ItemType> = (
    {id, body, Msg2DeleteMessage, addedAt, senderId, senderName, recipientId, recipientName, viewed, myId}) => {
    console.log( "Messages2Item" )
    return <div className={`${classes.myIdNotMyIdMsg2ComExt} ${myId===senderId?classes.myIdMessageExt: classes.NOTmyIdMessageExt}`}>
        <div className={`${classes.myIdNotMyIdMsg2ComInt} ${myId===senderId?classes.myIdMessageInt: classes.NOTmyIdMessageInt}`}  onClick={() => {
            Msg2DeleteMessage( id )
        }}>{body}</div>

    </div>
}
//React.memo(
export default React.memo( Messages2Item )
