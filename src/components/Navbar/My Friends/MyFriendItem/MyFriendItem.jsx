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


    const profileImgRender = <NavLink to={'/profile/' + id}>
        <img src={avaSrc} alt={"myFriendImg"} title="Профиль"
             className={`${classes.myFriendImg} ${imgScale === id ? classes.myFriendImgHover : ""}`}
            // склеивание классов нормальной картинки и при наведении мышкой
             onMouseOver={() => { // при наведении мышкой на картинку друга
                 setImgScale(id) // задать ее id
             }}
             onMouseLeave={() => { // при убирании мышки
                 setImgScale(null) // занyлить класс наведения
             }}

        />
    </NavLink>

    return <div className={classes.myfriends}>
        <div className={classes.myFriendImgNameId}>
            <div>
                {profileImgRender} {/*отрисовка фото друзей с анимацией*/}
            </div>
            <div>
                <div className={classes.DialogProfileUnfollow}>
                    <NavLink to={'/dialogs/' + id}>
                        <img src={DialogPic} alt="dialog" title="Диалог"
                             className={`${classes.dialogImg} ${dilalogScale === id ? classes.dialogImgHover : ""}`}
                            // склеивание классов нормальной картинки и при наведении мышкой
                             onMouseOver={() => {
                                 setDilalogScale(id)
                             }}
                             onMouseLeave={() => {
                                 setDilalogScale(null)
                             }}/>
                    </NavLink>
                    <span>
                        <PointerCursor>
                            <img src={UnfollowPic} alt="remove_friend" onClick={() => {
                                unfollowFriendsAPI(id)
                            }} alt="Удалить friendList" title="Удалить из друзей"/>
                        </PointerCursor>
                     </span>
                </div>
                <div className={classes.myFriendName}> {name}</div>

            </div>
        </div>

    </div>
}

export default MyFriendItem;

