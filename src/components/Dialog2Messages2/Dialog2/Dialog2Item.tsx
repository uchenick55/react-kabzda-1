import React, {memo} from "react";
import classes from "./dialog2Render.module.css"
import userPhoto from "../../../assets/images/no-image3.png";
import {NavLink} from "react-router-dom";
import GetDate from "../../common/GetDate";

type Dialog2ItemType = {
    userName: string, //"evgeniysazonov"
    hasNewMessages: boolean,
    lastDialogActivityDate: string, //"2023-04-30T19:10:31.843"
    newMessagesCount: number, //0
    photosSmall: string,// "https://social-network.samuraijs.com/activecontent/images/users/27045/user-small.jpg?v=1",
    id: number
}
const Dialog2Item: React.FC<Dialog2ItemType> = memo ( (
    {userName, hasNewMessages, photosSmall, lastDialogActivityDate, newMessagesCount, id}) => {
    console.log("Dialog2Item")
    const DateLocal = GetDate(lastDialogActivityDate) // получаем дату последнего сообщения
    return <div className={classes.Dialog2ItemCardExt}>
        <NavLink to={'/messages/' + id}>
            <div className={classes.Dialog2ItemCardInt}>
                <div className={classes.Dialog2ItemCardName}>{userName}</div>   {/*Имя пользователя*/}
                {hasNewMessages && <div
                    className={classes.Dialog2ItemCardNewMsgCnt}>{newMessagesCount}</div>} {/*вывод количества новых сообщений*/}
                <img src={photosSmall ? photosSmall : userPhoto} className={classes.Dialog2ItemCardPhoto}
                     alt="CardPhoto"/> {/*Фото*/}
                <div className={classes.Dialog2ItemCardMsgTime}>{

                    DateLocal.isToday
                        ? <span> {DateLocal.Hour }:{DateLocal.Minutes}</span>
                        : <span> {DateLocal.Day } {DateLocal.Month} {DateLocal.Year}</span>

                }</div>
                {/*Время*/}
            </div>
        </NavLink>
    </div>
})
export default Dialog2Item
