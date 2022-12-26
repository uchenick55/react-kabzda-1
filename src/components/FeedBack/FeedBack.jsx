import React from "react";
import classes from "./FeedBack.module.css";
import FeedBackForm from "./FeedBackForm";

const FeedBack = ({sendFeedBack, feedBackStatus, setFeedBackStatus}) => {

    if (feedBackStatus) { // если статус feedback из BLL не пустой
        return (
            <>
                <div>Спасибо!</div>
                <div>{feedBackStatus}</div>  {/*отобразить статус*/}
                <button onClick={()=>{setFeedBackStatus("")}}>Новое сообщение</button>
                {/*обнуление статуса и отображение формы*/}
            </>
        );
    }

    return (
        <div className={classes.feedBackGreed}> {/*растягивание полей ввода не на весь экран*/}
            <div><FeedBackForm
                sendFeedBack={sendFeedBack} // redux форма ввода данных
            /></div>
        </div>
    );
};

export default FeedBack;
