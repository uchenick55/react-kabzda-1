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
import {NulableType, ProfileType} from "../../common/types/commonTypes";
import ShowProfile from "./ShowProfile";
import Form from 'react-bootstrap/Form';
import classes from "../Profile.module.css"

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
    console.log( "ProfileInfo" )
    const [editMode, setEditMode] = useState<boolean>( false ) // флаг режима редактирования профиля

    const editedSuccessfully: boolean = editProfileStatus.length > 0 // если сообщение об ошибке/обновлении существует
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

    const profileStatus = <ProfileStatusUseReducer // можно еще использовать ProfileStatusUseState и ProfileStatusClass
        myId={myId} // мой id для модификации статуса
        userId={profile.userId} // id отображаемого пользователя
        status={status} // статус из BLL
        putStatusThunkCreator={putStatusThunkCreator} // санкреатор для обновления сатуса
    />

    const showProfile =  <ShowProfile profile={profile} setEditMode={setEditMode} userId={userId} myId={myId}/>

    const editProfile =  <EditProfileFormikBS
                putProfile={putProfile} setEditMode={setEditMode} profile={profile}
                editProfileStatus={editProfileStatus} setEditProfileStatus={setEditProfileStatus}/>

    const onChangeLocal = (e: any) => {
        uploadImage( e.target.files[0] )// загрузка файла картинки на сервер
    }
    const editMyPhoto = (userId === 0) &&// если мы перешли на свой профиль (в браузере нет ID возле profile)
        <div className={classes.toCenter}>
            <Form.Control type="file" onChange={onChangeLocal} className={classes.FileUploadInt}/>
        </div>


    const showUserPhoto = <div className={classes.toCenter}>
        <Image fluid={true}
               alt={"userPhoto"}
               className={`${ButtonOverImage.profilePhotoIMG} `}
            // если это мой профиль (userId === 0) и мышкой навели на картинку, добавить ImgHover класс (альтернатива псевдокласса :hover)
               src={profile.photos.large ? profile.photos.large : userPhoto1}/>
    </div>

    return <div>
        <Container fluid="sm">
            <h2 className={commonClasses.pageHeader}>Profile</h2> {/*Заголовок*/}

            <Row>
                <Col xs={12} md={5} className={ButtonOverImage.container}>
                    {showUserPhoto} {/*показать фото пользователя*/}
                    {editMyPhoto} {/* сменить фото, если это мой профиль*/}

                </Col>
                <Col xs={12} md={7} >
                    {!editMode && <div className={classes.posRelative}>
                        {showProfile} {/*показать профиль*/}
                        {editedSuccessfully // если успешно обновлен профиль на сервере
                        && <div className={classes.editProfileStatus}>
                            {editProfileStatus[0]} {/* вывести сообщение успешного обновления*/}
                        </div>
                        }
                    </div>}

                    {editMode && editProfile} {/*редактировать профиль*/}

                    {/* Если длина больше нуля, то выводим сообщение.
                        Если сообщение sucessully, то закрываем режим редактирования, выводим успех редактирования и по сеттаймауту зануляем стейт с ошибками
                        Если не саксесфулли, то выводим ошибки и не закрываем редактирование*/}
                    {profileStatus} {/*отображение моего статуса*/}
                </Col>
            </Row>
        </Container>
    </div>
} )
export default ProfileInfo;
