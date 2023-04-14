import {getProfileType} from "../../api/apiTypes";
import React from "react";
import commonClasses from "../../common/CommonClasses/common.module.css";
import Button from "react-bootstrap/Button";
import Contact from "./Contact";

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
}

export default ShowProfile
