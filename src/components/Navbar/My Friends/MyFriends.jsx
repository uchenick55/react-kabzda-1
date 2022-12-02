import React from 'react';
import classes from './MyFriends.module.css';
import MyFriendItem from "./MyFriendItem/MyFriendItem";
import userPhoto from "../../../assets/images/no-image3.png";
import {bedug_mode, debugItem} from "../../../redux/store-redux";


const MyFriends = ({state, unfollowFriendsAPI}) => {
    if (bedug_mode) {console.log("MyFriends", debugItem)}
    let MyFriendElements =
        state.map((f) => {
                const avaSrc = f.photos.small?f.photos.small:userPhoto;
                return (
                    <MyFriendItem name={f.name} id={f.id} avaSrc={avaSrc} unfollowFriendsAPI={unfollowFriendsAPI} />
                )
            }
        );
    return (
        <div className={classes.myfriends}>
            <div className={classes.myfrienditems}>
                <b>My Friendlist:</b>
                {MyFriendElements}
            </div>
        </div>
    )
}
export default MyFriends;

