import Card from "react-bootstrap/Card";
import classes from "./Users.module.css";
import commonClasses from "../common/CommonClasses/common.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {NavLink} from "react-router-dom";
import Image from "react-bootstrap/Image";
import userPhoto from "../../assets/images/no-image3.png";
import DialogPic from "../../assets/images/swg/dialog-svgrepo-com.svg";
import React from "react";
import FollowUnfollowButtons2 from "./FollowUnfollowButtons2";
import {usersType} from "../api/apiTypes";
import {useLocation} from "react-router";

type UserItemsType = {
    users: Array<usersType>, // Реселектор users- список пользователей в пачке от сервера
    patch: string, // страница из адресной строки
    unfollowAPI: (id: number) => void,
    followAPI: (id: number) => void,
    followingInProgress: Array<number>, // селектор followingInProgress - массив на кого мы подписались, кнопка неактивна
    isAuth: boolean, // селектор isAuth - флаг авторизации

}
const UserItems: React.FC<UserItemsType> = ({users, unfollowAPI, followAPI, followingInProgress, isAuth, patch}) => {
    // отрисовка всех карточек с пользователями
    const UsersClassName =
        patch === "users"  // если путь в адресной строке это users
            ? "my-2 col-12 col-sm-5 col-lg-2 d-inline-block" // в зависимости от разрешения экрана пенять количество столбцов
            : patch === "dialogs" // для страницы диалогов
            ? "my-2 col-12 d-inline-block" // всегда пользователи в одну строку
            : "" // для других случаев не используется Users пока
    {/* my-2 col-12 col-sm-5 col-lg-2 d-inline-block"размеры карточек в зависимости от размера экрана*/
    }

    return <div>
        {
            users.map( (u) => { // пробегаем по пользовтелям
                return <div key={u.id} className={UsersClassName}>
                    <NavLink to={'/dialogs/' + u.id}>
                        <Card className={classes.myCard}>  {/*оформление*/}

                                {/* <Card.Title
                                    className={`${commonClasses.textMaxWidthCommon} ${commonClasses.textMaxWidth8rem}`}>{u.name}</Card.Title> максимальная ширина заголовка 8 rem*/}
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
                                <div
                                    className={`
                                    ${commonClasses.textMaxWidthCommon} 
                                    ${commonClasses.textMaxWidth18rem}
                                    ${classes.name}
                                    
                                    `}>
                                    {u.name &&
                                    <div>{u.name}</div>} {/*имя */}
                                </div>
                                <div
                                    className={`
                                    ${commonClasses.textMaxWidthCommon} 
                                    ${commonClasses.textMaxWidth8rem}
                                    ${classes.status}
                                    
                                    `}>
                                    {u.status &&
                                    <div>{u.status}</div>} {/*статус */}
                                </div>

                        </Card>
                    </NavLink>
                </div>
            } )
        }
    </div>
}

export default UserItems
