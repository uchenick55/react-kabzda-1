import React from 'react';
import classes from './../Dialogs.module.css';
import {NavLink} from "react-router-dom";
import {bedug_mode} from "../../../redux/store-redux";

const DialogItem = ({userPhoto, userName, userId, dialogUserID}) => {
    return <div className={userId===dialogUserID?classes.dialogCurrent:classes.dialog} >
        <NavLink to={'/dialogs/' + userId}> {/*навигация на диалог*/}
            <div className={classes.knopka}>
                <div className={classes.dialogList}>
                    <div>
                        <img src={userPhoto} className={classes.dialogImg}/>
                    </div>
                    {/*фото профиля*/}
                    <div>
                        <div>{userName}</div>
                    </div>
                </div>
    </div>
        </NavLink>

    </div>
}

export default DialogItem;

