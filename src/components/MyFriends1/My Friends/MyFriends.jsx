import React from 'react';
import classes from './MyFriends.module.css';
import MyFriendItem from "./MyFriendItem/MyFriendItemBS";
import userPhoto from "../../../assets/images/no-image3.png";
import {bedug_mode} from "../../../redux/store-redux";
import ScrollContainer from "../../common/Scroll/ScrollContainer";
import commonClasses from "../../common/CommonClasses/common.module.css";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css"


const MyFriends = ({state, unfollowFriendsAPI, dialogUserID}) => {
    if (bedug_mode) {
        console.log("MyFriends")
    }
    let MyFriendElements =
        state.map((f) => {
                const avaSrc = f.photos.large ? f.photos.large : userPhoto;
                return (
                    <MyFriendItem
                        key={f.id}
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
        <Container>
            <h2 className={commonClasses.pageHeader}>My Friends</h2>

            <div>
                {state.length > 0 &&
                <div class="col-12 col-sm-3 col-lg-2 d-inline-block d-flex">
                    {MyFriendElements}{/*отрисовка FriendList*/}
                </div>
                }

            </div>
        </Container>
    )
}
export default MyFriends;
