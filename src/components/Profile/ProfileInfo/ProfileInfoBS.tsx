import React, {memo, useEffect, useState} from 'react';
import ButtonOverImage from '../../common/CommonClasses/ButtonOverImage.module.css'
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusUseReducer from "./ProfileStatus/ProfileStatusUseReducer"; //ProfileStatusClass | ProfileStatusUseState
import userPhoto1 from "../../../assets/images/no-image3.png";
import EditProfileFormikBS from "./EditProfile/EditProfileFormikBS";
import "bootstrap/dist/css/bootstrap.min.css"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from 'react-bootstrap/Image'
import commonClasses from "../../common/CommonClasses/common.module.css";
import {getProfileType} from "../../api/apiTypes";
import {NulableType, ProfileType} from "../../../types/commonTypes";
import ShowProfile from "./ShowProfile";


type ProfileInfoType2 = {
    profile: NulableType<getProfileType>,
    status: string,
    myId: number,
    userId: number,
    putProfile: (putProfile2: ProfileType) => void,
    putStatusThunkCreator: (statusTmpInput: string) => void,
    uploadImage: (profilePhoto: File) => void,
    editProfileStatus: Array<string>,
    setEditProfileStatus: (editProfileStatus: Array<string>) => void
}

const ProfileInfo: React.FC<ProfileInfoType2> = memo( ({
                                                     profile, myId, status, putStatusThunkCreator, uploadImage,
                                                     userId, putProfile, editProfileStatus, setEditProfileStatus
                                                 }) => {

    const [profilePhoto, setprofilePhoto] = useState<File>() // useState для временного хранения фото пользователя
    const [editMode, setEditMode] = useState<boolean>( false ) // флаг режима редактирования профиля
    const [showUploadImageButton, setshowUploadImageButton] = useState( false ) // флаг показать ли кнопку загрузки изображения

    const editedSuccessfully = editProfileStatus.length > 0 // если сообщение об ошибке/обновлении существует
        && editProfileStatus[0] === "Edited successfully!" // и успешный статус обновления с сервера

    useEffect( () => {
        if (editedSuccessfully) { // если успешно обновлен профиль на сервере
            setEditMode( false ) // закрыть режим редактирования профиля
            // желательно здесь сделать прокрутку до верха профиля
            setTimeout( () => {
                setEditProfileStatus( [] ) // убирание сообщения ответа от сервера по таймеру
            }, 2000 )
        }
    }, [editProfileStatus, editedSuccessfully, setEditProfileStatus] ) // переключение режима редактирования зависит от ответа с сервера


    if (!profile) { // если профиль еще не загружен
        return <Preloader/> // отобразить предзагрузку
    }
    const onChangeProfilePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.currentTarget.files !== null && setprofilePhoto( e.currentTarget.files[0] ) // записать в useState выбранный файл фото профиля(временный стейт)
    }
    const displayClass = showUploadImageButton ? "" : ButtonOverImage.displayNone // класс скрытия/отображения кнопок загрузки поверх картинки профиля

    const profileStatus = <ProfileStatusUseReducer // можно еще использовать ProfileStatusUseState и ProfileStatusClass
        myId={myId} // мой id для модификации статуса
        userId={profile.userId} // id отображаемого пользователя
        status={status} // статус из BLL
        putStatusThunkCreator={putStatusThunkCreator} // санкреатор для обновления сатуса
    />

    const showProfile = !editMode &&
        <ShowProfile profile={profile} setEditMode={setEditMode} userId={userId} myId={myId}/>

    const editProfile = editMode &&
        <div>
            <EditProfileFormikBS
                putProfile={putProfile} setEditMode={setEditMode} profile={profile}
                editProfileStatus={editProfileStatus} setEditProfileStatus={setEditProfileStatus}/>
        </div>
    const editMyPhoto = (userId === 0) &&// если мы перешли на свой профиль (в браузере нет ID возле profile)
        <div>
            <form> {/*форма отправки фото профиля на сервер*/}
                <span><button
                    className={ButtonOverImage.btn1 + " " + displayClass} // двойной класс - сама кнопка загрузки + класс скрыть/показать при наведении
                    onMouseOver={() => {
                        setshowUploadImageButton( true )
                    }} // при наведении сменить флаг  setshowUploadImageButton на true (показать кнопку)
                    onMouseOut={() => {
                        setshowUploadImageButton( false )
                    }}// при убирании мышки сменить флаг  setshowUploadImageButton на false (скрыть кнопку)
                    onClick={() => { //
                        profilePhoto && uploadImage( profilePhoto )
                    }}>Загрузить</button></span> {/*По клику отправить файл на сервер*/}
                <span>
                    <input
                        className={ButtonOverImage.btn2 + " " + displayClass} // двойной класс - сама кнопка загрузки + класс скрыть/показать при наведении
                        onMouseOver={() => {
                            setshowUploadImageButton( true )
                        }} // при наведении сменить флаг  setshowUploadImageButton на true (показать кнопку)
                        onMouseOut={() => {
                            setshowUploadImageButton( false )
                        }}// при убирании мышки сменить флаг  setshowUploadImageButton на false (скрыть кнопку)
                        type="file" onChange={onChangeProfilePhoto}/></span> {/*загрузить файл*/}
            </form>
        </div>

    const showUserPhoto = <Image fluid={true}
                                 alt={"userPhoto"}
                                 onMouseOver={() => {
                                     setshowUploadImageButton( true )
                                 }} // при поя
                                 onMouseOut={() => {
                                     setshowUploadImageButton( false )
                                 }}
                                 className={`${ButtonOverImage.profilePhotoIMG} ${userId === 0 && showUploadImageButton ? ButtonOverImage.ImgHover : ""}`}
        // если это мой профиль (userId === 0) и мышкой навели на картинку, добавить ImgHover класс (альтернатива псевдокласса :hover)
                                 src={profile.photos.large ? profile.photos.large : userPhoto1}/>

    return <div>
        <Container fluid="sm">
            <h2 className={commonClasses.pageHeader}>Profile</h2> {/*Заголовок*/}

            <Row>
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
                        && <div>
                            {editProfileStatus[0]} {/* вывести сообщение успешного обновления*/}
                        </div>
                        }
                    </div>
                    <div>
                        {profileStatus} {/*отображение моего статуса*/}
                    </div>
                </Col>
            </Row>
        </Container>
    </div>
})
export default ProfileInfo;
