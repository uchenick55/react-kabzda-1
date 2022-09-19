import React from 'react';
import classes from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = (props) => {

    return <div className={classes.content}>
        <ProfileInfo // Отображение данных выбранного пользователя
            profile = {props.profile} // профиль выбранного пользователя
            status={props.status} // статус из BLL
            myId={props.myId} // мой id для модификации статуса
            putStatusThunkCreator={props.putStatusThunkCreator} // санкреатор для обновления сатуса
            getStatusThunkCreator={props.getStatusThunkCreator} // санкреатор для получения сатуса
        />
        <MyPostsContainer // контейнер отображения постов (пока заглушка из стейта BLL)
        />
    </div>
}
export default Profile;
