import React, {useState} from "react";
import classes from './FeedBack.module.css';

const FORM_ENDPOINT = "https://public.herotofu.com/v1/e6c372d0-8359-11ed-b38f-a1ed22f366b1"; // TODO - fill on the later step

const FeedBack = () => {
    const [submitted, setSubmitted] = useState(false);
    const handleSubmit = () => {
        setTimeout(() => {
            setSubmitted(true);
        }, 100);
    };

    if (submitted) {
        return (
            <>
                <h3>Спасибо!</h3>
                <div>Мы скоро прочтем ваше сообщение.</div>
            </>
        );
    }

    return ( <div className={classes.feedBackGreed}>
            <div>
                <h3>Обратная связь</h3>
                <form
                    action={FORM_ENDPOINT}
                    onSubmit={handleSubmit}
                    method="POST"
                    target="_blank"
                >
                    <div>
                        <input
                            type="text"
                            placeholder="Ваше имя"
                            name="name"
                            className={classes.inputClass}
                            required
                            autoFocus={true}
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            placeholder="Ваш Email (не обязательно)"
                            name="email"
                            className={classes.inputClass}
                            // required
                        />
                    </div>
                    <div>
                    <textarea
                        placeholder="Ваше сообщение"
                        name="message"
                        className={classes.textArea}
                        required
                    />
                    </div>
                    <div>
                        <button
                            type="submit"
                        >
                            Send a message
                        </button>
                    </div>
                </form>
            </div>

    </div>

    );
};

export default FeedBack;
