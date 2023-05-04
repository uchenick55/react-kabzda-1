import React from "react";
import classes from "./messages2Render.module.scss"
import {sendMessageType} from "../../../api/apiTypes";
import Messages2Item from "./Messages2Item";

type Dialog2RenderType = {
    PageWidth: number
    MobileWidth: number
    patch: string,
    MessagesNewerThen: Array<sendMessageType> // сообщения выбранного диалога, новее заданной даты
    Msg2DeleteMessage: (message2Id: string) => void // удаление сообщения по его id

}
const Messages2Render: React.FC<Dialog2RenderType> = ({PageWidth, MobileWidth, patch, MessagesNewerThen, Msg2DeleteMessage}) => {
    return <div>
        {patch === "dialog2" && PageWidth > MobileWidth && <div
            //- предложение выбрать диалог
            // эта часть отображается только на странице dialog и только в десктопной версии
            //  Fixed все остальное поле справа.
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
                имя собеседника и ссылка картинка на его профиль
            </div>
            <div //fixed справа вверху - имя собеседника и ссылка картинка на его профиль
                // отображается всегда на странице messages
                className={`${classes.Fixed} ${classes.messages2RenderMessages} ${PageWidth < MobileWidth ?
                    classes.MobileMessagesLeft : classes.DesktopMessagesLeft}`}
            >
                {MessagesNewerThen.map(m2=>{ // отрисовка всех сообщений
                    const {id, body, addedAt, senderId, senderName, recipientId, recipientName, viewed,
                        deletedBySender, deletedByRecipient, isSpam  } = m2
                    return <Messages2Item key={id} id={id} body={body} Msg2DeleteMessage={Msg2DeleteMessage}
                                          addedAt={addedAt} senderId={senderId}
                                          senderName={senderName} recipientId={recipientId}
                                          recipientName={recipientName} viewed={viewed}
                                          />
                    //  id: string// "cde7821a-6981-4f49-8b12-faf681cb1621",
                    //  body: string// "555",
                    //     addedAt: string// "2023-05-01T07:13:00.54",
                    // senderId:number// 25528,
                    //senderName:string// "evgeniysazonov1983",
                    //recipientId: number//27045,
                    //recipientName:string// "evgeniysazonov",
                    //viewed: boolean// false,
                    //deletedBySender:boolean//false,
                    // deletedByRecipient:boolean //false,
                    //isSpam: boolean//false,
                    return <div></div>
                })}

            </div>
            <div//fixed справа вверху - имя собеседника и ссылка картинка на его профиль
                // отображается всегда на странице messages
                className={`${classes.Fixed} ${classes.messages2PrintMessage} ${PageWidth < MobileWidth ?
                    classes.MobileMessagesLeft : classes.DesktopMessagesLeft}`}
            >
               здесь печатаем новые сообщения
            </div>
        </div>
        }

    </div>

}
export default Messages2Render
