import React, {memo, useEffect, useState} from 'react';
import EditProfileFormikBS from "./EditProfile/EditProfileFormikBS";
import "bootstrap/dist/css/bootstrap.min.css"
import commonClasses from "../../common/CommonClasses/common.module.css";
import {GetProfileType} from "../../api/apiTypes";
import {NulableType, ProfileType} from "../../common/types/commonTypes";
import ShowProfile from "./ShowProfile";

type ProfileInfoType2 = {
    profile: NulableType<GetProfileType>,
    isMyProfile: boolean
    putProfile: (putProfile2: ProfileType) => void,
    editProfileStatus: Array<string>,
    isProfileEditedSuccesssfully: boolean
    setEditProfileStatus: (editProfileStatus: Array<string>) => void
}

const ProfileInfo: React.FC<ProfileInfoType2> = memo( (
    {profile, isMyProfile, putProfile, editProfileStatus, setEditProfileStatus, isProfileEditedSuccesssfully}) => {

    console.log( "ProfileInfo" )

    const [editMode, setEditMode] = useState<boolean>( false ) // флаг режима редактирования профиля

    useEffect( () => {
        if (isProfileEditedSuccesssfully) { // если успешно обновлен профиль на сервере
            setEditMode( false ) // закрыть режим редактирования профиля
            // желательно здесь сделать прокрутку до верха профиля
            setTimeout( () => {
                setEditProfileStatus( [] ) // убирание сообщения ответа от сервера по таймеру
            }, 2000 )
        }
    }, [editProfileStatus, isProfileEditedSuccesssfully, setEditProfileStatus] ) // переключение режима редактирования зависит от ответа с сервера


    const showProfile = <ShowProfile profile={profile} setEditMode={setEditMode} isMyProfile={isMyProfile}/>

    const editProfile = <EditProfileFormikBS
        putProfile={putProfile} setEditMode={setEditMode} profile={profile}
        editProfileStatus={editProfileStatus} setEditProfileStatus={setEditProfileStatus}
    />

    return <div>
        <h2 className={commonClasses.pageHeader}>Profile</h2> {/*Заголовок*/}

        {!editMode && showProfile} {/*показать профиль*/}

        {editMode && editProfile} {/*редактировать профиль*/}
    </div>
} )
export default ProfileInfo;
