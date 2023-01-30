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

             className={imgScale === id ? classes.myFriendImg : classes.myFriendImgHover}
          //   className={   imgScale === id ? classes.myFriendImg : classes.myFriendImgHover}

             onMouseOver={() => {
                 setImgScale(id)
             }}
             onMouseLeave={() => {
                 setImgScale(null)
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
                        <span className={classes.dialogImg}
                              //className={imgScale === id ? classes.myFriendImg : classes.myFriendImgHover}

                              onMouseOver={() => {
                                  setDilalogScale(id)
                              }}
                              onMouseLeave={() => {
                                  setDilalogScale(null)
                              }}
                        >
                            <img src={DialogPic} alt="dialog" title="Диалог"/>
                        </span>
                    </NavLink>
                    <span>
                        <PointerCursor>
                            <img src={UnfollowPic} onClick={() => {
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

