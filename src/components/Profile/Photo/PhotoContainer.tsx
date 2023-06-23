import React, {ChangeEvent} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setprofilePhotoThunkCreator} from "../../../redux/profile-reducer";
import {NulableType} from "../../common/types/commonTypes";
import {GetProfileType} from "../../api/apiTypes";
import {GlobalStateType} from "../../../redux/store-redux";
import PhotoRender from "./PhotoRender";
import userPhoto1 from "../../../assets/images/no-image3.png";


const PhotoContainer: React.FC = () => {

    const dispatch = useDispatch()
    const profile: NulableType<GetProfileType> = useSelector( (state: GlobalStateType) => state.profilePage.profile )
    const userId: number | undefined = useSelector( (state: GlobalStateType) => state.profilePage.profile?.userId ) // id пользователя
    const myId: number | undefined = useSelector( (state: GlobalStateType) => state.auth.myId ) // мой id

    const onChangeLocal = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.files &&
        dispatch( setprofilePhotoThunkCreator( e.target.files[0] ) )// загрузка файла картинки на сервер
    }
    const photo = profile?.photos?.large
            ? profile.photos.large
            : userPhoto1

    const isMyProfile: boolean = userId === myId
    return <PhotoRender
        photo={photo}
        isMyProfile={isMyProfile}
        onChangeLocal={onChangeLocal}
    />
}
export default PhotoContainer
