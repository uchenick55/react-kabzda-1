let UsersInfo = () => {
    return (<div>
        <p>Страница поиска пользователей</p>
        <p>При нажатии в списке пользователей Add мы добавляем его в список друзей.
            Пользователь автоматически добавляется в "My Friendlist" навбара справа  </p>
        <p>Реализована пагинация и scroll колонки пользователей</p>
        <p>Пользователя можно искать. Попробуйте вбить samurai, перейти на вторую страницы пагинации и добавить пользователя с ID 1079 (тестовый аккаунт для проверки общения) </p>
        <p>Свой ID вы добавить в друзья не можете - вбейте в поиск evgeniysazonov1983 и попробуйте добавить его. Кнопка Add будет неактивной </p>

    </div>)
}

export default UsersInfo
