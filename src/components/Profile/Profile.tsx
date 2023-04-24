import React from 'react';
import classes from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfoBS";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {getProfileType} from "../api/apiTypes";
import {ProfileType} from "../../types/commonTypes";

type ProfileType2 = {
    profile: getProfileType,
    status: string,
    myId: number,
    userId: number,
    putProfile: (putProfile2: ProfileType) =>void,
    putStatusThunkCreator: (statusTmpInput:string, myId:number)=>void,
    uploadImage: (profilePhoto: any)=>void,
    editProfileStatus:Array<string>,
    setEditProfileStatus: (editProfileStatus: Array<string>)=> void
}

const Profile: React.FC<ProfileType2> = ({
                     profile, status, myId, putStatusThunkCreator, uploadImage,
                     userId, putProfile, editProfileStatus, setEditProfileStatus
                 }) => {

    const ProfileRender = <div className={classes.ProfileRender}>
        <ProfileInfo // Отображение данных выбранного пользователя
            profile={profile} // профиль выбранного пользователя
            status={status} // статус из BLL
            myId={myId} // мой id для модификации статуса
            putStatusThunkCreator={putStatusThunkCreator} // санкреатор для обновления сатуса
            uploadImage={uploadImage} // колбек загрузки фото профиля на сервер
            userId={userId} // id выбранного пользователя, берется из URL
            putProfile={putProfile}
            editProfileStatus={editProfileStatus} // список ошибок правки формы профиля с сервера
            setEditProfileStatus={setEditProfileStatus}
        />

    </div>
    return <div>
        {ProfileRender} {/*Отрисовка данных профиля с картинкой, и статусом*/}

        <MyPostsContainer // контейнер отображения постов (пока заглушка из стейта BLL)
            userId={userId} // id выбранного пользователя, берется из URL
        />
    </div>
}
export default Profile;
