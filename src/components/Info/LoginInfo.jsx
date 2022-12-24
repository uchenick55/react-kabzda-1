import {email, Required} from "../common/Validation/validationField";

let LoginInfo = () => {
    return (<div>
        <p>
            <p>Страницы Profile и Dialogs доступны только после авторизации.</p>
            <p>Поля email и password обязательны, rememberMe нет.</p>
            <p>Проводится валидация введенных данных на актуальность почтового адреса.</p>
            <p>В случае неверного ввода пары логин-пароль выводится ответ ошибки от сервера.</p>
           <p>При неправильном вводе пары логин-пароль 5 раз, отображается каптча с полем на ввод.
               Для обновления каптчи можно нажать на ее картинку.</p>
            Данные для тестового входа:
            <p>Аккаунт 1: Email: evgeniysazonov1983@gmail.com <br/>
                Password: 12qwaszx</p>
            <p>Аккаунт 2 : Email: evgeniysazonov1983@googlemail.com <br/>
                Password: 12qwaszx</p>
            <p>Аккаунт 3: Email: free@samuraijs.com <br/>
                Password: free</p>
            <p>В случае проблем с авторизацией, попробуйте сначала войти по указанным парам логин/пароль на <br/>
                <a href="https://social-network.samuraijs.com/">https://social-network.samuraijs.com/</a>
            </p>
        </p>

    </div>)
}

export default LoginInfo
