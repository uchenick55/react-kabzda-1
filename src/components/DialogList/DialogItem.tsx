import React from 'react';
import classes from './Messages/UserListMessages.module.css';
import {NavLink} from "react-router-dom";
import x from "../../assets/images/x.png";

type DialogItemType = {
    dialogId:number,
    userPhoto:string,
    userName:string,
    userId:number,
    dialogUserID:number
    deleteDialog:(dialogId:number,  userId:number)=>void,

}
const DialogItem:React.FC<DialogItemType> = ({deleteDialog, dialogId, userPhoto, userName, userId, dialogUserID}) => {

    const DialogNamePhotoRender = <NavLink to={'/dialogs/' + userId}> {/*навигация на диалог*/}
        {/*отдельно вынес отрисовку фото и имени пользователя со сменой URL*/}
        <div >
            <div>{/* Разделение фото и имени*/}
                <div>
                    <img src={userPhoto} alt={"userPhoto"}/> {/*Фото диалога*/}
                </div>
                <div>
                    <div>{userName}</div>
                    {/*имя*/}
                </div>
            </div>
        </div>
    </NavLink>

    const deleteDialogRender = <div> {/*вынес отдельно кнопку удаления диалога из диалоглиста*/}
        <img src={x} alt={"Удалить из своего диалогЛиста"}
             onClick={() => {
                 deleteDialog(dialogId, userId)
             }} title={"Удалить из своего диалогЛиста"}/>
    </div>

    return <div>
        <div>  {/*разделение фото имени с кнопкой закрытия диалога в диалогЛисте*/}
            <div>
                {DialogNamePhotoRender} {/*отдельно вынес отрисовку фото и имени пользователя со сменой URL*/}
            </div>
            <div>
                {deleteDialogRender} {/*вынес отдельно кнопку удаления диалога из диалоглиста*/}
            </div>
        </div>
    </div>
}

export default DialogItem;

