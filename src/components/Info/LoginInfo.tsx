import LoginInfoShort from "./LoginInfoShort";
import React from "react";

type LoginInfoType = {}
const LoginInfo:React.FC<LoginInfoType> = () => {
    return (<div>
        <p>Страницы Profile и Dialogs доступны только после авторизации.</p>
        <p>Поля email и password обязательны, rememberMe нет.</p>
        <p>Проводится валидация введенных данных на актуальность почтового адреса.</p>
        <p>В случае неверного ввода пары логин-пароль выводится ответ ошибки от сервера.</p>
        <p>При неправильном вводе пары логин-пароль 5 раз, отображается каптча с полем на ввод.
            Для обновления каптчи можно нажать на ее картинку.</p>
        <LoginInfoShort/>
    </div>)
}

export default LoginInfo
