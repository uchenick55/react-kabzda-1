import React from 'react';
import classes from './../Dialogs.module.css';
import {NavLink} from "react-router-dom";
import {bedug_mode} from "../../../redux/store-redux";

const DialogItem = ({userPhoto, userName, userId}) => {
    let path = '/dialogs/' + userId;
    return <div className={classes.dialog}>
        <NavLink to={path}>
            <div>
                <img src={userPhoto}/>
                {userName}
            </div>
        </NavLink>
    </div>
}


export default DialogItem;

