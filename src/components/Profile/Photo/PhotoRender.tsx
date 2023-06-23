import React, {ChangeEvent} from "react";
import classes from "./photo.module.css";
import classesCommon from "../../common/CommonClasses/common.module.css"
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";

type PhotoRenderType = {
    photo: string,
    isMyProfile: boolean
    onChangeLocal: (e: ChangeEvent<HTMLInputElement>) => void
}
const PhotoRender: React.FC<PhotoRenderType> = ({photo, isMyProfile, onChangeLocal}) => {
    return <div>
        <div className={classesCommon.toCenter}>
            <Image fluid={true}
                   alt={"userPhoto"}
                   className={`${classes.profilePhotoIMG} `}
                   src={photo}/>
        </div>

        {isMyProfile && // если мы перешли на свой профиль
        <div >
            <Form.Control type="file" onChange={onChangeLocal} className={classes.FileUploadInt}/>
        </div>}
    </div>
}
export default PhotoRender
