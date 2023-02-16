import React, {useEffect, useState} from 'react';
import classes from './ProfileInfo.module.css'
import ButtonOverImage from '../../common/CommonClasses/ButtonOverImage.module.css'
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusUseReducer from "./ProfileStatus/ProfileStatusUseReducer";
import {bedug_mode} from "../../../redux/store-redux";
import userPhoto1 from "../../../assets/images/no-image3.png";
import EditProfileFormikBS from "./EditProfile/EditProfileFormikBS";
import "bootstrap/dist/css/bootstrap.min.css"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Image from 'react-bootstrap/Image'
import commonClasses from "../../common/CommonClasses/common.module.css";


const ShowProfile = ({profile, setEditMode, userId, myId}) => { // вынес отдельно отображение профиля

    let Contact = (key1) => { /*простая функция вывода отдельного элемента contacts из profile*/
        return <div>
            <b>{key1}: </b>{profile.contacts[key1]}
        </div>
    }
    return (<div>
            <h3>{profile.fullName}</h3>
            <div><b>Обо мне</b>: {profile.aboutMe}</div>
            <div><b>В поиске работы?</b> {profile.lookingForAJob ? "Да" : "Нет"}</div>
            <div><b>Описание поиска работы:</b> {profile.lookingForAJobDescription}</div>
            <div><b>userId:</b> {profile.userId}</div>
{/*
            <div><b>Контакты:</b></div>
*/}
            <ul>
                {Object.keys(profile.contacts).map((key1) => { //
                    return (<li key={key1}>
                            {Contact(key1)}
                        </li>
                    )
                })}
            </ul>
            {(userId === 0) && <Button onClick={() => {
                setEditMode(true)
            }}>Редактировать профиль </Button>}

        </div>
    )
}

const ProfileInfo = ({
                         profile, myId, status, putStatusThunkCreator, uploadImage,
                         userId, putProfile, editProfileStatus, setEditProfileStatus
                     }) => {

    const [profilePhoto, setprofilePhoto] = useState(userPhoto1) // useState для временного хранения фото пользователя
    const [editMode, setEditMode] = useState(false) // флаг режима редактирования профиля
    const [showUploadImageButton, setshowUploadImageButton] = useState(false) // флаг показать ли кнопку загрузки изображения

    const editedSuccessfully = editProfileStatus.length > 0 // если сообщение об ошибке/обновлении существует
        && editProfileStatus[0] === "Edited successfully!" // и успешный статус обновления с сервера

    useEffect(() => {
        if (editedSuccessfully) { // если успешно обновлен профиль на сервере
            setEditMode(false) // закрыть режим редактирования профиля
            // желательно здесь сделать прокрутку до верха профиля
            setTimeout(() => {
                setEditProfileStatus([]) // убирание сообщения ответа от сервера по таймеру
            }, 2000)
        }
    }, [editProfileStatus, editedSuccessfully, setEditProfileStatus]) // переключение режима редактирования зависит от ответа с сервера

    if (bedug_mode) {
        console.log("ProfileInfo.jsx")
    } // дебаг
    if (!profile) { // если профиль еще не загружен
        return <Preloader/> // отобразить предзагрузку
    }
    let onChangeProfilePhoto = (e) => {
        setprofilePhoto(e.target.files[0]) // записать в useState выбранный файл фото профиля(временный стейт)
    }
    let displayClass = showUploadImageButton ? "" : ButtonOverImage.displayNone // класс скрытия/отображения кнопок загрузки поверх картинки профиля

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
            <EditProfileFormikBS
                profile={profile} putProfile={putProfile} setEditMode={setEditMode}
                userId={userId} myId={myId} editProfileStatus={editProfileStatus}
                setEditProfileStatus={setEditProfileStatus}/>
        </div>
    let editMyPhoto = (userId === 0) &&// если мы перешли на свой профиль (в браузере нет ID возле profile)
        <div>
            <form> {/*форма отправки фото профиля на сервер*/}
                <span><button
                    className={ButtonOverImage.btn1 + " " + displayClass} // двойной класс - сама кнопка загрузки + класс скрыть/показать при наведении
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
                        className={ButtonOverImage.btn2 + " " + displayClass} // двойной класс - сама кнопка загрузки + класс скрыть/показать при наведении
                        onMouseOver={() => {
                            setshowUploadImageButton(true)
                        }} // при наведении сменить флаг  setshowUploadImageButton на true (показать кнопку)
                        onMouseOut={() => {
                            setshowUploadImageButton(false)
                        }}// при убирании мышки сменить флаг  setshowUploadImageButton на false (скрыть кнопку)
                        type="file" onChange={onChangeProfilePhoto}/></span> {/*загрузить файл*/}
            </form>
        </div>

    let showUserPhoto = <Image fluid={true}
        alt={"userPhoto"}
        onMouseOver={() => {
            setshowUploadImageButton(true)
        }} // при поя
        onMouseOut={() => {
            setshowUploadImageButton(false)
        }}
        className={`${ButtonOverImage.profilePhotoIMG} ${userId === 0 && showUploadImageButton === true ? ButtonOverImage.ImgHover : ""}`}
        // если это мой профиль (userId === 0) и мышкой навели на картинку, добавить ImgHover класс (альтернатива псевдокласса :hover)
        src={profile.photos.large ? profile.photos.large : userPhoto1}/>

    return <div>
        <Container fluid="sm">
            <h2 className={commonClasses.pageHeader}>Profile</h2>

            <Row >
                <Col xs={12} md={5} className={ButtonOverImage.container}>
                    {showUserPhoto} {/*показать фото пользователя*/}
                    {editMyPhoto} {/* сменить фото, если это мой профиль*/}
                </Col>
                <Col xs={12} md={7}>
                    {showProfile} {/*показать профиль*/}
                    {editProfile} {/*редактировать профиль*/}
                    {/*{editProfileStatus} {/*статус обновления профиля (успешно/ошибки)*/}
                    {/*Если длина больше нуля, то выводим сообщение.
                Если сообщение sucessully, то закрываем режим редактирования, выводим успех редактирования и по сеттаймауту зануляем стейт с ошибками
                Если не саксесфулли, то выводим ошибки и не закрываем редактирование*/}
                    <div>
                        {editedSuccessfully // если успешно обновлен профиль на сервере
                            ? <div>
                                {editProfileStatus[0]} {/*вывести сообщение об успехе*/}
                            </div>// вывести сообщение успешного обновления
                            : null

                        } {/*ошибка редактирования профиля*/}
                    </div>
                    <div>
                        {profileStatus} {/*отображение моего статуса*/}
                    </div>
                </Col>
            </Row>
        </Container>
    </div>
}
export default ProfileInfo;
