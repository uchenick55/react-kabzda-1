import React from 'react';
import classes from './Profile.module.css'
import ProfileInfo from "../Info/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {bedug_mode} from "../../redux/store-redux";
import ScrollContainer from "../common/Scroll/ScrollContainer";

const Profile = ({profile, status, myId, putStatusThunkCreator}) => {
    if (bedug_mode) {
        console.log("Profile.jsx")
    } // дебаг

    let ProfileRender = <div className={classes.ProfileRender}>
        <ProfileInfo // Отображение данных выбранного пользователя
            profile={profile} // профиль выбранного пользователя
            status={status} // статус из BLL
            myId={myId} // мой id для модификации статуса
            putStatusThunkCreator={putStatusThunkCreator} // санкреатор для обновления сатуса
        />
        <MyPostsContainer // контейнер отображения постов (пока заглушка из стейта BLL)
        />
    </div>
    return <div>
        <ScrollContainer
            child={ProfileRender}
            height={window.screen.availHeight-280}
            firstInsideContainer={"ProfileUp"}
            secondInsideContainer={"ProfileDown"}
            containerElement={"ProfileContainer"}
        /> {/*отрисовка FriendList в скрол контейнере*/}


    </div>
}
export default Profile;
