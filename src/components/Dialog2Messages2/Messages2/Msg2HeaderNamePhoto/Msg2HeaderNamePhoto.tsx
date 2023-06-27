import React from "react";
import {D2ItemType} from "../../../api/apiTypes";
import classes from "../msg2.module.css"
import userPhoto from "../../../../assets/images/no-image3.png";
import {NavLink} from "react-router-dom";
import GetDate from "../../../common/GetDate";

type Msg2HeaderNamePhotoType = {
    d2Item: D2ItemType // отфильтрованый  из dialog2All выбранный пользователь по userId
    isMobile: boolean // это мобильная верстка?
}
const Msg2HeaderNamePhoto: React.FC<Msg2HeaderNamePhotoType> =  ( ({d2Item, isMobile}) => {
    console.log("шапка сообщений")

    const photoSrc = d2Item && d2Item.photos && d2Item.photos.small ? d2Item.photos.small : userPhoto // фото с сервера или заглушка
    const DateLocal = GetDate(d2Item && d2Item.lastUserActivityDate) // получаем дату последнего сообщения
    return <div className={`${classes.Fixed} ${classes.messages2NameAndProfileLink} ${isMobile ?
        classes.MobileMessagesLeft : classes.DesktopMessagesLeft}`}
    >
        {d2Item && <div>
            <div className={classes.Msg2HeaderName}>{d2Item && d2Item.userName}</div>
            <NavLink to={'/profile/' + d2Item.id}>
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
