import React, {useState} from "react";

const FORM_ENDPOINT = "https://public.herotofu.com/v1/e6c372d0-8359-11ed-b38f-a1ed22f366b1"; // TODO - fill on the later step

const ContactForm = () => {
    const [submitted, setSubmitted] = useState(false);
    const handleSubmit = () => {
        setTimeout(() => {
            setSubmitted(true);
        }, 100);
    };

    if (submitted) {
        return (
            <>
                <div className="text-2xl">Спасибо!</div>
                <div className="text-md">Мы скоро прочтем ваше сообщение.</div>
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
            <div className="mb-3 pt-0">
                <input
                    type="text"
                    placeholder="Ваше имя"
                    name="name"
                    className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                    required
                />
            </div>
            <div className="mb-3 pt-0">
                <input
                    type="email"
                    placeholder="Ваш Email (не обязательно)"
                    name="email"
                    className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                   // required
                />
            </div>
            <div className="mb-3 pt-0">
    <textarea
        placeholder="Ваше сообщение"
        name="message"
        className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
        required
    />
            </div>
            <div className="mb-3 pt-0">
                <button
                    className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                >
                    Send a message
                </button>
            </div>
        </form>
    );
};

export default ContactForm;
