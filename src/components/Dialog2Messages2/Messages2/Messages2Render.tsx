import React from "react";
import classes from "./messages2Render.module.scss"
import {getDialog2AllType, sendMessageType} from "../../api/apiTypes";
import Messages2Item from "./Messages2Item";
import Msg2SendMessageRender from "./Msg2SendMessageRender";
import Msg2HeaderNamePhoto from "./Msg2HeaderNamePhoto";

type Dialog2RenderType = {
    patch: string,// имя страницы из URL
    PageWidth: number, // ширина страницы
    MobileWidth: number, // ширина страницы, считающаяся мобильной версткой
    MessagesNewerThen: Array<sendMessageType> // сообщения выбранного диалога, новее заданной даты
    Msg2DeleteMessage: (message2Id: string) => void // удаление сообщения по его id
    Msg2SendMessage: (messageBody: string) => void // отправить сообщение указанному пользователю
    Dialog2All: getDialog2AllType, // список всех диалогов для левой колонки

}
const Messages2Render: React.FC<Dialog2RenderType> = (
    {PageWidth, MobileWidth, patch, MessagesNewerThen, Msg2DeleteMessage, Msg2SendMessage, Dialog2All}) => {

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
                <Msg2HeaderNamePhoto Dialog2All={Dialog2All} />

            </div>
            <div //fixed справа вверху - имя собеседника и ссылка картинка на его профиль
                // отображается всегда на странице messages
                className={`${classes.Fixed} ${classes.messages2RenderMessages} ${PageWidth < MobileWidth ?
                    classes.MobileMessagesLeft : classes.DesktopMessagesLeft}`}
            >
                {MessagesNewerThen.map( m2 => { // отрисовка всех сообщений
                    const {
                        id, body, addedAt, senderId, senderName, recipientId, recipientName, viewed,
                      //  deletedBySender, deletedByRecipient, isSpam
                    } = m2
                    return <Messages2Item key={id} id={id} body={body} Msg2DeleteMessage={Msg2DeleteMessage}
                                          addedAt={addedAt} senderId={senderId}
                                          senderName={senderName} recipientId={recipientId}
                                          recipientName={recipientName} viewed={viewed}
                    />
                } )}

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
