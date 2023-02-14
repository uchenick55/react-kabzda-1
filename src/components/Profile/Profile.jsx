import React from 'react';
import classes from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfoBS";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {bedug_mode} from "../../redux/store-redux";
import ScrollContainer from "../common/Scroll/ScrollContainer";

const Profile = ({profile, status, myId, putStatusThunkCreator, uploadImage,
                     userId, putProfile, editProfileStatus, setEditProfileStatus}) => {
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
            putProfile={putProfile}
            editProfileStatus={editProfileStatus} // список ошибок правки формы профиля с сервера
            setEditProfileStatus={setEditProfileStatus}
        />
        <MyPostsContainer // контейнер отображения постов (пока заглушка из стейта BLL)
            userId={userId} // id выбранного пользователя, берется из URL
        />
    </div>
    return <div>
        {ProfileRender}
        {/*   <ScrollContainer
            child={ProfileRender}
            height={window.screen.availHeight - 218}
            firstInsideContainer={"ProfileUp"}
            secondInsideContainer={"ProfileDown"}
            containerElement={"ProfileContainer"}
        /> {/*отрисовка FriendList в скрол контейнере*/}
    </div>
}
export default Profile;
