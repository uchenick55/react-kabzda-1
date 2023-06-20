import {GetProfileType} from "../../api/apiTypes";
import React, {memo} from "react";
import commonClasses from "../../common/CommonClasses/common.module.css";
import Button from "react-bootstrap/Button";
import Contact from "./Contact";

type ShowProfileType = {
    profile: GetProfileType,
    setEditMode: (editMode: boolean )=> void,
    userId: number,
    myId: number
}

const ShowProfile: React.FC<ShowProfileType> =memo( ({profile, setEditMode, userId, myId}) => {
    // вынес отдельно отображение профиля


    return (<div
            className={`${commonClasses.textMaxWidthCommon} ${commonClasses.textMaxWidth18rem}`}>

            <h3 title={profile.fullName}>{profile.fullName}</h3>
            <div ><b>Обо мне</b>: <span title={profile.aboutMe}> {profile.aboutMe}</span></div>
            <div><b>В поиске работы?</b> <span title={profile.lookingForAJob ? "Да" : "Нет"}>{profile.lookingForAJob ? "Да" : "Нет"}</span></div>
            <div ><b>Описание:</b> <span title={profile.lookingForAJobDescription}>{profile.lookingForAJobDescription}</span></div>
            <div><b>userId:</b> <span title={profile.userId.toString()}>{profile.userId}</span> </div>

            <ul>
                {profile && Object.keys(profile.contacts).map((key1, ind) => { // ключи contacts
                    const Value:string = Object.values(profile.contacts)[ind] // значения contacts
                    return (<li key={key1}>
                            <Contact key1={key1} Value={Value} /> {/*вывод ключ + значение*/}
                        </li>
                    )
                })}
            </ul>

            {(userId === 0) && <Button onClick={() => {
                setEditMode(true)
            }}>Редактировать профиль </Button>}

        </div>
    )
})

export default ShowProfile
