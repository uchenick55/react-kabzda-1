import Message from "./MessageBS";
import React from "react";
import {messages2Type, NulableType} from "../../../../types/commonTypes";

type MessagesElementsType = {
    messages2: NulableType<Array<messages2Type>>, // массив сообщений текущего диалога
    myId: number, // мой ID (авторизованного пользователя)
    deleteMessage: (messageID: number) => void,

}
const MessagesElements: React.FC<MessagesElementsType> = ({messages2, myId, deleteMessage}) => {

    return <div>
        {messages2 !== null && // если массив сообщений не пустой
        messages2.map( (m) => // подкомпонента отрисовки всех сообщений через map
            <Message key={m.id + m.message} message={m.message} myId={myId} userId={m.userId} Date={m.Date}
                     MessageId={m.id} deleteMessage={deleteMessage}/> )}

    </div>
}
export default MessagesElements
