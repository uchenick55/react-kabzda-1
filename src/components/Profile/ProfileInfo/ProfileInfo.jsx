import React, {useState} from 'react';
import classes from './ProfileInfo.module.css'
import commonClasses from '../../common/ButtonOverImage/ButtonOverImage.module.css'
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusUseReducer from "./ProfileStatus/ProfileStatusUseReducer";
import {bedug_mode} from "../../../redux/store-redux";
import userPhoto1 from "../../../assets/images/no-image3.png";
import EditProfileFormik from "./EditProfile/EditProfileFormik"; // заглушка фото пользователя

const ShowProfile = ({profile, setEditMode, userId, myId}) => { // вынес отдельно отображение профиля
    let Contact = (key1) => { /*простая функция вывода отдельного элемента contacts из profile*/
        return <div>
            <b>{key1}: </b>{profile.contacts[key1]}
        </div>
    }
    return (<div>
            <div className={classes.profilefullName}>{profile.fullName}</div>
            <div><b>Обо мне</b>: {profile.aboutMe}</div>
            <div><b>В поиске работы?</b> {profile.lookingForAJob ? "Да" : "Нет"}</div>
            <div><b>Описание поиска работы:</b> {profile.lookingForAJobDescription}</div>
            <div><b>userId:</b> {profile.userId}</div>
            <div><b>Контакты:</b></div>
            <div className={classes.ProfileContacts}>
                {Object.keys(profile.contacts).map((key1) => { //
                    return (<div key={key1}>
                            {Contact(key1)}
                        </div>
                    )
                })}
            </div>
            {(userId === 0) && <button onClick={() => {
                setEditMode(true)
            }}>Редактировать профиль </button>}

        </div>
    )
}

const ProfileInfo = ({profile, myId, status, putStatusThunkCreator, uploadImage,
                         userId, putProfile, editProfileError}) => {
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
    let displayClass = showUploadImageButton ? "" : commonClasses.displayNone // класс скрытия/отображения кнопок загрузки поверх картинки профиля

    let profileStatus = <ProfileStatusUseReducer // можно еще использовать ProfileStatusUseState и ProfileStatusClass
        myId={myId} // мой id для модификации статуса
        userId={profile.userId} // id отображаемого пользователя
        status={status} // статус из BLL
        putStatusThunkCreator={putStatusThunkCreator} // санкреатор для обновления сатуса
    />

    let showProfile = !editMode &&
        <ShowProfile profile={profile} setEditMode={setEditMode} userId={userId} myId={myId}/>

    let editProfile = editMode &&
        <div>
            <EditProfileFormik profile={profile} putProfile={putProfile} setEditMode={setEditMode}
                               userId={userId} myId={myId} editProfileError={editProfileError}/>
        </div>
    let editMyPhoto = (userId === 0) &&// если мы перешли на свой профиль (в браузере нет ID возле profile)
        <div>
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
                <span>
                    <input
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

    let showUserPhoto = <img
        alt={"userPhoto"}
        onMouseOver={() => {
            setshowUploadImageButton(true)
        }} // при поя
        onMouseOut={() => {
            setshowUploadImageButton(false)
        }}
        className={commonClasses.profilePhotoIMG}
        src={profile.photos.large ? profile.photos.large : userPhoto1}/>

    return <div>
        <div className={classes.profileInfoGreed}>
            <div className={commonClasses.container}>
                <div>{showUserPhoto}</div>
                {/*показать фото пользователя*/}
                <div> {editMyPhoto} </div>
                {/* сменить фото, если это мой профиль*/}
            </div>

            <div>
                <div>
                    {showProfile} {/*показать профиль*/}
                    {editProfile} {/*редактировать профиль*/}
                </div>
                {/*Если длина больше нуля, то выводим сообщение.
                Если сообщение sucessully, то закрываем режим редактирования, выводим успех редактирования и по сеттаймауту зануляем стейт с ошибками
                Если не саксесфулли, то выводим ошибки и не закрываем редактирование*/}
                <div className={classes.errorText}>
                    {editProfileError.length>0&&editProfileError.map(err=>{
                        return <div>
                            {err}
                        </div>
                        }
                    )} {/*ошибка редактирования профиля*/}
                </div>
                <div>
                    {profileStatus} {/*отображение моего статуса*/}
                </div>
            </div>
        </div>

    </div>
}
export default ProfileInfo;
