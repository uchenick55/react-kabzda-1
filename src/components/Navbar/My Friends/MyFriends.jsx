import React from 'react';
import classes from './MyFriends.module.css';
import MyFriendItem from "./MyFriendItem/MyFriendItem";
import userPhoto from "../../../assets/images/no-image3.png";
import {bedug_mode} from "../../../redux/store-redux";
import ScrollContainer from "../../common/Scroll/ScrollContainer";


const MyFriends = ({state, unfollowFriendsAPI, dialogUserID}) => {
    if (bedug_mode) {console.log("MyFriends")}
    let MyFriendElements =
        state.map((f) => {
                const avaSrc = f.photos.small?f.photos.small:userPhoto;
                return (
                    <MyFriendItem
                        name={f.name}
                        id={f.id}
                        avaSrc={avaSrc}
                        unfollowFriendsAPI={unfollowFriendsAPI}
                        dialogUserID={dialogUserID}
                    />
                )
            }
        );
    return (
        <div className={classes.myfriends}>
            <div className={classes.myfrienditems}>
                <b>My Friendlist:</b>

                <ScrollContainer
                    child={MyFriendElements}
                    height={"348px"}
                    firstInsideContainer={"friendsUp"}
                    secondInsideContainer={"friendsDown"}
                    containerElement={"friendsContainer"}
                /> {/*отрисовка FriendList в скрол контейнере*/}
            </div>
        </div>
    )
}
export default MyFriends;

