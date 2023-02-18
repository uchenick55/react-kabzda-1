import React from "react";
import classes from "./FeedBack.module.css";
import FeedBackFormik from "./FeedBackFormik/FeedBackFormik";
import commonClasses from "../common/CommonClasses/common.module.css";
import Container from "react-bootstrap/Container";
import FeedBackInfoShort from "../Info/FeedBackInfoShort";

const FeedBack = ({sendFeedBack, feedBackStatus, setFeedBackStatus}) => {
    let SendMessageBoard = (props) => {
        return <div className={classes.sendMessageBoard}>{/*стилизация отправки данных на сервер*/}
            {props.children}
        </div>
    }

    if (feedBackStatus) { // если статус feedback из BLL не пустой
        return (
            <div>
                <SendMessageBoard> {/*стилизация отправки данных на сервер*/}
                    <div>Спасибо!</div>
                    <div>{feedBackStatus}</div>
                    {/*отобразить статус*/}
                    <button className={classes.buttonSuccess} onClick={() => {
                        setFeedBackStatus("")
                    }}>Новое сообщение
                    </button>
                    {/*обнуление статуса и отображение формы*/}
                </SendMessageBoard>
            </div>
        );
    }

    return <div>
        <h2 className={commonClasses.pageHeader}>FeedBack</h2>
        <Container fluid>
            <FeedBackFormik sendFeedBack={sendFeedBack}/>
            <FeedBackInfoShort/>

        </Container>
    </div>

};

export default FeedBack;
