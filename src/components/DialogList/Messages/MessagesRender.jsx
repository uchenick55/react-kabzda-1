import classes from "../DialogList.module.css";
import ScrollContainer from "../../common/Scroll/ScrollContainer";
import MessagesElements from "./Message/MessagesElements";
import DialogFormik from "./MessagesFormik/DialogFormik";
import React from "react";

const MessagesRender = ({messages2, myId, deleteMessage, sendMessage}) => {
    return <div>
        <h3 className={classes.messagesHeader}>Messages</h3>

        <ScrollContainer // обернуть сообщения скролом
            child={<MessagesElements // вынес в отдельную компоненту отрисовку сообщений для ScrollContainer
                messages2={messages2} // сообщения
                myId={myId} // мой ID
                deleteMessage={deleteMessage} // функйцию удаления сообщений
            />}
            height={window.screen.availHeight - 300} // высота поля скрола
            firstInsideContainer={"MessagesUp"}
            secondInsideContainer={"MessagesDown"}
            containerElement={"MessagesContainer"}
        /> {/*отрисовка сообщений в скрол контейнере*/}
        <div>
            <DialogFormik sendMessage={sendMessage}/>{/*вызов формы сообщений*/}
        </div>
    </div>
}
export default MessagesRender
