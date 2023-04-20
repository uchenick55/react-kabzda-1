import classes from "./UserListMessages.module.css";
import userPhoto from "../../../assets/images/no-image3.png";
import MessagesElements from "./Message/MessagesElements";
import MessagesFormik from "./MessagesFormik/MessagesFormik";
import React from "react";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import {NavLink} from "react-router-dom";
import {messages2Type, NulableType} from "../../../types/commonTypes";
import {getProfileType} from "../../api/apiTypes";
import UsersContainer from "../../users/UsersContainer";

type MessagesRenderType = {
    messages2: NulableType<Array<messages2Type>>, // массив сообщений текущего диалога
    myId: number, // мой ID (авторизованного пользователя)
    profile: NulableType<getProfileType>, // профиль просматриваемого пользователя по умолчанию
    deleteMessage: (messageID: number) => void,
    sendMessage: (NewMessage: string) => void,
    scrollBottom: () => void
}
const MessagesRender: React.FC<MessagesRenderType> = ({messages2, myId, deleteMessage, sendMessage, scrollBottom, profile}) => {

    const messagesProfileRender = <div>
        {/*спозиционированный сверху иконку человека, с кем общаюсь*/}
        {profile &&  // если профиль пользователя уже загружен
        <NavLink to={`/profile/${profile.userId}`} className={classes.myLink}>
            {/*при клике переход на профиль собеседника, ссылка без подчеркивания*/}
            <Image // картинка аватар собеседника
                src={profile.photos.small ? profile.photos.small : userPhoto}
                className={classes.userPhoto}
                title={"Перейти в профиль"}
                alt={"Перейти в профиль"}
            />
            <span>{profile.fullName}</span>
        </NavLink>
        }
    </div>

    return <div className={classes.usersListMessagesFixed}>
        <div className={classes.usersListCommonFixed}><UsersContainer/></div>
        <div className={classes.MessagesCommonFixed}>
            <div className={classes.messagesHeaderFixed}>{messagesProfileRender}</div>
            {/*спозиционированная полоска сверку сообщений с иконкой собеседникой и ссылкой на его профиль*/}

            <div className={classes.messagesMiddleFixed}>
                <MessagesElements // отрисовка сообщений
                    messages2={messages2} // сообщения
                    myId={myId} // мой ID
                    deleteMessage={deleteMessage} // функйцию удаления сообщений
                />

                <div
                    className={classes.messagesFooterFixed}>{/*спозиционированный снизу инпут и кнопка ввода сообщений*/}
                    <MessagesFormik
                        sendMessage={sendMessage}
                        scrollBottom={scrollBottom}
                    />
                </div>
            </div>


        </div>


    </div>
}
export default MessagesRender
