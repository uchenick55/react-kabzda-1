import React from 'react';
import classes from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {bedug_mode} from "../../redux/store-redux";

const Profile = ({profile, status, myId, putStatusThunkCreator}) => {
    if (bedug_mode) {console.log("Profile.jsx")} // дебаг
    return <div>
        <ProfileInfo // Отображение данных выбранного пользователя
            profile = {profile} // профиль выбранного пользователя
            status={status} // статус из BLL
            myId={myId} // мой id для модификации статуса
            putStatusThunkCreator={putStatusThunkCreator} // санкреатор для обновления сатуса
        />
        <MyPostsContainer // контейнер отображения постов (пока заглушка из стейта BLL)
        />
    </div>
}
export default Profile;
