import classes from "./Users.module.css";
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
    let gridColsClass:string = ""
    if (patch==="users") {
        if (PageWidth<460) {
            gridColsClass="grid1col"
        }
        if (PageWidth>=460 && PageWidth<800 ) {
            gridColsClass="grid2col"
        }
        if (PageWidth>=800 && PageWidth<1200 ) {
            gridColsClass="grid3col"
        }
        if (PageWidth>=1200 && PageWidth<1600 ) {
            gridColsClass="grid4col"
        }
        if (PageWidth>=1600 && PageWidth<2000 ) {
            gridColsClass="grid5col"
        }
        if (PageWidth>=2000) {
            gridColsClass="grid6col"
        }
    }
    if (patch==="dialogs") {
        gridColsClass="grid1col"
    }

        return <div className={gridColsClass}> {/*разбивка данных пользователей на карточки*/}
        {
            users.map( (u) => { // пробегаем по пользовтелям
                return <div key={u.id} className={classes.Relative}>
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
                    <NavLink to={'/dialogs/' + u.id}>
                        <div>

                            <Image fluid={true}
                                   className={classes.userPhoto}
                                   src={u.photos.small !== null // или маленькая картинка профиля или заглушка
                                       ? u.photos.small
                                       : userPhoto}
                                   alt={"Перейти в профиль"}
                                   title={"Перейти в профиль"}
                            />
                            <div className={classes.name + " " + classes.nameStatusCommon}>
                                {u.name && u.name} {/*имя */}
                            </div>
                            <div className={classes.status + " " + classes.nameStatusCommon}>
                                {u.status && u.status} {/*статус*/}
                            </div>
                        </div>
                    </NavLink>
                </div>
            } )
        }
    </div>
}

export default UserItems
