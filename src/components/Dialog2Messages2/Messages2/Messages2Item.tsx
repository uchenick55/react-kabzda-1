import React from "react";

type Messages2ItemType = {
   id: string// "cde7821a-6981-4f49-8b12-faf681cb1621",
   body: string// "555",
    addedAt: string// "2023-05-01T07:13:00.54",
    senderId:number// 25528,
    senderName:string// "evgeniysazonov1983",
    recipientId: number//27045,
    recipientName:string// "evgeniysazonov",
    viewed: boolean// false,
    Msg2DeleteMessage: (message2Id: string) => void // удаление сообщения по его id

}
const Messages2Item: React.FC<Messages2ItemType> = (
    {id, body, Msg2DeleteMessage, addedAt, senderId, senderName, recipientId, recipientName, viewed })=>{
    console.log("Messages2Item")
    return <div>
        <span onClick={()=>{
            Msg2DeleteMessage(id)
        }}>{body}</span> {"- "}
        <span>{recipientId}</span>

    </div>
}
//React.memo(
export default React.memo(Messages2Item)
