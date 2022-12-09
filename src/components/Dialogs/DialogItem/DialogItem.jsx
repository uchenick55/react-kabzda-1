import React from 'react';
import classes from './../Dialogs.module.css';
import {NavLink} from "react-router-dom";
import {bedug_mode} from "../../../redux/store-redux";

const DialogItem = ({userPhoto, userName, userId}) => {
    return <div className={classes.dialog}>
        <div className={classes.dialogList}>
            <div><img src={userPhoto}/></div>
            {/*фото профиля*/}
            <div>
                <NavLink to={'/dialogs/' + userId}> {/*навигация на диалог*/}
                    dialog
                </NavLink>
                <NavLink to={'/profile/' + userId}> {/*навигация в профиль*/}
                    profile
                </NavLink>
                <div>{userName}</div>
            </div>
        </div>
    </div>
}


export default DialogItem;

