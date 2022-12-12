let LoginInfo = () => {
    return (<div>

        <p>
            Страница Login для авторизации.
            Проводится валидация введенных данных на актуальность почтового адреса, поля email и password обязательны, rememberMe нет.
            Так же в случае неверного ввода пары логин-пароль выводится ответ ошибки от сервера.
            Валидацию введения данных.
            Данные для тестового входа:
            <p>Аккаунт 1 (начните с него):</p>
            Email: evgeniysazonov1983@gmail.com
            Password: 12qwaszx
            <p>Аккаунт 2 :</p>
            Email: evgeniysazonov1983@googlemail.com
            Password: 12qwaszx
            <p>Аккаунт 2:</p>
            Email: free@samuraijs.com
            Password: free
        </p>

    </div>)
}

export default LoginInfo
