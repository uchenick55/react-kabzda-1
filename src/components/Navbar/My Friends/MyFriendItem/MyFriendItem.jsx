import React from 'react';
import classes from './../MyFriends.module.css';
import {NavLink} from "react-router-dom";

const MyFriendItem = ({id, avaSrc, name}) => {

    let path = '/dialogs/' + id;
    return <div className={classes.myfriends}>
        <NavLink to={path}>
            <div>
                <img src={avaSrc}/>
                {name}
            </div>
        </NavLink>
    </div>
}

export default MyFriendItem;

