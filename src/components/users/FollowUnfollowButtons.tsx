import Image from "react-bootstrap/Image";
import classes from "./Users.module.css";
import FollowPic from "../../assets/images/swg/star-.svg";
import UnfollowPic from "../../assets/images/swg/star+.svg";
import React from "react";
import {usersType} from "../api/apiTypes";

type FollowUnfollowButtons = {
    u: usersType,
    followUnfollowAPICallback:(id:number)=>void,
    followingInProgress: Array<number>, // селектор followingInProgress - массив на кого мы подписались, кнопка неактивна
    isAuth: boolean, // селектор isAuth - флаг авторизации
}
const FollowUnfollowButtons:React.FC<FollowUnfollowButtons> = ({u, followUnfollowAPICallback, followingInProgress, isAuth}) => { // унификация нажатия кнопки Follow/Unfollow
    // отрисовка кнопки follow/unfollow (друг/недруг) в виде звездочки на кнопке
    const starCanBePressed = followingInProgress.some(id => id === u.id)
    return  <span>
                    <Image
                        className={classes.myImg}
                        fluid={true} // картинка растягивается
                        src={!u.followed ? FollowPic : UnfollowPic} // картинка в зависимости избранное или нет
                        alt={"Добавить в избранное"} // alt
                        title={"Добавить в избранное"} // title
                        onClick={() => {
                            if (!starCanBePressed) { // если кнопка еще не была нажата (нет в списке нажатых)
                                isAuth // проверка авторизации. Если нет, то алерт. Если да, то API запрос на follow/unfollow
                                    ? followUnfollowAPICallback(u.id) //send to server request follow/unfollow from UsersContainer
                                    : alert("You are not authorized, please Login") // алерт авторизуйтесь!
                            }
                        }}
                    />
                </span>
}

export default FollowUnfollowButtons
