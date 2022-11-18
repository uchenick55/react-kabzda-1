import React from "react";
import classes from "./Users.module.css";
import userPhoto from "../../assets/images/no-image.jpg";
import {NavLink} from "react-router-dom";
import Pagination from "../common/Pagination/Pagination";

let Users = ({
                 totalUsersCount, pageSize, currentPage, onPageChanged, users,
                 followingInProgress, unfollowAPI, isAuth, followAPI,
                 SetTermFunction, onChangeTerm, onChangeTermFunction
             }) => {

    let FollowUnfollowButtons = ({u, followUnfollowAPICallback, buttonText}) => { // унификация нажатия кнопки Follow/Unfollow
        return (<div>
                <button
                    disabled={followingInProgress.some(id => id === u.id)} // отключение возможности повторного нажатия пока не пришел ответ от сервера
                    onClick={() => {
                        isAuth // проверка авторизации. Если нет, то алерт. Если да, то API запрос на follow/unfollow
                            ? followUnfollowAPICallback(u.id) //send to server request follow/unfollow from UsersContainer
                            : alert("You are not authorized, please Login") // алерт
                    }}> {buttonText}
                </button>
                {/* buttonText - текст кнопки Follow/Unfollow*/}
            </div>
        )
    }
    const handleClick = (e) => {
        e.preventDefault();
        SetTermFunction()
    }

    return <div className={classes.users}>
        <div>
            {<Pagination
                totalUsersCount={totalUsersCount} pageSize={pageSize}
                currentPage={currentPage}
                onPageChanged={onPageChanged}/>}{/*Вывод слайсера вверху страницы (пагинация)*/}
        </div>
        <form>
            <input
                value={onChangeTerm}
                onChange={(event)=>{onChangeTermFunction(event)}}
                onBlur={SetTermFunction}
                placeholder={"find users"}
                autoFocus={true}
            />
            <button onClick={handleClick}>Find</button>
        </form>


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
                                ? <FollowUnfollowButtons u={u} followUnfollowAPICallback={unfollowAPI}
                                                         buttonText={"Unfollow"}/>
                                : <FollowUnfollowButtons u={u} followUnfollowAPICallback={followAPI}
                                                         buttonText={"Follow"}/>
                            }
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
                currentPage={currentPage}
                onPageChanged={onPageChanged}/>}{/*Вывод слайсера вверху страницы (пагинация)*/}
        </div>
    </div>

}

export default Users

