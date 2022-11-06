import React from 'react';
import classes from './../Dialogs.module.css';
import {NavLink} from "react-router-dom";

const DialogItem = ({avaSrc, name, id}) => {

    let path = '/dialogs/' + id;
    return <div className={classes.dialog}>
        <NavLink to={path}>
            <div>
                <img src={avaSrc}/>
                {name}
            </div>
        </NavLink>
    </div>
}


export default DialogItem;

