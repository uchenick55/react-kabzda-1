import Msg2RenderMessagesField from "./Msg2RenderMessagesField";
import {useSelector} from "react-redux";
import {GlobalStateType} from "../../../../redux/store-redux";
import {SendMessageType} from "../../../api/apiTypes";
import React from "react";

const Msg2RenderMessagesFieldContainer: React.FC = () => {
    console.log("отрисовка сообщений - контейнер")
    const pageWidth: number = useSelector( (state: GlobalStateType) => state.app.pageWidth )// ширина страницы
    const mobileWidth: number = useSelector( (state: GlobalStateType) => state.app.mobileWidth )// ширина страницы, считающаяся мобильной версткой
    const messagesNewerThen: Array<SendMessageType> = useSelector( (state: GlobalStateType) => state.dialog2.messagesNewerThen )// сообщения выбранного диалога, новее заданной даты
    const myId: number = useSelector( (state: GlobalStateType) => state.auth.myId )// номер моего id

    const isMobile = pageWidth < mobileWidth
    return <Msg2RenderMessagesField
        messagesNewerThen={messagesNewerThen}
        myId={myId}
        isMobile={isMobile}
    />
}
export default Msg2RenderMessagesFieldContainer
