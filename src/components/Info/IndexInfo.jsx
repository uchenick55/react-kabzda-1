let IndexInfo = () => {
    return (<div>
        <p>За основу взят курс <a href="https://www.youtube.com/playlist?list=PLcvhF2Wqh7DNVy1OCUpG3i5lyxyBWhGZ8">React
            JS Путь самурая</a></p>
        <p>Дополнил:</p>
        <ul>
            <li>Режим день/ночь (не было api, сделал на LocalStorage)</li>
            <li>Поиск по пользователям на основе api</li>
            <li>Добавление пользователей в My FriendList и удаление</li>
            <li>Переписка с сохранением между разными аккаунтами (не было api, сделал на LocalStorage), удаление
                диалогов, автоматическое обновление сообщений при появленни в базе
            </li>
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
