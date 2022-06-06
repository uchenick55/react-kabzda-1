import React from 'react';
import classes from './../MyFriends.module.css';
import {NavLink} from "react-router-dom";

const MyFriendItem = (props) => {

    let path = '/dialogs/' + props.id;
    return <div className={classes.myfriends}>
        <NavLink to={path}>
            <div>
                <img src={props.avaSrc}/>
                {props.name}
            </div>
        </NavLink>
    </div>
}

export default MyFriendItem;

