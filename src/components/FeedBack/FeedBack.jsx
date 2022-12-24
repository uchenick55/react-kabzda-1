import React, {useState} from "react";
import classes from "./FeedBack.module.css";

const FORM_ENDPOINT = "https://public.herotofu.com/v1/e595a3c0-83b2-11ed-b38f-a1ed22f366b1"; // TODO - fill on the later step

const FeedBack = () => {
    const [status, setStatus] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        const injectedData = {
        };

        const inputs = e.target.elements;
        const data = {};
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].name) {
                data[inputs[i].name] = inputs[i].value;
            }
        }
        Object.assign(data, injectedData);
        fetch(FORM_ENDPOINT, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                // It's likely a spam/bot request, so bypass it to validate via captcha
                if (response.status === 422) {
                    Object.keys(injectedData).forEach((key) => {
                        const el = document.createElement("input");
                        el.type = "hidden";
                        el.name = key;
                        el.value = injectedData[key];
                        e.target.appendChild(el);
                    });
                    e.target.submit();
                    throw new Error("Please finish the captcha challenge");
                }
                if (response.status !== 200) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(() => setStatus("We'll be in touch soon."))
            .catch((err) => setStatus(err.toString()));// вывод ошибки
    };

    if (status) {
        return (
            <>
                <div>Thank you!</div>
                <div>{status}</div>
            </>
        );
    }

    return (
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

    );
};

export default FeedBack;
