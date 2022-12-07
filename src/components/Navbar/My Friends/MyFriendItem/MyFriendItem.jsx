import React from 'react';
import classes from './../MyFriends.module.css';
import {NavLink} from "react-router-dom";
import {bedug_mode} from "../../../../redux/store-redux";

const MyFriendItem = ({id, avaSrc, name, unfollowFriendsAPI, dialogUserID}) => {
    if (bedug_mode) {console.log("MyFriendItem")}


    let dialog = '/dialogs/' + id;
    let profile =  '/profile/' + id;
    return <div className={classes.myfriends}>
            <div><img src={avaSrc} className={classes.myFriendImg}/>{name} {id}</div>
        <NavLink to={dialog}>
            {dialogUserID == id
                ? <span className={classes.currentDialog} >dialog</span>
                : <span className={classes.otherDialogs} >dialog</span>
            }
        </NavLink>
        <NavLink to={profile}>
            <span className={classes.otherProfile} >profile</span>
        </NavLink>
        <span>
            <button onClick={()=>{unfollowFriendsAPI(id)}}> Remove </button>
        </span>
    </div>
}

export default MyFriendItem;

