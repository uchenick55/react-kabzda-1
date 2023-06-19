import LoginInfoShort from "./LoginInfoShort";
import React from "react";
import dialogs from "../../assets/images/messages.jpg"
import Image from "react-bootstrap/Image";

type DialogsInfoType ={}
const DialogsInfo:React.FC<DialogsInfoType> = () => {
    return (<div>
        <p>На этой странице ведется диалог с выбранным собеседником;</p>
        <p>Написаные сообщения можно удалять;</p>
        <p>Сверху есть ссылка на профиль собеседника;</p>
        <p>Запись реализована на localStorage, так как в API базового курса хранение диалогов не поддерживается;</p>
        <p>Диалоги можно проверить, например, войдя в режим диалога в две соседние вкладки одного браузера с двух разных
            аккаунтов: </p><LoginInfoShort/>
        <p>После нужно найти друг друга через поиск (или проверить сразу в избранном) и насладиться общением между двух
            окон :) </p>
        <Image fluid={true} src={dialogs} alt="пример диалогов" title="пример диалогов"/>

    </div>)
}

export default DialogsInfo
