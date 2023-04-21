import classes from "./Users.module.css";
import commonClasses from "../common/CommonClasses/common.module.css";
import {NavLink} from "react-router-dom";
import Image from "react-bootstrap/Image";
import userPhoto from "../../assets/images/no-image3.png";
import React from "react";
import FollowUnfollowButtons2 from "./FollowUnfollowButtons2";
import {usersType} from "../api/apiTypes";
import './scss/style.scss'

type UserItemsType = {
    users: Array<usersType>, // Реселектор users- список пользователей в пачке от сервера
    patch: string, // страница из адресной строки
    PageWidth: number, // ширина страницы
    unfollowAPI: (id: number) => void,
    followAPI: (id: number) => void,
    followingInProgress: Array<number>, // селектор followingInProgress - массив на кого мы подписались, кнопка неактивна
    isAuth: boolean, // селектор isAuth - флаг авторизации

}
const UserItems: React.FC<UserItemsType> = ({users, unfollowAPI, followAPI, followingInProgress, isAuth, patch, PageWidth}) => {
    // отрисовка всех карточек с пользователями
    console.log( PageWidth )

    const UsersClassName =
        patch === "users"  // если путь в адресной строке это users
            ? "m-1 col-12 col-sm-5 col-lg-3 d-inline-block" // в зависимости от разрешения экрана менять количество столбцов
            : patch === "dialogs" // для страницы диалогов
            ? "m-1 col-12" // всегда пользователи в одну строку
            : "" // для других случаев не используется Users

    return <div>


        <div id='grid'>
            {
                users.map( (u) => { // пробегаем по пользовтелям
                    return <div key={u.id} className={classes.Relative}>
                        <NavLink to={'/dialogs/' + u.id} >
                            <div>

                                <div className={classes.star}>
                                    {u.followed
                                        ? <FollowUnfollowButtons2 u={u} followUnfollowAPICallback={unfollowAPI}
                                                                  followingInProgress={followingInProgress}
                                                                  isAuth={isAuth}/>
                                        : <FollowUnfollowButtons2 u={u} followUnfollowAPICallback={followAPI}
                                                                  followingInProgress={followingInProgress}
                                                                  isAuth={isAuth}/>
                                    }
                                </div>
                                <Image fluid={true}
                                       className={classes.userPhoto}
                                       src={u.photos.small !== null // или маленькая картинка профиля или заглушка
                                           ? u.photos.small
                                           : userPhoto}
                                       alt={"Перейти в профиль"}
                                       title={"Перейти в профиль"}
                                />
                                <div className={classes.name + " " + classes.nameStatusCommon}>
                                    {u.name &&
                                    u.name} {/*имя */}
                                </div>
                                <div className={classes.status + " " + classes.nameStatusCommon}>
                                    {u.status &&
                                    u.status} статус
                                </div>

                            </div>
                        </NavLink>
                    </div>
                } )
            }
        </div>

    </div>
}

export default UserItems
