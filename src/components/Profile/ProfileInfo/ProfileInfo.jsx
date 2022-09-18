import React from 'react';
import classes from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }
    return <div className={classes.content}>
        <div>
            <img src="https://w-dog.ru/wallpapers/11/5/450299462616902/priroda-derevya-trava-nebo-leto.jpg" alt="img1"
                 width="180px"/>
        </div>
        <div className={classes.descriptionBlock}>
            <div>Обо мне: {props.profile.aboutMe}</div>
            <div>Контакты:</div>
            <div> facebook: {props.profile.contacts.facebook}</div>
            <div>vk: {props.profile.contacts.vk}</div>
            <div>twitter: {props.profile.contacts.twitter}</div>
            <div>instagram: {props.profile.contacts.instagram}</div>
            <div>github: {props.profile.contacts.github}</div>
            <div>В поиске работы? {props.profile.lookingForAJob ? "Да" : "Нет"}</div>
            <div>Описание: {props.profile.lookingForAJobDescription}</div>
            <div>Полное имя: {props.profile.fullName}</div>
            <div>userId: {props.profile.userId}</div>
            <div >
                <img src={props.profile.photos.small}/>
            </div>
            <ProfileStatus myId={props.myId} userId={props.profile.userId} status={props.status}/>

        </div>

    </div>
}
export default ProfileInfo;
