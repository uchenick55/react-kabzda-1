import React from "react";
import classes from "./messages2Render.module.scss"
import {newMessagesItem, sendMessageType} from "../../api/apiTypes";
import Messages2Item from "./Messages2Item";
import Msg2SendMessageRender from "./Msg2SendMessageRender";
import Msg2HeaderNamePhoto from "./Msg2HeaderNamePhoto";

type Dialog2RenderType = {
    patch: string,// имя страницы из URL
    PageWidth: number, // ширина страницы
    MobileWidth: number, // ширина страницы, считающаяся мобильной версткой
    userId: number, // id пользователя из URL
    MessagesNewerThen: Array<sendMessageType> // сообщения выбранного диалога, новее заданной даты
    D2Item: newMessagesItem // отфильтрованый  из Dialog2All выбранный пользователь по userId
    myId: number // номер моего id
    Msg2DeleteMessage: (message2Id: string) => void // удаление сообщения по его id
    Msg2SendMessage: (messageBody: string) => void // отправить сообщение указанному пользователю
    Msg2MarkAsSpam: (message2Id: string)=> void // пометить сообщение как спам
    Msg2Restore:  (message2Id: string)=> void // восстановить сообщение из спама и удаленных

}
const Messages2Render: React.FC<Dialog2RenderType> = (
    {
        PageWidth, MobileWidth, patch, MessagesNewerThen, Msg2DeleteMessage, Msg2SendMessage, userId,
        D2Item, myId, Msg2MarkAsSpam, Msg2Restore
    }) => {
    return <div>
        {patch === "dialog2" && PageWidth > MobileWidth && <div
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
                className={`${classes.Fixed} ${classes.messages2NameAndProfileLink} ${PageWidth < MobileWidth ?
                    classes.MobileMessagesLeft : classes.DesktopMessagesLeft}`}
            >
                <Msg2HeaderNamePhoto userId={userId} D2Item={D2Item}/>

            </div>
            <div //fixed справа вверху - имя собеседника и ссылка картинка на его профиль
                // отображается всегда на странице messages
                className={`${classes.Fixed} ${classes.messages2RenderMessages} ${PageWidth < MobileWidth ?
                    classes.MobileMessagesLeft : classes.DesktopMessagesLeft}`}
            >
                {MessagesNewerThen.map( m2 => { // отрисовка всех сообщений
                    const {
                        id, body, addedAt, senderId, deletedBySender, isSpam
                    } = m2
                    return <Messages2Item key={id} id={id} body={body} Msg2DeleteMessage={Msg2DeleteMessage}
                                          addedAt={addedAt} senderId={senderId} myId={myId}
                                          Msg2MarkAsSpam={Msg2MarkAsSpam} Msg2Restore={Msg2Restore}
                                          deletedBySender={deletedBySender} isSpam={isSpam}
                    />
                } )}
                <div className="second-block"></div>
                {/* метка прокуртки сообщений при каждом обновлении списка сообщений*/}
            </div>
            <div//fixed справа вверху - имя собеседника и ссылка картинка на его профиль
                // отображается всегда на странице messages
                className={`${classes.Fixed} ${classes.messages2PrintMessage} ${PageWidth < MobileWidth ?
                    classes.MobileMessagesLeft : classes.DesktopMessagesLeft}`}
            >
                <Msg2SendMessageRender Msg2SendMessage={Msg2SendMessage}/>
            </div>
        </div>
        }

    </div>

}
export default Messages2Render
