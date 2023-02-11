import Message from "./Message";
import React from "react";

let MessagesElements = ({messages2, myId, deleteMessage}) => messages2.map((m) => // подкомпонента отрисовки всех сообщений через map
    <Message key={m.id+m.message} message={m.message} myId={myId} userId={m.userId} Date={m.Date} MessageId={m.id}
             deleteMessage={deleteMessage}/>);

export default MessagesElements
