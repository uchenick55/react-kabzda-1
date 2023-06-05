import Image from "react-bootstrap/Image";
import FollowPic from "../../assets/images/swg/star-.svg";
import UnfollowPic from "../../assets/images/swg/star+.svg";
import React, {memo} from "react";
import {usersType} from "../api/apiTypes";

type FollowUnfollowButtonsType = {
    u: usersType,
    followUnfollowAPICallback:(id:number)=>void,
    followingInProgress: Array<number>, // селектор followingInProgress - массив на кого мы подписались, кнопка неактивна
    isAuth: boolean, // селектор isAuth - флаг авторизации
}
const Trash_FollowUnfollowButtons2:React.FC<FollowUnfollowButtonsType> = memo (({u, followUnfollowAPICallback, followingInProgress, isAuth}) => { // унификация нажатия кнопки Follow/Unfollow
    // отрисовка кнопки follow/unfollow (друг/недруг) в виде звездочки на кнопке
    const starCanBePressed = followingInProgress.some(id => id === u.id)
    const ImageLocal = memo(Image)
    return  <span>

                    <ImageLocal
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
})

export default Trash_FollowUnfollowButtons2
