import React from "react";
import {getDialog2AllType, newMessagesItem} from "../../api/apiTypes";
import classes from "./messages2Render.module.scss"
import userPhoto from "../../../assets/images/no-image3.png";

type Msg2HeaderNamePhotoType = {
    Dialog2All: getDialog2AllType, // список всех диалогов для левой колонки
    userId: number, // id пользователя из URL
    D2Item: newMessagesItem // отфильтрованый  из Dialog2All выбранный пользователь по userId

}
const Msg2HeaderNamePhoto:React.FC<Msg2HeaderNamePhotoType> = ({Dialog2All, userId, D2Item}) => {
    const photoSrc = D2Item&&D2Item.photos&& D2Item.photos.small? D2Item.photos.small : userPhoto // фото с сервера или заглушка
    return <div>
        {D2Item && <div>
            <div className={classes.Msg2HeaderName}>{D2Item && D2Item.userName}</div>
            <img className={classes.Msg2HeaderPhoto} src={photoSrc} alt="photoSrc"/>
            <div className={classes.Msg2HeaderActivityDate} >Был(а): {" "}
                {D2Item && D2Item.lastUserActivityDate && D2Item.lastUserActivityDate.slice(0, 10)}
            </div>
        </div>}
   </div>
}
export default React.memo(Msg2HeaderNamePhoto) // сокращаем число ререндеров
