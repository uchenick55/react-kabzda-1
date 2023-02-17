import classes from "../DialogList.module.css";
import ScrollContainer from "../../common/Scroll/ScrollContainer";
import MessagesElements from "./Message/MessagesElements";
import DialogFormik from "./MessagesFormik/DialogFormik";
import React from "react";
import Row from "react-bootstrap/Row";

const MessagesRender = ({messages2, myId, deleteMessage, sendMessage, scrollBottom}) => {
    return <div className={classes.BgStyle}>
        <Row>
            <MessagesElements // вынес в отдельную компоненту отрисовку сообщений
                messages2={messages2} // сообщения
                myId={myId} // мой ID
                deleteMessage={deleteMessage} // функйцию удаления сообщений
            />
        </Row>
        <div className={classes.inputFixed}> {/*спозиционированный внизу инпут и кнопка ввода сообщений*/}
            <div className={classes.bottonDiv}>
                <DialogFormik
                    sendMessage={sendMessage}
                    scrollBottom={scrollBottom}
                />{/*вызов формы сообщений*/}
            </div>
        </div>

    </div>
}
export default MessagesRender
