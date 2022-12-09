import React from 'react';
import classes from './../Dialogs.module.css';
import {NavLink} from "react-router-dom";
import {bedug_mode} from "../../../redux/store-redux";

const DialogItem = ({userPhoto, userName, userId}) => {
    return <div className={classes.dialog}>
        <NavLink to={'/dialogs/' + userId}> {/*навигация на диалог*/}
            <button>
                <div className={classes.dialogList}>
                    <div>
                        <img src={userPhoto}/>
                    </div>
                    {/*фото профиля*/}
                    <div>
                        <div className={classes.dialogImg}>{userName}</div>
                    </div>
                </div>
            </button>
        </NavLink>
    </div>
}
/*<NavLink to={'/profile/' + userId}> {/!*навигация в профиль*!/}
    profile
</NavLink>*/

export default DialogItem;

