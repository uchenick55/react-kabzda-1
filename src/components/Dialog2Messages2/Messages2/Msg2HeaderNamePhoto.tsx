import React, {memo} from "react";
import {D2ItemType} from "../../api/apiTypes";
import classes from "./messages2Render.module.scss"
import userPhoto from "../../../assets/images/no-image3.png";
import {NavLink} from "react-router-dom";
import GetDate from "../../common/GetDate";

type Msg2HeaderNamePhotoType = {
    userId: number, // id пользователя из URL
    d2Item: D2ItemType // отфильтрованый  из dialog2All выбранный пользователь по userId

}
const Msg2HeaderNamePhoto: React.FC<Msg2HeaderNamePhotoType> = memo ( ({userId, d2Item}) => {
    console.log("Header сообщений")
    const photoSrc = d2Item && d2Item.photos && d2Item.photos.small ? d2Item.photos.small : userPhoto // фото с сервера или заглушка
    const DateLocal = GetDate(d2Item && d2Item.lastUserActivityDate) // получаем дату последнего сообщения
    return <div>
        {d2Item && <div>
            <div className={classes.Msg2HeaderName}>{d2Item && d2Item.userName}</div>
            <NavLink to={'/profile/' + userId}>
                <img className={classes.Msg2HeaderPhoto} src={photoSrc} alt="photoSrc"/>
            </NavLink>
            <div className={classes.Msg2HeaderActivityDate}>Был(а): {" "}
                {d2Item &&  DateLocal.isToday
                    ? <span> сегодня в {DateLocal.Hour }:{DateLocal.Minutes}</span>
                    : <span> {DateLocal.Day }.{DateLocal.Month}.{DateLocal.Year}</span>
                }
            </div>
        </div>}
    </div>
})
export default  Msg2HeaderNamePhoto // сокращаем число ререндеров
