import React, {useState} from 'react';
import classes from './../MyFriends.module.css';
import {NavLink} from "react-router-dom";
import {bedug_mode} from "../../../../redux/store-redux";
import DialogPic from "../../../../assets/images/dialog3.png"
import UnfollowPic from "../../../../assets/images/unfollow.png"
import {PointerCursor} from "../../../Dark_light_theme/globalStyles";


const MyFriendItem = ({id, avaSrc, name, unfollowFriendsAPI, dialogUserID}) => {
    const [imgScale, setImgScale] = useState(null);
    const [dilalogScale, setDilalogScale] = useState(null);

    if (bedug_mode) {
        console.log("MyFriendItem")
    }

    const commonImgRender = (src, alt, title, className1, setIdMethod) => {
        return <img src={src} alt={alt} title={title}
                    className={className1}
            // склеивание классов нормальной картинки и при наведении мышкой
                    onMouseOver={() => { // при наведении мышкой на картинку друга
                        setIdMethod(id) // задать ее id
                    }}
                    onMouseLeave={() => { // при убирании мышки
                        setIdMethod(null) // занyлить класс наведения
                    }}
        />
    }
    const profileImgRenderClass = `${classes.myFriendImg} ${imgScale === id ? classes.myFriendImgHover : ""}`

    const profileImgRender1 = commonImgRender(
        avaSrc,// аватар для отрисовки картинки из профиля друга
        "myFriendImg", // альтернативный текст картинки
        "Профиль", // заголовок профиль
        `${classes.myFriendImg} ${imgScale === id ? classes.myFriendImgHover : ""}`, // стиль картинок при наведении
        setImgScale // метод для обновления id картинки, на которую навели мышкой
    )

    const dialogImgRender1 = commonImgRender(
        DialogPic,// аватар для отрисовки картинки из профиля друга
        "dialog", // альтернативный текст картинки
        "Диалог", // заголовок профиль
        `${classes.dialogImg} ${dilalogScale === id ? classes.dialogImgHover : ""}`, // стиль картинок при наведении
        setDilalogScale // метод для обновления id картинки, на которую навели мышкой
    )

    const removeFriendRender1 = <img src={UnfollowPic} alt="remove_friend" onClick={() => {
        unfollowFriendsAPI(id)
    }} alt="Удалить friendList" title="Удалить из друзей"/>

    return <div className={classes.myfriends}>
        <div className={classes.myFriendImgNameId}>
            <div>
                <NavLink to={'/profile/' + id}>
                    {profileImgRender1} {/*отрисовка фото друзей с анимацией*/}
                </NavLink>

            </div>
            <div>
                <div className={classes.DialogProfileUnfollow}>
                    <NavLink to={'/dialogs/' + id}>
                        {dialogImgRender1} {/*отрисовка картитнки начала диалога с анимацией*/}
                    </NavLink>
                    <PointerCursor>
                        {removeFriendRender1} {/*отрисовка картинок удаления друзей с анимацией*/}
                    </PointerCursor>
                </div>
                <div className={classes.myFriendName}> {name}</div> {/*отрисовка имени друга*/}
            </div>
        </div>

    </div>
}

export default MyFriendItem;

