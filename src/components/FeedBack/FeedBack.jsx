import React from "react";
import classes from "./FeedBack.module.css";
import FeedBackFormik from "./FeedBackFormik/FeedBackFormik";

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

    return (
        <div className={classes.feedBackGreed}> {/*растягивание полей ввода не на весь экран*/}
            <div>
                <FeedBackFormik sendFeedBack={sendFeedBack}/>
            </div>
            <div>
            </div>
        </div>
    );
};

export default FeedBack;
