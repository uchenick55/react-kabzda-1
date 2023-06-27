import Msg2HeaderNamePhoto from "./Msg2HeaderNamePhoto";
import React from "react";
import {D2ItemType} from "../../../api/apiTypes";
import {useSelector} from "react-redux";
import {GlobalStateType} from "../../../../redux/store-redux";

const Msg2HeaderNamePhotoContainer:React.FC = () => {
    console.log("шапка сообщений - контейнер")
    const d2Item: D2ItemType = useSelector( (state: GlobalStateType) => state.dialog2.d2Item )// отфильтрованый  из dialog2All выбранный пользователь по userId
    const pageWidth: number = useSelector( (state: GlobalStateType) => state.app.pageWidth )// ширина страницы
    const mobileWidth: number = useSelector( (state: GlobalStateType) => state.app.mobileWidth )// ширина страницы, считающаяся мобильной версткой

    const isMobile = pageWidth < mobileWidth // это мобильная верстка?

    return <Msg2HeaderNamePhoto d2Item={d2Item} isMobile={isMobile}/>
}
export default Msg2HeaderNamePhotoContainer
