import React from "react";
import classes from "./Users.module.css";
import userPhoto from "../../assets/images/no-image.jpg";
import {NavLink} from "react-router-dom";

let Users = ({totalUsersCount, pageSize, currentPage, onPageChanged, users,
                 followingInProgress, unfollowAPI, isAuth, followAPI   }) => {
    let PagesCount = Math.ceil(totalUsersCount / pageSize);
    let pages = [];
    for (let i = 1; i <= PagesCount; i++) {
        pages.push(i)
    }

    let curP = currentPage;
    let curPF = ((curP - 5) < 0) ? 0 : curP - 5;
    let curPL = ((curP + 5) > PagesCount) ? PagesCount : curP + 5;
    let slicedPages = pages.slice(curPF, curPL);

    let Slicer = () => {
        return (
            <div>
                {slicedPages.map((p) => {
                    return (
                        p === currentPage
                            ? <span className={classes.selected} onClick={() => {
                                <div>
                                </div>
                            }}>{p}</span>
                            : <span onClick={() => {
                                onPageChanged(p)
                            }}>{p}</span>
                    )
                })}
            </div>
        )
    }

    return <div className={classes.users}>
        <div>
            {<Slicer/>}{/*Вывод слайсера вверху страницы (пагинация)*/}
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
                                        unfollowAPI(u.id) //send to server request unfollow from UsersContainer
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
            {<Slicer/>} {/*Вывод слайсера внизу страницы (пагинация)*/}
        </div>
    </div>

}

export default Users

