import React, {memo, useState} from "react";
import classes from "../msg2.module.css"
import Msg2DropDownMenu from "./Msg2DropDownMenu";
import dustBin from "../../../../assets/images/swg/dust-bin2.svg"
import Spam from "../../../../assets/images/swg/spam1.svg"
import GetDate from "../../../common/GetDate";

type Messages2ItemType = {
    id: string// "cde7821a-6981-4f49-8b12-faf681cb1621",
    body: string// "555",
    addedAt: string// "2023-05-01T07:13:00.54",
    addedAtPrev: string// "2023-05-01T07:13:00.54",
    senderId: number// 25528,
    myId: number // номер моего id
    deletedBySender: boolean // помечено, удалено отправителем
    isSpam: boolean // помечено как спам

}
const Messages2Item: React.FC<Messages2ItemType> = memo (   (
    {
        id, body, addedAt, senderId, myId, deletedBySender,
        isSpam, addedAtPrev
    }) => {
   // console.log("Messages2Item")
    const DateLocal = GetDate( addedAt ) // дата из текста со смещением + 3 часа
    const PrevDateLocal = GetDate( addedAtPrev ) // предыдущая дата из текста со смещением + 3 часа

    const isMyMessage: boolean = myId === senderId ? true : false // индикатор, что мое сообщение
    const [IdMsg2DropDowShowed, setIdMsg2DropDowShowed] = useState<string>( "" ) // показать ли контекстное меню
    return <div>
        {
            `${DateLocal.Day}-${DateLocal.Month}-${DateLocal.Year}` !== // дата текущего рендера
            `${PrevDateLocal.Day}-${PrevDateLocal.Month}-${PrevDateLocal.Year}` && // не равна дате предыдущего рендера
            // тогда отображаем дату в списке сообщений
            <div className={classes.Msg2DateExt}>
                <div className={classes.Msg2DateInt}>
                    {DateLocal.Day}.{DateLocal.Month}.{DateLocal.Year}</div>
                {/* дата сообщений*/}
            </div>}

        <div
            className={`${classes.myIdNotMyIdMsg2ComExt} ${isMyMessage ? classes.myIdMessageExt : classes.NOTmyIdMessageExt}`}>
            <div
                className={
                    `${classes.myIdNotMyIdMsg2ComInt} ${isMyMessage ? classes.myIdMessageInt : classes.NOTmyIdMessageInt}`}
                onMouseOver={() => { // при наведении на сообщение, записываем в локальный стейт id сообщения
                    setIdMsg2DropDowShowed( id )
                }}
                onMouseLeave={() => {
                    setIdMsg2DropDowShowed( "" ) // при убирании мышки с сообщения, очищаем id локльного стейта нведенного сообщения
                }}
            >
                {deletedBySender
                    ? <div //если помечено как удаленное, отобразит текст удаления и картинку корзины
                    >
                        <img className={classes.Msg2DeletedPic} src={dustBin} alt=""/>
                        <div className={classes.Msg2DeletedText}> это сообщение удалено</div>
                    </div>
                    : <div className={classes.Msg2Body}>{body}</div>//тело сообщения
                }
                <div
                    className={`${classes.Msg2ItemAdedAtCommon} ${isMyMessage ? classes.ColorMy : classes.ColorNotMy}`}>
                    {DateLocal.Hour}:{DateLocal.Minutes}
                </div>
                {/*Время*/}
                {isSpam && <img className={classes.Msg2SpamPic} src={Spam} alt=""/>

                }
                <div className={classes.Msg2DropDownMenuExt}>

                    {IdMsg2DropDowShowed === id && // отрисовываем dropDown в сообщения только для локального IdMsg2DropDowShowed
                    <Msg2DropDownMenu  id={id} isMyMessage={isMyMessage}
                                      deletedBySender={deletedBySender} isSpam={isSpam}

                    />}
                </div>
            </div>
        </div>
    </div>
})
export default Messages2Item
