import React from 'react';
import classes from './MyFriends.module.css';
import MyFriendItem from "./MyFriendItem/MyFriendItem";
import userPhoto from "../../../assets/images/no-image3.png";
import {bedug_mode} from "../../../redux/store-redux";
import ScrollContainer from "../../common/Scroll/ScrollContainer";
import commonClasses from "../../common/CommonClasses/common.module.css";
import Container from "react-bootstrap/Container";


const MyFriends = ({state, unfollowFriendsAPI, dialogUserID}) => {
    if (bedug_mode) {
        console.log("MyFriends")
    }
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
        <div>
            <h2 className={commonClasses.pageHeader}>My Friends</h2>

            <div className={classes.myfrienditems}>
                {state.length > 0 &&
                <b>My Friends:
                    {MyFriendElements}{/*отрисовка FriendList*/}

                </b>
                }

            </div>
        </div>
    )
}
export default MyFriends;

