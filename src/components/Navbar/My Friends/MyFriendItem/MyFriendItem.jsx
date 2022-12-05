import React from 'react';
import classes from './../MyFriends.module.css';
import {NavLink} from "react-router-dom";
import {bedug_mode} from "../../../../redux/store-redux";

const MyFriendItem = ({id, avaSrc, name, unfollowFriendsAPI, dialogUserID}) => {
    if (bedug_mode) {console.log("MyFriendItem")}


    let dialog = '/dialogs/' + id;
    let profile =  '/profile/' + id;
    return <div className={classes.myfriends}>
            <div><img src={avaSrc}/>{name} {id}</div>
        <NavLink to={dialog}>
            {dialogUserID == id
                ? <span className={classes.currentDialog} >dialog</span>
                : <span>dialog{" "}</span>
            }
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

