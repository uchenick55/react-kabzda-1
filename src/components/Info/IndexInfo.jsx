let IndexInfo = () => {
    return (<div>
        <p>За основу взят курс <a href="https://www.youtube.com/playlist?list=PLcvhF2Wqh7DNVy1OCUpG3i5lyxyBWhGZ8">React
            JS Путь самурая</a></p>
        <p>Дополнил:</p>
        <ul>
            <li>Режим день/ночь - переключатель в header (не было api, сделал на LocalStorage)</li>
            <li>Отображение/скрытие данного поля комментариев по сайту (переключатель "comments" в header)</li>
            <li>Поиск по пользователям на основе api</li>
            <li>Добавление пользователей в My FriendList и удаление</li>
            <li>Переписка с сохранением сообщений между разными аккаунтами. Подгрузка из базы при входящих сообщениях (не было api, сделал на LocalStorage). Удаление сообщений из переписки для всех. </li>
            <li>ДиалогЛист текущих диалогов. Подгрузка из базы при входящих сообщениях (не было api, сделал на LocalStorage). Удаление диалогов из своего диалогЛиста </li>
            <li>Поиск по открытому API HackerNews</li>
            <li>Игра крестики-нолики</li>
            <li>Адаптивный масштаб</li>
            <li>Скролинг данных</li>
        </ul>

        <p>Git репозиторий: <a
            href="https://github.com/uchenick55/react-kabzda-1.git">https://github.com/uchenick55/react-kabzda-1.git</a>
        </p>
        <p>Для начала работы выберите один из пунктов меню справа</p>
   {/*     <p>Контакты для связи uchenick55@yandex.ru / +7(900)571-79-99. Евгений</p>*/}
    </div>)
}
export default IndexInfo
