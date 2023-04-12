import {getProfileType} from "../../api/apiTypes";
import React from "react";
import commonClasses from "../../common/CommonClasses/common.module.css";
import Button from "react-bootstrap/Button";
import contact from "./contact.jsx";

type ShowProfileType = {
    profile: getProfileType,
    setEditMode: (editMode: boolean )=> void,
    userId: number,
    myId: number
}

const ShowProfile: React.FC<ShowProfileType> = ({profile, setEditMode, userId, myId}) => {
    // вынес отдельно отображение профиля


    return (<div
            className={`${commonClasses.textMaxWidthCommon} ${commonClasses.textMaxWidth18rem}`}>


            <h3 >{profile.fullName}</h3>
            <div ><b>Обо мне</b>: {profile.aboutMe}</div>
            <div><b>В поиске работы?</b> {profile.lookingForAJob ? "Да" : "Нет"}</div>
            <div ><b>Описание:</b> {profile.lookingForAJobDescription}</div>
            <div><b>userId:</b> {profile.userId}</div>

            <ul>
                {Object.keys(profile.contacts).map((key1) => { //
                    return (<li key={key1} >
                            {contact(key1, profile)}
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

export default ShowProfile
