import React from "react";
import classes from "./dialog2Render.module.css"
import userPhoto from "../../../../assets/images/no-image3.png";

type Dialog2ItemType = {
    userName: string, //"evgeniysazonov"
    hasNewMessages: boolean,
    lastDialogActivityDate: string, //"2023-04-30T19:10:31.843"
    newMessagesCount: number, //0
    photos: {
        small: string,// "https://social-network.samuraijs.com/activecontent/images/users/27045/user-small.jpg?v=1",
        large: string// "https://social-network.samuraijs.com/activecontent/images/users/27045/user.jpg?v=1"
    }
}
const Dialog2Item: React.FC<Dialog2ItemType> = (
    {userName, hasNewMessages, photos, lastDialogActivityDate, newMessagesCount}) => {
    return <div className={classes.Dialog2ItemCardExt}>
        <div className={classes.Dialog2ItemCardInt}>
            <div className={classes.Dialog2ItemCardName}>{userName}</div>
            <img src={photos.small?photos.small:userPhoto} className={classes.Dialog2ItemCardPhoto} alt="CardPhoto"/>
        </div>
    </div>
}
export default Dialog2Item
