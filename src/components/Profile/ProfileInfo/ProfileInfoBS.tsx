import React, {memo, useEffect, useState} from 'react';
import Preloader from "../../common/Preloader/Preloader";
import EditProfileFormikBS from "./EditProfile/EditProfileFormikBS";
import "bootstrap/dist/css/bootstrap.min.css"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import commonClasses from "../../common/CommonClasses/common.module.css";
import {GetProfileType} from "../../api/apiTypes";
import {NulableType, ProfileType} from "../../common/types/commonTypes";
import ShowProfile from "./ShowProfile";
import classes from "../Profile.module.css"

type ProfileInfoType2 = {
    profile: NulableType<GetProfileType>,
    myId: number,
    userId: number | undefined,
    putProfile: (putProfile2: ProfileType) => void,
    editProfileStatus: Array<string>,
    setEditProfileStatus: (editProfileStatus: Array<string>) => void
}

const ProfileInfo: React.FC<ProfileInfoType2> = memo( ({
                                                           profile, myId,
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


    const showProfile = <ShowProfile profile={profile} setEditMode={setEditMode} userId={userId} myId={myId}/>

    const editProfile = <EditProfileFormikBS
        putProfile={putProfile} setEditMode={setEditMode} profile={profile}
        editProfileStatus={editProfileStatus} setEditProfileStatus={setEditProfileStatus}
    />

    return <div>
        <Container fluid="sm">
            <h2 className={commonClasses.pageHeader}>Profile</h2> {/*Заголовок*/}

            <Row>
                <Col xs={12} md={7}>
                    {!editMode && <div className={classes.posRelative}>
                        {showProfile} {/*показать профиль*/}
                        {editedSuccessfully // если успешно обновлен профиль на сервере
                        && <div className={classes.editProfileStatus}>
                            {editProfileStatus[0]} {/* вывести сообщение успешного обновления*/}
                        </div>
                        }
                    </div>}

                    {editMode && editProfile} {/*редактировать профиль*/}

                    {/* Если сообщение sucessully, то закрываем режим редактирования, выводим успех редактирования и по сеттаймауту зануляем стейт с ошибками
                        Если не саксесфулли, то выводим ошибки и не закрываем редактирование*/}
                </Col>
            </Row>
        </Container>
    </div>
} )
export default ProfileInfo;
