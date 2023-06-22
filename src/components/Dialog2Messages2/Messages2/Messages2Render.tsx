import React, {memo} from "react";
import classes from "./messages2Render.module.scss"
import {D2ItemType, SendMessageType} from "../../api/apiTypes";
import Messages2Item from "./Messages2Item";
import Msg2SendMessageRender from "./Msg2SendMessageRender";
import Msg2HeaderNamePhoto from "./Msg2HeaderNamePhoto";

type Dialog2RenderType = {
    patch: string,// имя страницы из URL
    pageWidth: number, // ширина страницы
    mobileWidth: number, // ширина страницы, считающаяся мобильной версткой
    userId: number, // id пользователя из URL
    myId: number // номер моего id

    messagesNewerThen: Array<SendMessageType> // сообщения выбранного диалога, новее заданной даты
    d2Item: D2ItemType // отфильтрованый  из dialog2All выбранный пользователь по userId

    Msg2SendMessage: (messageBody: string) => void // отправить сообщение указанному пользователю

}
const Messages2Render: React.FC<Dialog2RenderType> = memo( (
    {
        pageWidth, mobileWidth, patch, messagesNewerThen, Msg2SendMessage, userId,
        d2Item, myId
    }) => {

    return <div>
        {patch === "dialog2" && pageWidth > mobileWidth && <div
            //- предложение выбрать диалог.Fixed все остальное поле справа.
            // эта часть отображается только на странице dialog и только в десктопной версии
            className={`${classes.Fixed} ${classes.messages2ChooseDialog}`}
        > Выберите диалог
        </div>}

        {patch === "messages" &&
        <div // эта часть компоненты Messages2Render отрисовывается на странице messages всегда.
        >
            <div
                //fixed справа вверху - имя собеседника и ссылка картинка на его профиль
                // отображается всегда на странице messages
                className={`${classes.Fixed} ${classes.messages2NameAndProfileLink} ${pageWidth < mobileWidth ?
                    classes.MobileMessagesLeft : classes.DesktopMessagesLeft}`}
            >
                <Msg2HeaderNamePhoto userId={userId} d2Item={d2Item}/>

            </div>
            <div //fixed справа вверху - имя собеседника и ссылка картинка на его профиль
                // отображается всегда на странице messages
                className={`${classes.Fixed} ${classes.messages2RenderMessages} ${pageWidth < mobileWidth ?
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
            <div//fixed справа вверху - имя собеседника и ссылка картинка на его профиль
                // отображается всегда на странице messages
                className={`${classes.Fixed} ${classes.messages2PrintMessage} ${pageWidth < mobileWidth ?
                    classes.MobileMessagesLeft : classes.DesktopMessagesLeft}`}
            >
                <Msg2SendMessageRender Msg2SendMessage={Msg2SendMessage}/>
            </div>
        </div>
        }

    </div>

})
export default Messages2Render
