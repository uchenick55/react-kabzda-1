import React, {memo} from 'react';
import classes from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfoBS";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {GetProfileType} from "../api/apiTypes";
import {NulableType, ProfileType} from "../common/types/commonTypes";
import PhotoContainer from "./Photo/PhotoContainer";
import StatusContainer from "./Status/StatusContainer";

type ProfileType2 = {
    profile: NulableType<GetProfileType>,
    myId: number,
    userId: number,
    putProfile: (putProfile2: ProfileType) =>void,
    uploadImage: (profilePhoto: File)=>void,
    editProfileStatus:Array<string>,
    setEditProfileStatus: (editProfileStatus: Array<string>)=> void
}

const Profile: React.FC<ProfileType2> = memo ( ({
                     profile, myId, uploadImage,
                     userId, putProfile, editProfileStatus, setEditProfileStatus
                 }) => {

    const ProfileRender = <div className={classes.ProfileRender}>
        <ProfileInfo // Отображение данных выбранного пользователя
            profile={profile} // профиль выбранного пользователя
            myId={myId} // мой id для модификации статуса
            uploadImage={uploadImage} // колбек загрузки фото профиля на сервер
            userId={userId} // id выбранного пользователя, берется из URL
            putProfile={putProfile}
            editProfileStatus={editProfileStatus} // список ошибок правки формы профиля с сервера
            setEditProfileStatus={setEditProfileStatus}
        />

    </div>

    return <div>
        <PhotoContainer/> {/*Отрисовка фото выбранного профиля с картинкой*/}

        {ProfileRender} {/*Отрисовка данных выбранного профиля и возможность редактировать свой профиль*/}

        <StatusContainer/>

        {userId===0 && <MyPostsContainer/>}  {/*контейнер отображения постов (пока заглушка из стейта BLL)*/}

    </div>
})
export default Profile;
