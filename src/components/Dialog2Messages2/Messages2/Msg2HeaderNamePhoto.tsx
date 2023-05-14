import React from "react";
import {newMessagesItem} from "../../api/apiTypes";
import classes from "./messages2Render.module.scss"
import userPhoto from "../../../assets/images/no-image3.png";
import {NavLink} from "react-router-dom";
import GetDate from "../../common/ErrorBoundary/GetDate";

type Msg2HeaderNamePhotoType = {
    userId: number, // id пользователя из URL
    D2Item: newMessagesItem // отфильтрованый  из Dialog2All выбранный пользователь по userId

}
const Msg2HeaderNamePhoto: React.FC<Msg2HeaderNamePhotoType> = ({userId, D2Item}) => {
    const photoSrc = D2Item && D2Item.photos && D2Item.photos.small ? D2Item.photos.small : userPhoto // фото с сервера или заглушка
    const DateLocal = GetDate(D2Item && D2Item.lastUserActivityDate) // получаем дату последнего сообщения
    return <div>
        {D2Item && <div>
            <div className={classes.Msg2HeaderName}>{D2Item && D2Item.userName}</div>
            <NavLink to={'/profile/' + userId}>
                <img className={classes.Msg2HeaderPhoto} src={photoSrc} alt="photoSrc"/>
            </NavLink>
            <div className={classes.Msg2HeaderActivityDate}>Был(а): {" "}
                {D2Item &&  DateLocal.isToday
                    ? <span> сегодня в {DateLocal.Hour }:{DateLocal.Minutes}</span>
                    : <span> {DateLocal.Day } {DateLocal.Month} {DateLocal.Year}</span>
                }
            </div>
        </div>}
    </div>
}
export default React.memo( Msg2HeaderNamePhoto ) // сокращаем число ререндеров
