import React from "react";

const LoginInfoShort:React.FC = () => {
    return <div>
        Страницы Profile, Dialogs и Chat доступны только после авторизации.
        <p>Данные для тестового входа:</p>
        <p>Аккаунт 1: Email: evgeniysazonov1983@gmail.com <br/>
            Password: 12qwaszx</p>
        <p>Аккаунт 2 : Email: evgeniysazonov1983@googlemail.com <br/>
            Password: 12qwaszx</p>
        <p>Аккаунт 3: Email: free@samuraijs.com <br/>
            Password: free</p>
        <p>В случае проблем с авторизацией, попробуйте сначала войти по указанным парам логин/пароль на <br/>
            <a href="https://social-network.samuraijs.com/">https://social-network.samuraijs.com/</a>
        </p>
    </div>
}

export default LoginInfoShort
