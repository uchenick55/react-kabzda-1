import React from 'react';
import classes from '../DialogList.module.css';
import {NavLink} from "react-router-dom";
import x from "../../../assets/images/x.png";
import {PointerCursor} from "../../Dark_light_theme/globalStyles";


const DialogItem = ({deleteDialog, dialogId, userPhoto, userName, userId, dialogUserID}) => {
    let onMouseOverAction = () => {

    }
    return <div className={userId === dialogUserID ? classes.dialogCurrent : classes.dialog} >
        <div className={classes.dialogItemGreed}>  {/*разделение фото имени с кнопкой закрытия диалога в диалогЛисте*/}
            <div >
                <NavLink to={'/dialogs/' + userId}> {/*навигация на диалог*/}
                    <div className={classes.knopka}>
                        <div className={classes.dialogList}>{/* Разделение фото и имени*/}
                            <div>
                                <img src={userPhoto} alt={"userPhoto"} className={classes.dialogImg}/> {/*Фото диалога*/}
                            </div>
                            <div>
                                <div>{userName}</div> {/*имя*/}
                            </div>
                        </div>
                    </div>
                </NavLink>
            </div>
            <div>
                <PointerCursor>
                    <img src={x} alt={"Удалить из своего диалогЛиста"} className={classes.x}
                         onMouseOver={onMouseOverAction} onClick={() => {
                        deleteDialog(dialogId, userId)
                    }} title={"Удалить из своего диалогЛиста"}/>
                </PointerCursor>
            </div>

        </div>

    </div>
}

export default DialogItem;

