import React from 'react';
import classes from './MyFriends.module.css';
import MyFriendItem from "./MyFriendItem/MyFriendItem";
import userPhoto from "../../../assets/images/no-image3.png";
import ScrollContainer from "../../-Scroll/ScrollContainer";


const MyFriends = ({state, unfollowFriendsAPI, dialogUserID}) => {

    let MyFriendElements =
        state.map((f) => {
                const avaSrc = f.photos.small ? f.photos.small : userPhoto;
                return (
                    <MyFriendItem
                        key = {f.id}
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
                {state.length > 0 &&
                <b>My Friends:
                    <ScrollContainer
                        child={MyFriendElements}
                        height={window.screen.availHeight - 390}
                        firstInsideContainer={"friendsUp"}
                        secondInsideContainer={"friendsDown"}
                        containerElement={"friendsContainer"}
                    /> {/*отрисовка FriendList в скрол контейнере*/}
                </b>
                }

            </div>
        </div>
    )
}
export default MyFriends;
