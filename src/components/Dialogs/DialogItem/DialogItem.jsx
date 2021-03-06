import React from 'react';
import classes from './../Dialogs.module.css';
import {NavLink} from "react-router-dom";

const DialogItem = (props) => {

    let path = '/dialogs/' + props.id;
    return <div className={classes.dialog}>
        <NavLink to={path}>
            <div>
                <img src={props.avaSrc}/>
                {props.name}
            </div>
        </NavLink>
    </div>
}

export default DialogItem;

