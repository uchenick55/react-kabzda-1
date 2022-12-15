import React from 'react';
import classes from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {bedug_mode} from "../../redux/store-redux";
import ScrollContainer from "../common/Scroll/ScrollContainer";

const Profile = ({profile, status, myId, putStatusThunkCreator, uploadImage, userId}) => {
    if (bedug_mode) {
        console.log("Profile.jsx")
    } // дебаг

    let ProfileRender = <div className={classes.ProfileRender}>
        <ProfileInfo // Отображение данных выбранного пользователя
            profile={profile} // профиль выбранного пользователя
            status={status} // статус из BLL
            myId={myId} // мой id для модификации статуса
            putStatusThunkCreator={putStatusThunkCreator} // санкреатор для обновления сатуса
            uploadImage={uploadImage} // колбек загрузки фото профиля на сервер
            userId={userId} // id выбранного пользователя, берется из URL
        />
        <MyPostsContainer // контейнер отображения постов (пока заглушка из стейта BLL)
            userId={userId} // id выбранного пользователя, берется из URL
        />
    </div>
    return <div>
        <ScrollContainer
            child={ProfileRender}
            height={window.screen.availHeight-230}
            firstInsideContainer={"ProfileUp"}
            secondInsideContainer={"ProfileDown"}
            containerElement={"ProfileContainer"}
        /> {/*отрисовка FriendList в скрол контейнере*/}


    </div>
}
export default Profile;
