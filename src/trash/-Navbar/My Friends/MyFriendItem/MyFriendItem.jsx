import React, {useState} from 'react';
import classes from '../MyFriends.module.css';
import {NavLink} from "react-router-dom";
import DialogPic from "../../../../assets/images/dialog3.png"
import UnfollowPic from "../../../../assets/images/unfollow.png"
import {PointerCursor} from "../../../-Dark_light_theme/-globalStyles";


const MyFriendItem = ({id, avaSrc, name, unfollowFriendsAPI}) => {
    /*для тренировки - альтернатива псевдоклассу :hover через хуки useState*/
    const [imgScale, setImgScale] = useState(null);// стейт для анимации наведения на картинку друга
    const [dilalogScale, setDilalogScale] = useState(null); // стейт для анимации наведения на картинку диалога
    const [removeScale, setRemoveScale] = useState(null); // стейт для анимации наведения на картинку удаления друга

    const commonImgRender = (src, alt, title, className1, setIdMethod, onClickMethod) => { // общий метод отрисовки картинок
        return <img src={src} alt={alt} title={title} // url картинки, тайтл и alt
                    className={className1} // класс картитнки с анимацией
                    onMouseOver={() => { // при наведении мышкой на картинку
                        setIdMethod(id) // задать ее id в соответствующий метод useState (так меняется класс)
                    }}
                    onMouseLeave={() => { // при убирании мышки
                        setIdMethod(null) // занyлить id в методе useState (так меняется класс)
                    }}
                    onClick={() => {
                        onClickMethod(id)
                    }}
        />
    }
    const profileImgRender1 = commonImgRender(
        avaSrc,// src для отрисовки картинки из профиля друга
        "myFriendImg", // альтернативный текст картинки
        "Профиль", // заголовок
        `${classes.myFriendImg} ${imgScale === id ? classes.myFriendImgHover : ""}`, // стиль картинок при наведении
        setImgScale // метод для обновления id картинки, на которую навели мышкой
    )

    const dialogImgRender1 = commonImgRender(
        DialogPic,// src для отрисовки картинки начала диалога
        "dialog", // альтернативный текст картинки
        "Диалог", // заголовок
        `${classes.Img} ${dilalogScale === id ? classes.ImgHover : ""}`, // стиль картинок при наведении
        setDilalogScale // метод для обновления id картинки, на которую навели мышкой
    )

    const removeFriendRender1 = commonImgRender(
        UnfollowPic,// src для отрисовки картинки удаления друга из списка
        "remove_friend", // альтернативный текст картинки
        "Удалить из friendList", // заголовок
        `${classes.Img} ${removeScale === id ? classes.ImgHover : ""}`, // стиль картинок при наведении
        setRemoveScale, // метод для обновления id картинки, на которую навели мышкой
        unfollowFriendsAPI // метод удаления друга из диалогов
    )

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
                        {dialogImgRender1 /*отрисовка картитнки начала диалога с анимацией*/}
                    </NavLink>
                        {removeFriendRender1 /*отрисовка картинок удаления друзей с анимацией*/}
                </div>
                <div className={classes.myFriendName}> {name}</div> {/*отрисовка имени друга*/}
            </div>
        </div>

    </div>
}

export default MyFriendItem;

