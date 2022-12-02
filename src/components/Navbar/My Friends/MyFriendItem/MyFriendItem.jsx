import React from 'react';
import classes from './../MyFriends.module.css';
import {NavLink} from "react-router-dom";
import {bedug_mode, debugItem} from "../../../../redux/store-redux";

const MyFriendItem = ({id, avaSrc, name, unfollowFriendsAPI}) => {
    if (bedug_mode) {console.log("MyFriendItem", debugItem)}


    let dialog = '/dialogs/' + id;
    let profile =  '/profile/' + id;
    return <div className={classes.myfriends}>
            <div><img src={avaSrc}/>{name} {id}</div>
        <div></div>
        <NavLink to={dialog}>
            dialog
        </NavLink>
        <NavLink to={profile}>
            profile
        </NavLink>
        <div>
            <button onClick={()=>{unfollowFriendsAPI(id)}}> Remove </button>
        </div>
    </div>
}

export default MyFriendItem;

