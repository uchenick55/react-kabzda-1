import {NavLink} from "react-router-dom";
import userPhoto from "../../assets/images/no-image3.png";
import React from "react";
import classes from "./Header.module.css"
import {NulableType} from "../../types/commonTypes";
import {getProfileType} from "../api/apiTypes";

type ProfileRenderType = {
    isAuth: boolean, // Флаг авторизации
    myProfile: NulableType<getProfileType>, // мой расширенный профиль по умолчанию
}
const ProfileRender: React.FC<ProfileRenderType> = ({isAuth, myProfile}) => {

    type UserPhotoType = {
        src: typeof userPhoto
    }
    const UserPhoto: React.FC<UserPhotoType> = ({src}) => <img src={src} alt={"userPhoto"} title={"profile"}
                                                               className={classes.myHeaderWH1 + " " + classes.rounded}/>

    return <span> {/*блок отрисовки профиля в header и ссылки logout*/}
        {
            isAuth && <span > <NavLink to={`/profile/`}>
                            {!myProfile
                                ? <UserPhoto src={userPhoto}/> // просто заглушка если нет моего профиля
                                : <span>
                                    {!myProfile.photos.small
                                        ? <UserPhoto src={userPhoto}/> // просто заглушка если нет моей фотки в профиле
                                        : <UserPhoto src={myProfile.photos.small}/>
                                    }
                                </span>
                            }
                        </NavLink>
                    {/*отрисовка моих логина и фото с профиля + ссылка на профиль*/}
                    </span>
        }
    </span>
}

export default ProfileRender
