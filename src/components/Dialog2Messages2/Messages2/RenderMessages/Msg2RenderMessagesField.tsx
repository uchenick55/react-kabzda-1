import React from "react";
import classes from "../msg2.module.css"
import Messages2Item from "./Messages2Item";
import {SendMessageType} from "../../../api/apiTypes";

interface IRenderMessages {
    isMobile: boolean, // это мобильная верстка?
    myId: number, // номер моего id
    messagesNewerThen: Array<SendMessageType>, // сообщения выбранного диалога, новее заданной даты

}
const Msg2RenderMessagesField:React.FC<IRenderMessages> = ({messagesNewerThen, myId, isMobile }) => {
    console.log("отрисовка сообщений")

    return <div //отрисовка всех сообщений
        // отображается всегда на странице messages
        className={`${classes.Fixed} ${classes.messages2RenderMessages} ${isMobile ?
            classes.MobileMessagesLeft : classes.DesktopMessagesLeft}`}
    >
        {messagesNewerThen.map( (m2, Ind, Arr) => { // отрисовка всех сообщений
            const {
                id, body, addedAt, senderId, deletedBySender, isSpam
            } = m2
            const addedAtPrev = Ind>0
                ?   Arr[Ind-1].addedAt // дата добавления предыдущего сообщения
                :   ""
            return <Messages2Item key={id} id={id} body={body}
                                  addedAt={addedAt} senderId={senderId} myId={myId}
                                  deletedBySender={deletedBySender} isSpam={isSpam}  addedAtPrev={addedAtPrev}
            />
        } )}
        <div className="second-block"></div>
        {/* метка прокуртки сообщений при каждом обновлении списка сообщений*/}
    </div>
}
export default Msg2RenderMessagesField
