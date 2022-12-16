import React, {useState} from 'react';
import classes from './ProfileInfo.module.css'
import commonClasses from '../../common/ButtonOverImage/ButtonOverImage.module.css'
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusUseReducer from "./ProfileStatus/ProfileStatusUseReducer";
import {bedug_mode} from "../../../redux/store-redux";
import userPhoto1 from "../../../assets/images/no-image3.png";
import EditProfile from "./EditProfile/EditProfile"; // заглушка фото пользователя

const ShowProfile = ({profile, setEditMode, userId, myId}) => { // вынес отдельно отображение профиля
    return (<div>
            <div className={classes.profilefullName}>{profile.fullName}</div>
            <div><b>Обо мне</b>: {profile.aboutMe}</div>
            <div><b>В поиске работы?</b> {profile.lookingForAJob ? "Да" : "Нет"}</div>
            <div><b>Описание поиска работы:</b> {profile.lookingForAJobDescription}</div>
            <div><b>userId:</b> {profile.userId}</div>
            <div><b>Контакты:</b></div>
            <div className={classes.ProfileContacts}>
                <div><b>github:</b> {profile.contacts.github}</div>
                <div><b>vk:</b> {profile.contacts.vk}</div>
                <div><b>facebook:</b> {profile.contacts.facebook}</div>
                <div><b>instagram:</b> {profile.contacts.instagram}</div>
                <div><b>twitter:</b> {profile.contacts.twitter}</div>
                <div><b>website:</b> {profile.contacts.website}</div>
                <div><b>youtube:</b> {profile.contacts.youtube}</div>
                <div><b>mainLink:</b> {profile.contacts.mainLink}</div>
            </div>
            {(userId === 0 || userId === myId) && <button onClick={() => {
                setEditMode(true)
            }}>Редактировать профиль </button>}

        </div>
    )
}

const ProfileInfo = ({profile, myId, status, putStatusThunkCreator, uploadImage, userId, putProfile, dispatch}) => {
    const [profilePhoto, setprofilePhoto] = useState(userPhoto1) // useState для временного хранения фото пользователя
    const [editMode, setEditMode] = useState(false) // флаг режима редактирования профиля
    const [showUploadImageButton, setshowUploadImageButton] = useState(false) // флаг показать ли кнопку загрузки изображения
    if (bedug_mode) {
        console.log("ProfileInfo.jsx")
    } // дебаг
    if (!profile) { // если профиль еще не загружен
        return <Preloader/> // отобразить предзагрузку
    }
    let onChangeProfilePhoto = (e) => {
        setprofilePhoto(e.target.files[0]) // записать в useState выбранный файл фото профиля(временный стейт)
    }
    let displayClass = showUploadImageButton ? "" : commonClasses.displayNone
    return <div>
        {console.log(showUploadImageButton)}
        <div className={classes.profileInfoGreed}>
            <div className={commonClasses.container}>
                <img
                    alt={"userPhoto"}
                    onMouseOver={() => {
                        setshowUploadImageButton(true)
                    }} // при поя
                    onMouseOut={() => {
                        setshowUploadImageButton(false)
                    }}
                    className={commonClasses.profilePhotoIMG}
                    src={profile.photos.large ? profile.photos.large : userPhoto1}/>
                <div>
                    {(userId === 0 || userId === myId)// если мы перешли на свой профиль (в браузере нет ID возле profile)
                        ? <div>
                            <form> {/*форма отправки фото профиля на сервер*/}
                                <span><button
                                    className={commonClasses.btn1 + " " + displayClass} // двойной класс - сама кнопка загрузки + класс скрыть/показать при наведении
                                    onMouseOver={() => {
                                        setshowUploadImageButton(true)
                                    }} // при наведении сменить флаг  setshowUploadImageButton на true (показать кнопку)
                                    onMouseOut={() => {
                                        setshowUploadImageButton(false)
                                    }}// при убирании мышки сменить флаг  setshowUploadImageButton на false (скрыть кнопку)
                                    onClick={() => { //
                                        uploadImage(profilePhoto)
                                    }}>Загрузить</button></span> {/*По клику отправить файл на сервер*/}
                                <span><input
                                    className={commonClasses.btn2 + " " + displayClass} // двойной класс - сама кнопка загрузки + класс скрыть/показать при наведении
                                    onMouseOver={() => {
                                        setshowUploadImageButton(true)
                                    }} // при наведении сменить флаг  setshowUploadImageButton на true (показать кнопку)
                                    onMouseOut={() => {
                                        setshowUploadImageButton(false)
                                    }}// при убирании мышки сменить флаг  setshowUploadImageButton на false (скрыть кнопку)
                                    type="file" onChange={onChangeProfilePhoto}/></span> {/*загрузить файл*/}
                            </form>
                        </div>
                        : null}
                </div>
            </div>


            <div>
                {!editMode && <ShowProfile profile={profile} setEditMode={setEditMode} userId={userId} myId={myId}/>}
                {editMode && <EditProfile putProfile={putProfile} dispatch={dispatch} setEditMode={setEditMode}/>}
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

    </div>
}
export default ProfileInfo;
