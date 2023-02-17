import classes from "../DialogList.module.css";
import ScrollContainer from "../../common/Scroll/ScrollContainer";
import MessagesElements from "./Message/MessagesElements";
import DialogFormik from "./MessagesFormik/DialogFormik";
import React from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const MessagesRender = ({messages2, myId, deleteMessage, sendMessage}) => {
    return <div className={classes.BgStyle}>
        <Row>
            <MessagesElements // вынес в отдельную компоненту отрисовку сообщений
                messages2={messages2} // сообщения
                myId={myId} // мой ID
                deleteMessage={deleteMessage} // функйцию удаления сообщений
            />
        </Row>
        <Row className={classes.inputButton}>
            <DialogFormik sendMessage={sendMessage}/>{/*вызов формы сообщений*/}
        </Row>

    </div>
}
export default MessagesRender
