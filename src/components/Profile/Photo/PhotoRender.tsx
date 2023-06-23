import React, {ChangeEvent} from "react";
import classes from "../Profile.module.css";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";

type PhotoRenderType = {
    photo: string,
    isMyId: boolean
    onChangeLocal: (e: ChangeEvent<HTMLInputElement>) => void
}
const PhotoRender: React.FC<PhotoRenderType> = ({photo, isMyId, onChangeLocal}) => {
    return <div>
        <div className={classes.toCenter}>
            <Image fluid={true}
                   alt={"userPhoto"}
                   className={`${classes.profilePhotoIMG} `}
                   src={photo}/>
        </div>

        {isMyId && // если мы перешли на свой профиль
        <div className={classes.toCenter}>
            <Form.Control type="file" onChange={onChangeLocal} className={classes.FileUploadInt}/>
        </div>}
    </div>
}
export default PhotoRender
