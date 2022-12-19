import {email, Required} from "../common/Validation/validationField";

let LoginInfo = () => {
    return (<div>
        <p>
            <p>Страница Login для авторизации.
                Поля email и password обязательны, rememberMe нет.</p>
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
        </p>

    </div>)
}

export default LoginInfo
