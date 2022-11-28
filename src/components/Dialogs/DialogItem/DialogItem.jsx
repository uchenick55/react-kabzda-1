import React from 'react';
import classes from './../Dialogs.module.css';
import {NavLink} from "react-router-dom";
import {state_copy_for_debug} from "../../../redux/store-redux";

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

