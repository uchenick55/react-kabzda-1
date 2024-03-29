import React from "react";

type IndexInfoType = {

}
const IndexInfo:React.FC<IndexInfoType> = () => {
    return (<div>
            <p>За основу взят курс <a href="https://www.youtube.com/playlist?list=PLcvhF2Wqh7DNVy1OCUpG3i5lyxyBWhGZ8">React
                JS</a></p>
            <p>Дополнил:</p>
            <ul>
                <li>Адаптивная верстка под мобильные устройства. React-bootstrap оформление;</li>
                <li>Режим день/ночь (не было api, сделал на LocalStorage);</li>
                <li>Кнопка i комментариев по сайту;</li>
                <li>Кнопка назад по истории;</li>
                <li>Поиск по всем пользователям, или только по добавленным в избранное;</li>
                <li>Переписка с сохранением сообщений между разными аккаунтами пользователей. Подгрузка из хранилища при
                    входящих сообщениях (не было api, сделал на LocalStorage в пределах одного браузера в соседних окнах).
                    Удаление сообщений из переписки для всех;
                </li>
                <li>Переписал формы с redux-form на formik, часть на React.createElement ( без JSX );</li>
                <li>FeedBack - Форма обратной связи с отправкой на почту;</li>
                <li>Обработка каптчи на странице Login;</li>
                <li>Выпадающее меню, модальное окно и пр.;</li>
                <li>Tasks - примеры решения понравившихся задач:</li>
                <ol>
                    <li>Список постов (api saga);</li>
                    <li>GraphQl поиск по GitHub репозиториям;</li>
                    <li>Сапер;</li>
                    <li>Калькулятор обмена криптовалют;</li>
                    <li>Поиск сортировка, фильтрация и контекстное меню;</li>
                    <li>Поиск возможных комбинаций чисел из массива, для получения опреденной суммы;</li>
                    <li>Одностраничник на HTML+CSS + адаптивный масштаб, popup, аккордеон, слайдер, и прочее оформление
                        из bootstrap;
                    </li>
                    <li>Поиск по открытому API HackerNews;</li>
                    <li>Игра крестики-нолики.</li>
                </ol>
            </ul>
            <p>Git репозиторий: <a
                href="https://github.com/uchenick55/react-kabzda-1.git"><br/>https://github.com/uchenick55/react-kabzda-1.git</a>
            </p>
            <p>Для начала работы выберите один из пунктов меню.</p>
            {/*     <p>Контакты для связи uchenick55@yandex.ru / +7(900)571-79-99. Евгений</p>*/}
        </div>
    )
}
export default IndexInfo

