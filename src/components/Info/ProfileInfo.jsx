import React from 'react';
import classes from '../Profile/ProfileInfo/ProfileInfo.module.css'
import Preloader from "../common/Preloader/Preloader";
import ProfileStatusUseReducer from "../Profile/ProfileInfo/ProfileStatus/ProfileStatusUseReducer";
import {bedug_mode} from "../../redux/store-redux";
import userPhoto from "../../assets/images/no-image3.png";


const ProfileInfo = ({profile, myId, status, putStatusThunkCreator}) => {
    if (bedug_mode) {console.log("ProfileInfo.jsx")} // дебаг
    if (!profile) {
        return <Preloader/>
    }
    return <div className={classes.content}>

        <div className={classes.ProfilePhoto} >
            <img alt={"userPhoto"} src={profile.photos.small?profile.photos.small:userPhoto}/>
        </div>
        <div className={classes.descriptionBlock}>
            <div>Обо мне: {profile.aboutMe}</div>
            <div>Контакты:</div>
            <div> facebook: {profile.contacts.facebook}</div>
            <div>vk: {profile.contacts.vk}</div>
            <div>twitter: {profile.contacts.twitter}</div>
            <div>instagram: {profile.contacts.instagram}</div>
            <div>github: {profile.contacts.github}</div>
            <div>В поиске работы? {profile.lookingForAJob ? "Да" : "Нет"}</div>
            <div>Описание: {profile.lookingForAJobDescription}</div>
            <div>Полное имя: {profile.fullName}</div>
            <div>userId: {profile.userId}</div>

            <ProfileStatusUseReducer // можно еще использовать ProfileStatusUseState и ProfileStatusClass
                myId={myId} // мой id для модификации статуса
                userId={profile.userId} // id отображаемого пользователя
                status={status} // статус из BLL
                putStatusThunkCreator={putStatusThunkCreator} // санкреатор для обновления сатуса
            />

        </div>

    </div>
}
export default ProfileInfo;
