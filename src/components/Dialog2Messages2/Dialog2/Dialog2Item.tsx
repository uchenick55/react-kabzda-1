import React from "react";
import classes from "./dialog2Render.module.css"
import userPhoto from "../../../assets/images/no-image3.png";
import {NavLink} from "react-router-dom";

type Dialog2ItemType = {
    userName: string, //"evgeniysazonov"
    hasNewMessages: boolean,
    lastDialogActivityDate: string, //"2023-04-30T19:10:31.843"
    newMessagesCount: number, //0
    photos: {
        small: string,// "https://social-network.samuraijs.com/activecontent/images/users/27045/user-small.jpg?v=1",
        large: string// "https://social-network.samuraijs.com/activecontent/images/users/27045/user.jpg?v=1"
    },
    id: number
}
const Dialog2Item: React.FC<Dialog2ItemType> = (
    {userName, hasNewMessages, photos, lastDialogActivityDate, newMessagesCount, id}) => {
    //console.log("Dialog2Item")
    return <div className={classes.Dialog2ItemCardExt}>
        <NavLink to={'/messages/' + id}>
            <div className={classes.Dialog2ItemCardInt}>
                <div className={classes.Dialog2ItemCardName}>{userName}</div>   {/*Имя пользователя*/}
                <div className={classes.Dialog2ItemCardId}>{id}</div>   {/*Имя пользователя*/}
                {hasNewMessages && <div
                    className={classes.Dialog2ItemCardNewMsgCnt}>{newMessagesCount}</div>} {/*вывод количества новых сообщений*/}
                <img src={photos.small ? photos.small : userPhoto} className={classes.Dialog2ItemCardPhoto}
                     alt="CardPhoto"/> {/*Фото*/}
                <div className={classes.Dialog2ItemCardMsgTime}>{lastDialogActivityDate.slice( 11, 16 )}</div>
                {/*Время*/}
            </div>
        </NavLink>
    </div>
}
export default React.memo(Dialog2Item)
