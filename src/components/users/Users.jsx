import React from "react";
import classes from "./Users.module.css";
import userPhoto from "../../assets/images/no-image.jpg";
import {NavLink} from "react-router-dom";
import Pagination from "../common/Pagination/Pagination";

let Users = ({totalUsersCount, pageSize, currentPage, onPageChanged, users,
                 followingInProgress, unfollowAPI, isAuth, followAPI   }) => {

    return <div className={classes.users}>
        <div>
            {<Pagination
                totalUsersCount={totalUsersCount} pageSize={pageSize}
                currentPage={currentPage} onPageChanged={onPageChanged} />}{/*Вывод слайсера вверху страницы (пагинация)*/}
        </div>
        {
            users.map((u) => {
                <div key={u.id}/>
                return (
                    <div>
                        <div>
                            <NavLink to={'/profile/' + u.id}>
                                <img className={classes.userPhoto}
                                     src={u.photos.small != null
                                         ? u.photos.small
                                         : userPhoto}/>
                            </NavLink>
                        </div>
                        <div>
                            {u.followed
                                ? <button
                                    disabled={followingInProgress.some(id=>id===u.id)} // отключение возможности повторного нажатия пока не пришел ответ от сервера
                                    onClick={() => {
                                        isAuth // проверка авторизации. Если нет, то алерт. Если да, то API запрос на unfollow
                                            ?unfollowAPI(u.id) //send to server request unfollow from UsersContainer
                                            : alert("You are not authorized, please Login")
                                    }}> Unfollow</button>

                                : <button
                                    disabled={followingInProgress.some(id=>id===u.id)} // отключение возможности повторного нажатия пока не пришел ответ от сервера
                                    onClick={() => {
                                        isAuth // проверка авторизации. Если нет, то алерт. Если да, то API запрос на follow
                                            ?followAPI(u.id) //send to server request follow from UsersContainer
                                            : alert("You are not authorized, please Login")
                                }}> Follow</button>}
                        </div>
                        <div>{u.name}</div>
                        <div>{u.id}</div>
                        <div>u.location.country</div>
                        <div>u.location.city</div>
                        <div>{u.status}</div>
                    </div>
                )
            })
        }
        <div>
            {<Pagination
                totalUsersCount={totalUsersCount} pageSize={pageSize}
                currentPage={currentPage} onPageChanged={onPageChanged} />}{/*Вывод слайсера вверху страницы (пагинация)*/}
        </div>
    </div>

}

export default Users

