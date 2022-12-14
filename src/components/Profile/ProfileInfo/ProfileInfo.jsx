import React, {useState} from 'react';
import classes from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusUseReducer from "./ProfileStatus/ProfileStatusUseReducer";
import {bedug_mode} from "../../../redux/store-redux";
import userPhoto1 from "../../../assets/images/no-image3.png"; // заглушка фото пользователя

const ProfileInfo = ({profile, myId, status, putStatusThunkCreator, uploadImage, userId}) => {
    const [profilePhoto, setprofilePhoto] = useState(userPhoto1) // useState для временного хранения фото пользователя
    if (bedug_mode) {
        console.log("ProfileInfo.jsx")
    } // дебаг
    if (!profile) { // если профиль еще не загружен
        return <Preloader/> // отобразить предзагрузку
    }
    let onChangeProfilePhoto = (e) => {
        setprofilePhoto(e.target.files[0]) // записать в useState выбранный файл фото профиля(временный стейт)

    }
    return <div>
        <div className={classes.profileInfoGreed}>

            <div>
                <img alt={"userPhoto"} className={classes.profilePhotoIMG}
                     src={profile.photos.large ? profile.photos.large : userPhoto1}/>
            </div>

            <div className={classes.descriptionBlock}>
                <h3>{profile.fullName}</h3>
                <div>Обо мне: {profile.aboutMe}</div>
                <div>Контакты:</div>
                <div> facebook: {profile.contacts.facebook}</div>
                <div>vk: {profile.contacts.vk}</div>
                <div>twitter: {profile.contacts.twitter}</div>
                <div>instagram: {profile.contacts.instagram}</div>
                <div>github: {profile.contacts.github}</div>
                <div>В поиске работы? {profile.lookingForAJob ? "Да" : "Нет"}</div>
                <div>Описание: {profile.lookingForAJobDescription}</div>
                <div>userId: {profile.userId}</div>
                <div>
                    {/*Компонента отображения моего статуса*/}
                    <ProfileStatusUseReducer // можно еще использовать ProfileStatusUseState и ProfileStatusClass
                        myId={myId} // мой id для модификации статуса
                        userId={profile.userId} // id отображаемого пользователя
                        status={status} // статус из BLL
                        putStatusThunkCreator={putStatusThunkCreator} // санкреатор для обновления сатуса
                    />
                </div>
            </div>
        </div>
        <div>
            {userId === 0 // если мы перешли на свой профиль (в браузере нет ID возле profile)
                ? <div>
                    <form> {/*форма отправки фото профиля на сервер*/}
                        <span><button onClick={() => {
                            uploadImage(profilePhoto)
                        }}>Загрузить</button></span> {/*По клику отправить файл на сервер*/}
                        <span><input type="file" onChange={onChangeProfilePhoto}/></span> {/*загрузить файл*/}
                    </form>
                </div>
                : null}
        </div>

    </div>
}
export default ProfileInfo;
