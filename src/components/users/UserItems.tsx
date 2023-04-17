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

type UserItemsType = {
    users: Array<usersType>, // Реселектор users- список пользователей в пачке от сервера
    unfollowAPI:(id:number)=>void,
    followAPI:(id:number)=>void,
    followingInProgress: Array<number>, // селектор followingInProgress - массив на кого мы подписались, кнопка неактивна
    isAuth: boolean, // селектор isAuth - флаг авторизации

}
const UserItems:React.FC<UserItemsType> = ({users, unfollowAPI, followAPI, followingInProgress, isAuth}) => {
    // отрисовка всех карточек с пользователями
    return <div>
        {
            users.map((u) => { // пробегаем по пользовтелям
                return (
                    <div key={u.id}
                         className="my-2 col-12 col-sm-5 col-lg-2 d-inline-block"> {/* "my-2 col-12 col-sm-5 col-lg-2 d-inline-block"размеры карточек в зависимости от размера экрана*/}
                        <Card className={classes.myCard}>  {/*оформление*/}

                            <Card.Body>
                                <Card.Title
                                    className={`${commonClasses.textMaxWidthCommon} ${commonClasses.textMaxWidth8rem}`}>{u.name}</Card.Title> {/*максимальная ширина заголовка 8 rem*/}
                                <Row>
                                    <Col className={classes.myCol}>
                                        <NavLink
                                            to={'/profile/' + u.id}> {/*при нажатии на картинку переход в профиль*/}
                                            <Image fluid={true}
                                                   className={classes.userPhoto}
                                                   src={u.photos.small !== null // или маленькая картинка профиля или заглушка
                                                       ? u.photos.small
                                                       : userPhoto}
                                                   alt={"Перейти в профиль"}
                                                   title={"Перейти в профиль"}
                                            />

                                        </NavLink>
                                    </Col>
                                    <Col className={classes.myCol}>
                                       <NavLink to={'/dialogs/' + u.id}>  {/*смена URL при клике на диалог*/}
                                            <Image fluid={true} src={DialogPic} alt={"Начать диалог"}
                                                   title={"Начать диалог"} className={classes.myImg}/>
                                        </NavLink>
                                    </Col>
                                    <Col className={classes.myCol}>
                                        <div>
                                            {u.followed
                                                ? <FollowUnfollowButtons2 u={u} followUnfollowAPICallback={unfollowAPI}
                                                                         followingInProgress={followingInProgress}
                                                                         isAuth={isAuth}/>
                                                : <FollowUnfollowButtons2 u={u} followUnfollowAPICallback={followAPI}
                                                                         followingInProgress={followingInProgress}
                                                                         isAuth={isAuth}/>
                                            }
                                        </div>
                                    </Col>
                                </Row>

                                <Row
                                    className={`${commonClasses.textMaxWidthCommon} ${commonClasses.textMaxWidth8rem}`}>
                                    {u.status && <div>{u.status}</div>}
                                </Row>
                            </Card.Body>
                        </Card>
                    </div>
                )
            })
        }
    </div>
}

export default UserItems
