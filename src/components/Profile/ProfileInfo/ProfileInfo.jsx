import React from 'react';
import classes from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusUseReducer from "./ProfileStatus/ProfileStatusUseReducer";
import ProfileStatusUseState from "./ProfileStatus/ProfileStatusUseState";
import ProfileStatusClass from "./ProfileStatus/ProfileStatusClass";

const ProfileInfo = ({profile, myId, status, putStatusThunkCreator}) => {
    if (!profile) {
        return <Preloader/>
    }
    return <div className={classes.content}>
        <div>
            <img src="https://w-dog.ru/wallpapers/11/5/450299462616902/priroda-derevya-trava-nebo-leto.jpg" alt="img1"
                 width="180px"/>
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
            <div >
                <img src={profile.photos.small}/>
            </div>
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
