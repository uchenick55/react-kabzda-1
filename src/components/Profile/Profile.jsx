import React from 'react';
import classes from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {state_copy_for_debug} from "../../redux/store-redux";

const Profile = ({profile, status, myId, putStatusThunkCreator}) => {
    return <div className={classes.content}>
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
