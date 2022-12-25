import React from "react";
import classes from "./FeedBack.module.css";
import FeedBackForm from "./FeedBackForm";

const FeedBack = ({sendFeedBack, feedBackStatus, setFeedBackStatus}) => {

    const handleSubmit = (e) => {
        e.preventDefault(); // предотвратить сабмит формы по умолчанию (отправка в браузере)
        const injectedData = { // моя доп дата, если понадобится в будущем
        };

        const inputs = e.target.elements; // забрать данные с синтетического объекта 'e'
        const data = {}; // задать пустой объект data
        for (let i = 0; i < inputs.length; i++) { // добавить объект data все данные с форм после сабмита
            if (inputs[i].name) {
                data[inputs[i].name] = inputs[i].value;
            }
        }
        Object.assign(data, injectedData); // соединить данные с формы с моими доп данными, если есть

        sendFeedBack(data)
    };

    if (feedBackStatus) { // если статус feedback из BLL не пустой
        return (
            <>
                <div>Спасибо!</div>
                <div>{feedBackStatus}</div>  {/*отобразить статус*/}
                <button onClick={()=>{setFeedBackStatus("")}}>Новое сообщение</button> {/*обнуление статуса и отображение формы*/}
            </>
        );
    }

    return (
        <div className={classes.feedBackGreed}> {/*растягивание полей ввода не на весь экран*/}
            <div><FeedBackForm
                sendFeedBack={sendFeedBack}
            /></div>
        </div>
    );
};

export default FeedBack;
