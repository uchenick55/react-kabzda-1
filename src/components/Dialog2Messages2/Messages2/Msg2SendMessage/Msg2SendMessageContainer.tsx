import Msg2SendMessageRender from "./Msg2SendMessageRender";
import React, {useEffect} from "react";
import {
    postDialog2MessageThCr,
    putDialog2StartThCr
} from "../../../../redux/dialog2-reducer";
import {useDispatch, useSelector} from "react-redux";
import {GlobalStateType} from "../../../../redux/store-redux";

const Msg2SendMessageContainer: React.FC = () => {
    console.log( "поле ввода новых сообщений - контейнер" )

    const dispatch = useDispatch()
    const userId: number = useSelector((state:GlobalStateType) => state.dialog2.d2Item.id )
    const pageWidth: number = useSelector( (state: GlobalStateType) => state.app.pageWidth )// ширина страницы
    const mobileWidth: number = useSelector( (state: GlobalStateType) => state.app.mobileWidth )// ширина страницы, считающаяся мобильной версткой

    const Msg2SendMessage = (messageBody: string) => {
        dispatch( postDialog2MessageThCr( messageBody, "2022-04-30T19:10:31.843") )// отправить сообщение указав ID пользователя
    }

    const isMobile = pageWidth < mobileWidth // это мобильная верстка?

    return <Msg2SendMessageRender Msg2SendMessage={Msg2SendMessage} isMobile={isMobile}/>
}
export default Msg2SendMessageContainer

