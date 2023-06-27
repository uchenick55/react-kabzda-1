import React from "react";
import classes from "./msg2.module.css"
import Msg2SendMessageContainer from "./Msg2SendMessage/Msg2SendMessageContainer";
import Msg2HeaderNamePhotoContainer from "./Msg2HeaderNamePhoto/Msg2HeaderNamePhotoContainer";
import Msg2RenderMessagesFieldContainer from "./RenderMessages/Msg2RenderMessagesFieldContainer";
import {useSelector} from "react-redux";
import {GlobalStateType} from "../../../redux/store-redux";

const Messages2Render: React.FC = () => {
    const patch: string = useSelector( (state: GlobalStateType) => state.app.patch )// имя страницы из URL
    const pageWidth: number = useSelector( (state: GlobalStateType) => state.app.pageWidth )// ширина страницы
    const mobileWidth: number = useSelector( (state: GlobalStateType) => state.app.mobileWidth )// ширина страницы, считающаяся мобильной версткой

    const isMobile = pageWidth < mobileWidth // это мобильная верстка?

    return <div>
        {patch === "dialog2" && !isMobile && <div
            //- предложение выбрать диалог
            // эта часть отображается только на странице dialog и только в десктопной версии
            className={`${classes.Fixed} ${classes.messages2ChooseDialog}`}
        > Выберите диалог
        </div>}

        {patch === "messages" &&
        <div // эта часть компоненты Messages2Render отрисовывается на странице messages всегда.
        >
            <Msg2HeaderNamePhotoContainer/> {/* шапка поля сообщений (ссылка на профиль собеседника и доп информация)*/}

            <Msg2RenderMessagesFieldContainer/> {/* отрисовка сообщений с собеседником*/}

            <Msg2SendMessageContainer/> {/* поле ввода новых сообщений*/}
        </div>
        }

    </div>

}
export default Messages2Render
