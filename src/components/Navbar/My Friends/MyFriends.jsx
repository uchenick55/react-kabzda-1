import React from 'react';
import classes from './MyFriends.module.css';
import MyFriendItem from "./MyFriendItem/MyFriendItem";

const MyFriends = ({state}) => {
    let MyFriendElements =
        state.map((f) => {
                return (
                   <MyFriendItem name={f.name} id={f.id} avaSrc={f.photos.small}/>
                )
            }
        );
    return (
        <div className={classes.myfriends}>
            <div className={classes.myfrienditems}>
                <b>My Friends:</b>
                {MyFriendElements}
            </div>
        </div>
    )
}
export default MyFriends;

