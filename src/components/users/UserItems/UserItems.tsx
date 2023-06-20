import classes from "../Users.module.css";
import {NavLink} from "react-router-dom";
import Image from "react-bootstrap/Image";
import userPhoto from "../../../assets/images/no-image3.png";
import React, {memo} from "react";
import {UsersType} from "../../api/apiTypes";
import '../scss/style.scss'
import FollowPic from "../../../assets/images/swg/star-.svg";
import UnfollowPic from "../../../assets/images/swg/star+.svg";

type UserItemsType = {
    users: Array<UsersType>, // Реселектор users- список пользователей в пачке от сервера
    patch: string, // страница из адресной строки
    PageWidth: number, // ширина страницы
    unfollowAPI: (id: number) => void,
    followAPI: (id: number) => void,
    followingInProgress: Array<number>, // селектор followingInProgress - массив на кого мы подписались, кнопка неактивна
    isAuth: boolean, // селектор isAuth - флаг авторизации

}
const UserItems: React.FC<UserItemsType> = ( ({users, unfollowAPI, followAPI, followingInProgress, isAuth, patch, PageWidth}) => {
    // отрисовка всех карточек с пользователями
    console.log("UserItems")
    let gridColsClass: string = ""

    const getGridColsClass = (PageWidth:number) => {
        let gridColsClass: string = ""

        if (PageWidth < 460) {
            gridColsClass = "grid1col"
        }
        if (PageWidth >= 460 && PageWidth < 800) {
            gridColsClass = "grid2col"
        }
        if (PageWidth >= 800 && PageWidth < 1200) {
            gridColsClass = "grid3col"
        }
        if (PageWidth >= 1200 && PageWidth < 1600) {
            gridColsClass = "grid4col"
        }
        if (PageWidth >= 1600 && PageWidth < 2000) {
            gridColsClass = "grid5col"
        }
        if (PageWidth >= 2000) {
            gridColsClass = "grid6col"
        }
        return gridColsClass
    }
    if (patch === "users") {
        gridColsClass = getGridColsClass(PageWidth)
    }
    if (patch === "dialogs") {
        // eslint-disable-next-line
        gridColsClass = "grid1col" + " " + "paddingTop55" // условие отступа сверху списка пользователей только на странице dialogs
    }
    const ImageLocal = memo( Image )
    return <div className={gridColsClass}> {/*разбивка данных пользователей на карточки*/}
        {
            users.map( (u: UsersType) => { // пробегаем по пользовтелям

                const starCanBePressed = followingInProgress.some( id => id === u.id )

                const followUnfollowAPICallback = u.followed //отправить запрос на сервер сменить follow/unfollow
                    ? unfollowAPI
                    : followAPI

                const StarImgRender = <ImageLocal // отрисовка картинки добавить в избранное
                    fluid={true} // картинка растягивается
                    className={classes.star}
                    src={!u.followed ? FollowPic : UnfollowPic} // картинка в зависимости избранное или нет
                    alt={"Добавить в избранное"} // alt
                    title={"Добавить в избранное"} // title
                    onClick={() => {
                        if (!starCanBePressed) { // если кнопка еще не была нажата (нет в списке нажатых)
                            isAuth // проверка авторизации. Если нет, то алерт. Если да, то API запрос на follow/unfollow
                                ? followUnfollowAPICallback( u.id ) //отправить запрос на сервер сменить follow/unfollow
                                : alert( "You are not authorized, please Login" ) // алерт авторизуйтесь!
                        }
                    }}
                />

                const UserPhotoRender = <ImageLocal // отрисовка картинки профиля
                    fluid={true}
                    className={classes.userPhoto}
                    src={u.photos.small !== null // или маленькая картинка профиля или заглушка
                        ? u.photos.small
                        : userPhoto}
                    alt={"Перейти в профиль"}
                    title={"Перейти в профиль"}
                />

                const UserNameRender = <span // отрисовка имени пользователя

                    className={`${classes.nameStatusCommon} ${classes.name} ${patch === "users" ? classes.maxWidthcommon : classes.maxWidth1Col}`}>
                    {/*склеиваем 2 стиля - общий и для имени, а потом в зависимости от страницы изменяем длину обрезки*/}
                    {u.name && u.name} {/*имя */}
                </span>

                const UserNameStatusRender = <span // отрисовка статуса пользователя
                    className={`${classes.nameStatusCommon} ${classes.status} ${patch === "users" ? classes.maxWidthcommon : classes.maxWidth1Col}`}>
                                {u.status && u.status} {/*статус*/}
                </span>

                return <div key={u.id} className={classes.Relative}>

                    {StarImgRender}{/* отрисовка картинки добавить в избранное*/}

                    <NavLink to={'/messages/' + u.id}> {/*сменить url на ID пользователя*/}
                        {UserPhotoRender} {/*отрисовка картинки профиля*/}

                        {UserNameRender} {/*отрисовка имени пользователя*/}

                        {UserNameStatusRender} {/*отрисовка статуса пользователя*/}
                    </NavLink>
                </div>
            } )
        }
    </div>
} )

export default UserItems
