import React from 'react';
import classes from './MyFriends.module.css';
import {NavLink} from "react-router-dom";
import MyFriendItem from "./MyFriendItem/MyFriendItem";

const MyFriends = (props) => {
    let MyFriendElements =
        props.state.map((f) => {
                return (
                    <MyFriendItem name={f.name} id={f.id} avaSrc={f.avaSrc}/>
                )
            }
        );
    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogItems}>
                {MyFriendElements}
            </div>
        </div>
    )
}
export default MyFriends;

