import React from 'react';
import classes from './../Dialogs.module.css';
import {NavLink} from "react-router-dom";
import x from "../../../assets/images/x.png";


const DialogItem = ({deleteDialog, dialogId, userPhoto, userName, userId, dialogUserID}) => {
    let onMouseOverAction = () => {

    }
    return <div className={userId===dialogUserID?classes.dialogCurrent:classes.dialog} >
        <NavLink to={'/dialogs/' + userId}> {/*навигация на диалог*/}
            <div className={classes.knopka}>
                <div className={classes.dialogList}>
                    <div>
                        <img src={userPhoto} alt={"userPhoto"} className={classes.dialogImg}/>
                    </div>
                    {/*фото профиля*/}
                    <div>
                        <div>{userName}</div>
                        <img src={x} alt={"Удалить из своего диалогЛиста"} className={classes.x} onMouseOver={onMouseOverAction} onClick={()=>{deleteDialog(dialogId, userId )}} title ={"Удалить из своего диалогЛиста"}/>
                        <div>{userId}</div>
                    </div>
                </div>
    </div>
        </NavLink>

    </div>
}

export default DialogItem;

