import classes from "../DialogList.module.css";
import userPhoto from "../../../assets/images/no-image3.png";
import MessagesElements from "./Message/MessagesElements";
import DialogFormik from "./MessagesFormik/DialogFormik";
import React from "react";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import {NavLink} from "react-router-dom";

const MessagesRender = ({messages2, myId, deleteMessage, sendMessage, scrollBottom, profilePage}) => {

    const messagesProfileRender = <div className={classes.photoFixed}>
        {/*спозиционированный сверху иконку человека, с кем общаюсь*/}
        {profilePage.profile &&  // если профиль пользователя уже загружен
        <NavLink to={`/profile/${profilePage.profile.userId}`}> {/*при клике переход на профиль собеседника*/}
            <Image // картинка аватар собеседника
                src={profilePage.profile.photos.small?profilePage.profile.photos.small:userPhoto}
                className={classes.userPhoto}
                title={"Перейти в профиль"}
                alt={"Перейти в профиль"}
            />
            <span className={classes.linkNoDecoration}>{profilePage.profile.fullName}</span>
        </NavLink>
        }
    </div>

    return <div className={classes.BgStyle}>
        <Row>
            <MessagesElements // отрисовка сообщений
                messages2={messages2} // сообщения
                myId={myId} // мой ID
                deleteMessage={deleteMessage} // функйцию удаления сообщений
            />
        </Row>

        {messagesProfileRender}
        {/*спозиционированная полоска сверку сообщений с иконкой собеседникой и ссылкой на его профиль*/}

        <div className={classes.inputFixed}> {/*спозиционированный снизу инпут и кнопка ввода сообщений*/}
            <div>
                <DialogFormik
                    sendMessage={sendMessage}
                    scrollBottom={scrollBottom}
                /> {/*вызов формы сообщений*/}
            </div>
        </div>

    </div>
}
export default MessagesRender
