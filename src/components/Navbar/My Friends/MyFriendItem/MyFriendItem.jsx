import React from 'react';
import classes from './../MyFriends.module.css';
import {NavLink} from "react-router-dom";
import {bedug_mode} from "../../../../redux/store-redux";
import DialogPic from "../../../../assets/images/dialog3.png"
import UnfollowPic from "../../../../assets/images/unfollow.png"
import {PointerCursor} from "../../../Dark_light_theme/globalStyles";


const MyFriendItem = ({id, avaSrc, name, unfollowFriendsAPI, dialogUserID}) => {
    if (bedug_mode) {
        console.log("MyFriendItem")
    }
    let dialog = '/dialogs/' + id;
    return <div className={classes.myfriends}>
        <div className={classes.myFriendImgNameId}>
            <div>
                <NavLink to={'/profile/' + id}>
                    <img src={avaSrc} alt={"myFriendImg"} title="Профиль" className={classes.myFriendImg}/>
                </NavLink>
            </div>
            <div>
                <div className={classes.DialogProfileUnfollow}>
                    <NavLink to={'/dialogs/' + id}>
                        {dialogUserID === id
                            ? <span className={classes.currentDialog}><img src={DialogPic} alt="dialog" title="Диалог"/></span>
                            : <span className={classes.otherDialogs}><img src={DialogPic} alt="dialog" title="Диалог"/></span>
                        }
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

{/*
                <div>{id}</div>
*/}
            </div>
        </div>

    </div>
}

export default MyFriendItem;

