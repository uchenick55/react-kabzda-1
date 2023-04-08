import React from 'react';
import classes from './../MyFriends.module.css';
import {NavLink} from "react-router-dom";
import DialogPic from "../../../../assets/images/swg/dialogue2.svg"
import UnfollowPic from "../../../../assets/images/swg/delete-user1.svg"
import {PointerCursor} from "../../../-Dark_light_theme/-globalStyles";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";


const MyFriendItem = ({id, avaSrc, name, unfollowFriendsAPI}) => {

    const commonImgRender = (src, alt, title, className1, onClickMethod) => { // общий метод отрисовки картинок
        return <Image fluid={true} src={src} alt={alt} title={title} // url картинки, тайтл и alt
                      className={className1}
                      onClick={() => {
                          onClickMethod(id)
                      }}
        />
    }
    const profileImgRender1 = commonImgRender(
        avaSrc,// src для отрисовки картинки из профиля друга
        "myFriendImg", // альтернативный текст картинки
        "Профиль", // заголовок
        classes.myFriendImg, // стиль картинок при наведении
    )

    const dialogImgRender1 = commonImgRender(
        DialogPic,// src для отрисовки картинки начала диалога
        "dialog", // альтернативный текст картинки
        "Диалог", // заголовок
        classes.Img, // стиль картинок при наведении
    )

    const removeFriendRender1 = commonImgRender(
        UnfollowPic,// src для отрисовки картинки удаления друга из списка
        "remove_friend", // альтернативный текст картинки
        "Удалить из friendList", // заголовок
        classes.Img, // стиль картинок при наведении
        unfollowFriendsAPI // метод удаления друга из диалогов
    )

    return <div key={name} className={'m-2'}>

        <Card className={classes.cards}>
            <NavLink to={'/profile/' + id} className={"p-4"}>
                {profileImgRender1} {/*отрисовка фото друзей с анимацией*/}
            </NavLink>
            <Card.Body className={'p-3'}>
                <Card.Title >{name}</Card.Title> {/*отрисовка имени друга*/}
                <Card.Text>
                    <Row>
                        <Col>
                            <NavLink to={'/dialogs/' + id}>
                                {dialogImgRender1 /*отрисовка картитнки начала диалога с анимацией*/}
                            </NavLink>
                        </Col>
                        <Col>
                            <div>
                                {removeFriendRender1} {/*отрисовка картинок удаления друзей с анимацией*/}
                            </div>
                        </Col>
                    </Row>

                </Card.Text>
            </Card.Body>
        </Card>
    </div>
}

export default MyFriendItem;

