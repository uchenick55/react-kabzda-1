import React from 'react';
import classes from './MyFriends.module.css';
import MyFriendItem from "./MyFriendItem/MyFriendItem";
import userPhoto from "../../../assets/images/no-image3.png";
import {bedug_mode} from "../../../redux/store-redux";
import ScrollContainer from "../../common/Scroll/ScrollContainer";


const MyFriends = ({state, unfollowFriendsAPI, dialogUserID}) => {
    if (bedug_mode) {
        console.log("MyFriends")
    }
    let MyFriendElements =
        state.map((f, index) => {
                const avaSrc = f.photos.small ? f.photos.small : userPhoto;
                return (
                    <MyFriendItem
                        key = {index}
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
                {state.length > 0 ? <b>My Friendlist:
                    <ScrollContainer
                        child={MyFriendElements}
                        height={window.screen.availHeight - 360}
                        firstInsideContainer={"friendsUp"}
                        secondInsideContainer={"friendsDown"}
                        containerElement={"friendsContainer"}
                    /> {/*отрисовка FriendList в скрол контейнере*/}
                </b> : null
                }

            </div>
        </div>
    )
}
export default MyFriends;

