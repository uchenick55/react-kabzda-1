import React from "react";
import classes from "./FeedBack.module.css";

const FORM_ENDPOINT = "https://public.herotofu.com/v1/e595a3c0-83b2-11ed-b38f-a1ed22f366b1"; // конечная точка - перенести в api.js

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
            <div>
                <h3>Обратная связь</h3>
                <form onSubmit={handleSubmit}> {/*обработчик сабмита формы*/}
                    <div>
                        <input // поле ввода имени (не обязательно)
                            type="text"
                            placeholder="Ваше имя (не обязательно)"
                            name="name"
                            className={classes.inputClass}
                            autoFocus={true}
                        />
                    </div>
                    <div>
                        <input // поле ввода email (не обязательно)
                            type="email"
                            placeholder="Ваш Email (не обязательно)"
                            name="email"
                            className={classes.inputClass}
                        />
                    </div>
                    <div>
                    <textarea // поле ввода сообщения
                        placeholder="Введите сообщение"
                        name="message"
                        className={classes.textArea}
                        required
                    />
                    </div>
                    <div>
                        <button
                            type="submit"
                        >
                            Отправить сообщение
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FeedBack;
