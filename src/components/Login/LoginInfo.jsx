let LoginInfo = () => {
    return (<div>

        <p>
            Страница Login.jsx
            Использует reduxForm для отрисовки и обработки данных формы.
            Валидацию введения данных.
            Данные для тестового входа:
            <p>Аккаунт 1:</p>
            Email: evgeniysazonov1983@gmail.com
            Password: 12Qweasdzxc!
            <p>Аккаунт 2:</p>
            Email: free@samuraijs.com
            Password: free
        </p>
        <p> Header – отображение баннера, мой ID (текущего авторизованного пользователя) и аватарка
            (по нажатию можно перейти в мой профиль)</p>
        <p>Справа навигационное менюю. Без авторизации доступны все страницы кроме Profile и Dialogs</p>
        <p>После успешной авторизации - редирект на страницу авторизованного пользователя (Profile)</p>
    </div>)
}

export default LoginInfo
