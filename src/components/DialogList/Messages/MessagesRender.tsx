import classes from "../DialogList.module.css";
import userPhoto from "../../../assets/images/no-image3.png";
import MessagesElements from "./Message/MessagesElements";
import DialogFormik from "./MessagesFormik/DialogFormik";
import React from "react";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import {NavLink} from "react-router-dom";
import {messages2Type, NulableType} from "../../../types/commonTypes";
import {getProfileType} from "../../api/apiTypes";

type MessagesRenderType = {
    messages2: NulableType<Array<messages2Type>>, // массив сообщений текущего диалога
    myId: number, // мой ID (авторизованного пользователя)
    profile: NulableType<getProfileType>, // профиль просматриваемого пользователя по умолчанию
    deleteMessage: (messageID:number) =>void,
    sendMessage: (NewMessage: string) =>void,
    scrollBottom:() =>void
}
const MessagesRender:React.FC<MessagesRenderType> = ({messages2, myId, deleteMessage, sendMessage, scrollBottom, profile}) => {

    const messagesProfileRender = <div className={classes.photoFixed}>
        {/*спозиционированный сверху иконку человека, с кем общаюсь*/}
        {profile &&  // если профиль пользователя уже загружен
        <NavLink to={`/profile/${profile.userId}`} className={classes.myLink} >
            {/*при клике переход на профиль собеседника, ссылка без подчеркивания*/}
            <Image // картинка аватар собеседника
                src={profile.photos.small?profile.photos.small:userPhoto}
                className={classes.userPhoto}
                title={"Перейти в профиль"}
                alt={"Перейти в профиль"}
            />
            <span>{profile.fullName}</span>
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
