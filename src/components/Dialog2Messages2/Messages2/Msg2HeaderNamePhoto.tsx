import React from "react";
import {getDialog2AllType} from "../../api/apiTypes";
import classes from "./messages2Render.module.scss"
import userPhoto from "../../../assets/images/no-image3.png";

type Msg2HeaderNamePhotoType = {
    Dialog2All: getDialog2AllType, // список всех диалогов для левой колонки
}
const Msg2HeaderNamePhoto:React.FC<Msg2HeaderNamePhotoType> = ({Dialog2All}) => {
    const photoSrc = Dialog2All[0]&&Dialog2All[0].photos&& Dialog2All[0].photos.small? Dialog2All[0].photos.small : userPhoto // фото с сервера или заглушка
    return <div>
        {Dialog2All[0] && <div>
            <div className={classes.Msg2HeaderName}>{Dialog2All[0] && Dialog2All[0].userName}</div>
            <img className={classes.Msg2HeaderPhoto} src={photoSrc} alt="photoSrc"/>
            <div className={classes.Msg2HeaderActivityDate} >Был(а): {" "}
                {Dialog2All[0] && Dialog2All[0].lastUserActivityDate.slice(0, 10)} {/*дата активности*/}
            </div>
        </div>}
    </div>
}
export default Msg2HeaderNamePhoto
