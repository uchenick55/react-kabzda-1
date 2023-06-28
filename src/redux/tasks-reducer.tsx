import Saper from "../assets/images/saper.jpg";
import CryptoCalculator from "../assets/images/CryptoCalculator.jpg";
import FilterSort from "../assets/images/Filter&Sort page.jpg";
import Ghlist from "../assets/images/Ghlist.jpg";
import combinationChisel from "../assets/images/combinationChisel.jpg";
import bootstrapImg from "../assets/images/bootstrap.jpg";
import krestikiNoliki from "../assets/images/krestiki-noliki.jpg";
import postList from "../assets/images/postList.jpg";
import news from "../assets/images/News.jpg";
import React from "react";
import {ComThunkTp, HitsItemType} from "../components/common/types/commonTypes";
import {InferActionsTypes} from "./store-redux";
import {apiTasks} from "../components/api/api";
import {appActions} from "./app-reducer";

const SET_NEWS_DATA = "myApp/app-reducer/SET_NEWS_DATA"; //константа задания данных News

export const tasksActions = {
    setNewsDataAC: (newsData: NewsDataType) => { // экшн креатор задания данных News
        return {type: SET_NEWS_DATA, newsData} as const
    }
}

type NewsDataType = typeof initialState.newsData

type InitialStateType = typeof initialState

type TasksActionTypes =
    InferActionsTypes<typeof tasksActions> |
    InferActionsTypes<typeof appActions>

const initialState = { //стейт по умолчанию темы
    newsData: {
        query: "white rabbit",
        serverData: [] as Array<HitsItemType>
    },
    tasksData: [
        {
            taskHeader: <>Список постов</>,
            imgSrc: postList,
            taskLink: "https://uchenick55.github.io/saga3-ms/",
            altTitle: "Список постов",
            description: [
                <>
                   <p>Нужно создать сайт с постами, где будут присутствовать 3 страницы (роута):</p>
                    <ol>
                        <li>Список постов (главная страница), где будут располагаться все посты.</li>
                        <li>Обо мне, где будет располагаться краткая информация о Вас.</li>
                        <li>Подробности о пользователе (куда необходимо вывести информацию о пользователе и список его постов)</li>
                    </ol>
                    <p>Получить данные необходимо через фейковое api https://jsonplaceholder.typicode.com</p>

                    <b>Подробное описание</b>
                    <h6> 1. Список постов (главная страница)</h6>
                    <p>1.1. Должна содержать список всех постов</p>
                    <p>1.2 Каждый пост состоит из заголовка, текста, аватара автора и списка комментариев</p>
                    <p>1.3 Заголовок и текст брать из api</p>
                    <p>1.4 Аватар должен быть одним изображением для всех пользователей, но при клике на него, должен происходить переход на страницу "Подробности о пользователе".</p>
                    <p>1.5 Список комментариев изначально скрыт, доступна лишь кнопка "Комментарии"</p>
                    <p>1.6 При нажатии на кнопку "Комментарии", должен грузиться из api и показываться список комментариев к данному посту. При повторном нажатии список должен скрываться</p>
                    <p>1.7  Комментарий состоит из заголовка (email) и текста</p>
                    <p>1.8. При загрузке данных с сервера нужно отобразить сперва лоадер, а только потом подгруженный контент (создайте дополнительно искусственную задержку в 0.5 секунд чтобы лоадер повисел подольше).</p>
                    <p>1.9. Должен присутствовать хэдер с «меню-бургером». При нажатии на него слева должно всплывать навигационное меню, где будет присутствовать 2 ссылки (Список постов и Обо мне), а также отображаться ваш аватар, имя и почтовый адрес.</p>
                    <p>1.10 Должна присутствовать возможность поиска по заголовку поста, с возможностью очистки поля через крестик.</p>
                    <p>1.11 Должна присутствовать возможность сортировки по заголовку поста.</p>
                    <p>1.12 Должна присутствовать пагинация.</p>
                    <h6>2. Обо мне</h6>
                    <p>2.1. Здесь всё просто, расскажите немного о себе. Сделайте эту страницу отдельным роутом, сохранив при этом хэдер и "меню-бургер".</p>
                    <h6>3. Подробности о пользователе (переход при нажатии по аватару у поста)</h6>
                    <p>3.1. Необходимо создать карточку, куда вывести краткую информацию о пользователе. Информация должна соответствовать автору поста.</p>
                    <p>3.2 Отобразить список постов принадлежащих только данному пользователю, структура самих постов полностью идентична с п.1.2.</p>
                    <p>3.3. Добавить лоадер по аналогии с п.1.8.</p>
                    <p>3.4. Сделать кнопку "Назад", при нажатии на которую произойдет переход на главную страницу.</p>


                    <h6>P.S:</h6>
                    <p>1. В качестве основы можно взять шаблон React App.</p>
                    <p>2. Вынесите логику работы с сервером в saga-эффекты.</p>
                    <p>3. Обязательно разбейте логически-независимые элементы страниц на компоненты.</p>
                    <p>4. На странице Подробности о пользователе данные должны подгружаться даже после обновления этой страницы.</p>
                    <p>5. Весь интерфейс реализуйте с помощью ui-библиотеки React-bootstrap (используйте компоненты, которые предоставляет эта библиотека).</p>
                    <p>6. Во время написания кода делайте коммиты почаще (по каждой существенной функции интерфейса).</p>
                    <p>7. Сделайте обработку ошибок на случай прихода ошибки от сервера.</p>
                    <p>8. Верстка должна выглядеть хорошо для маленьких и больших экранов устройств.</p>

                    <p>В результате выполнения задания задеплойте ваше SPA на хостинг (GitHub Pages / GitLab Pages / Heroku или прочие) и приложите ссылку на ваш удалённый репозиторий.</p>



                </>
            ],
            usedTech: "React, React-bootstrap, React-router, Axios, Redux, Redux-saga, Git",
            repositoryHref: "https://github.com/uchenick55/saga3-ms"
        },
{
            taskHeader: <>Поиск по GitHub репозиториям</>,
            imgSrc: Ghlist,
            taskLink: "https://uchenick55.github.io/github-repository-search/",
            altTitle: "Игра сапер",
            description: [
                <>
                    <p>Необходимо используя Github GraphQL API (https:docs.github.com/ru/graphql) создать
                        frontend приложение, которое состоит из двух страниц:</p>

                    <p> 1. Главная страница – список репозиториев с возможностью поиска и страницами</p>
                    <p> 2. Карточка репозитория – страница с детальной информацией по репозиторию</p>

                    <h5> Главная страница</h5>

                    <p> Ключевые элементы страницы:</p>
                    <ul>
                        <li> `Поле для поиска` репозиториев</li>
                        <li> `Список репозиториев`</li>
                        <li> `Paginator` – список страниц</li>
                    </ul>
                    <p>При введении текста в `Поле для поиска`, должен происходить поиск по названию среди
                        всех
                        репозиториев Github и выводиться его результат в `Список репозиториев` ниже.</p>

                    <p> Если в поле ничего не введено, то показывается список репозиториев текущего
                        пользователя.</p>

                    <p> Примерная структура элементов списка:</p>

                    <p> `[Название репозитория]` - `[кол-во звёзд на github]` - `[дата последнего коммита]`
                        -
                        `[ссылка на Github]`</p>

                    <p>Внизу страницы есть `Paginator` вида [1, 2, 3, 4, 5]. Не показывать больше 10
                        страниц.</p>

                    <p> При клике на вторую страницу показываются репозитории с 11 по 20. При клике на
                        третью
                        страницу показываются репозитории с 21 по 30 … и т.д.</p>

                    <p> Выбранная страница в `Paginator` должна отличаться по стилю от всех остальных.</p>

                    <p> При перезагрузке страницы состояние выбранных фильтров (поиска и страницы) должно
                        сохраняться и использоваться для первоначального запроса.</p>

                    <p> Поиск должен происходить на стороне API.</p>

                    <p>При клике на название репозитория происходит переход на `Карточку репозитория`.</p>

                    <h5>Карточка репозитория</h5>

                    <p> Карточка должна иметь следующую структуру:</p>
                    <ul>
                        <li> [`Название репозитория`] - [`кол-во звёзд на github`] - [`дата последнего
                            коммита`]
                        </li>
                        <li> [`Фото владельца репозитория, если есть`] - [`Nickname владельца репозитория с
                            ссылкой
                        </li>
                        на него`]
                        <li> [`Список используемых языков в репозитории`]</li>
                        <li> [`Краткое описание репозитория`]</li>
                    </ul>
                    <h5> Дополнительно</h5>

                    <p>Плюсом будет, если вы покроете end-to-end тестами функционал приложения можно
                        использовать Playwright или Cypress.</p>

                    <h5> Требования</h5>

                    <p>Основные технологии - Vite, Typescript, React, GraphQL</p>
                    <p> Использовать стейт-менеджер на выбор: redux / zustand / jotai / mobx / effector.</p>
                    <p> Данные должны храниться в стейт-менеджере.</p>
                    <p> Готовые UI библиотеки использовать нельзя, все нужно сверстать самостоятельно</p>
                    <p> Структура приложения должна быть с расчетом на будущий рост</p>

                    <p> В остальном выбирайте любые инструменты для выполнения задания. Главное, чтобы вашим
                        приложением можно было пользоваться в рамках описанных сценариев. </p>
                    <p>Насчёт дизайна можете много не думать – ссылок, кнопок и заголовков будет достаточно. Тем не
                        менее
                        сделайте это так, чтобы этим можно было пользоваться.</p>

                    <p>Результатом работы должна быть ссылка на ваш личный репозиторий. Идеальным вариантом
                        станет еще ссылка на работающее приложение.</p>

                </>
            ],
            usedTech: "React + redux + TS + GraphQl + PlayWright",
            repositoryHref: "https://github.com/uchenick55/github-repository-search"
        },
        {
            taskHeader: <>Игра сапер</>,
            imgSrc: Saper,
            taskLink: "https://uchenick55.github.io/saper-ts/",
            altTitle: "Игра сапер",
            description: [
                <>
                    <ul>
                        <li>Случайное размещение мин</li>
                        <li>Определение количества мин, расположенных рядом с каждой ячейкой</li>
                        <li>Отрисовка поля</li>
                        <li>Иконка статуса игры (в процессе/проигрыш/выигрыш). При ее нажатии, игра перезапускается</li>
                        <li>Счетчик расставленых флажков над минами</li>
                        <li>Открывание ячеек левой кнопкой мыши</li>
                        <li>Автоматическое открывание всех нулевых рядом расположеных ячеек</li>
                        <li>Установка флажка над предполагаемой миной правкой кнопкой мыши</li>
                        <li>При клике на пустую открытую клетку автоматическое открывание 8 рядом расположенных ячеек,
                            если совпадает количество флажков и мин
                        </li>
                        <li>Завершение игры при клике на бомбу (проигрыш). При этом открываются все неоткрытые ранее
                            бомбы. Неверно поставленые флажки помечаются красным.
                        </li>
                        <li>Завершение игры при закрытии всех бомб флажками (победа). Оставшиеся неоткрытые ячейки
                            открываются
                        </li>
                    </ul>
                </>
            ],
            usedTech: "React + redux + TS",
            repositoryHref: "https://github.com/uchenick55/saper-ts"
        },
        {
            taskHeader: <>Калькулятор обмена криптовалют</>,
            imgSrc: CryptoCalculator,
            taskLink: "https://uchenick55.github.io/bestchange/",
            altTitle: "крипто-калькулятор",
            description: [
                <>
                    <p> Пользователь задаёт:</p>
                    <ul>
                        <li>Какую валюту он отдаёт</li>
                        <li>Какую валюту он хочет получить</li>
                        <li>Количество отдаваемой или получаемой валюты</li>
                    </ul>
                    <p> После ввода данных калькулятор рассчитывает и выдает (без нажатия кнопки):</p>
                    <ul>
                        <li>Сколько пользователь получит или сколько ему нужно отдать валюты</li>
                        <li>Курс обмена</li>
                    </ul>
                    <h5> Необходимые технологии:</h5>
                    <ul>
                        <li>reactJS используя typescript</li>
                        <li>SOLID</li>
                    </ul>
                </>
            ],
            usedTech: "React + redux + TS",
            repositoryHref: "https://github.com/uchenick55/bestchange"
        },
        {
            taskHeader: "Поиск, сортировка и фильтрация",
            imgSrc: FilterSort,
            taskLink: "https://uchenick55.github.io/supplydirector-web-page-test/#/app/profile",
            altTitle: "Поиск, сортировка и фильтрация",
            description: [
                <>
                    <li>Поиск в запросах по полю "Название товара" независимо от регистра</li>
                    <li>Фильтрация запросов по кнопкам под полем поиска</li>
                    <li>Двунаправленная сортировка по заголовкам</li>
                    <li>Контекстное меню запросов:</li>
                    <ol>
                        <li>"Удалить" запрос</li>
                        <li>Пометить "В архив"/снять отметку</li>
                    </ol>
                </>
            ],
            usedTech: "React + redux",
            repositoryHref: "https://github.com/uchenick55/supplydirector-web-page-test.git"
        },
        {
            taskHeader: "Комбинации чисел",
            imgSrc: combinationChisel,
            taskLink: "https://uchenick55.github.io/lhtask1/",
            altTitle: "Комбинации чисел",
            description: [
                <>
                    <p>Написать функцию sostavChisla(massivChisel: number[], chislo: number),
                        которая бы находила все возможные комбинации чисел из massivChisel,
                        сумма которых равна chislo. При этом:</p>
                    <ul>
                        <li> massivChisel содержит уникальные положительные числа ( больше 0)</li>
                        <li> В комбинации не должно быть повторений чисел</li>
                        <li> Все комбинации должны быть уникальными</li>
                    </ul>
                </>
            ],
            usedTech: "React + redux",
            repositoryHref: "https://github.com/uchenick55/lhtask1.git"
        },
        {
            taskHeader: "bootstrap на HTML",
            imgSrc: bootstrapImg,
            taskLink: "https://uchenick55.github.io/bootstraphtmlcss/",
            altTitle: "Пример bootstrap сайта на чистом HTML",
            description: [
                <>
                    <p>Одностраничник на HTML: адаптивный масштаб, popup, аккордеон, слайдер, и прочее оформление
                        из
                        bootstrap</p>
                </>
            ],
            usedTech: "HTML, bootstrap",
            repositoryHref: "https://github.com/uchenick55/bootstraphtmlcss"
        },
        {
            taskHeader: "Игра крестики-нолики",
            imgSrc: krestikiNoliki,
            taskLink: "https://uchenick55.github.io/react-kabzda-1/#/rest",
            altTitle: "Игра крестики-нолики",
            description: [
                <>
                    <p>На основе обучающих уроков реакт</p>
                </>
            ],
            usedTech: "React",
            repositoryHref: "https://github.com/uchenick55/react-kabzda-1/tree/main2/src/components/Rest/Krestiki-Noliki"
        },
        {
            taskHeader: "Страница поиска новостей",
            imgSrc: news,
            taskLink: "https://uchenick55.github.io/react-kabzda-1/#/news",
            altTitle: "Страница поиска новостей",
            description: [
                <>
                    <p>На основе открытого api HackerNews</p>
                </>
            ],
            usedTech: "React + redux",
            repositoryHref: "https://github.com/uchenick55/react-kabzda-1/tree/main2/src/components/News"
        },
    ]
}


const tasksReducer = (state: InitialStateType = initialState, action: TasksActionTypes): InitialStateType => {//редьюсер микрозаданий
    let stateCopy: InitialStateType; // объявлениечасти части стейта до изменения редьюсером
    switch (action.type) {
        case SET_NEWS_DATA: // запись данных News
            stateCopy = {
                ...state, // копия всего стейта
                newsData: action.newsData,
            }
            return stateCopy; // возврат копии стейта после изменения
        default:
            return state; // по умолчанию стейт возврашается неизмененным
    }
}
export const getNewsThunkCreator = (query: string): ComThunkTp<TasksActionTypes> => {//санкреатор на получение данных новостей
    return async (dispatch, getState) => { // санка
        dispatch(appActions.toggleIsFetchingArray("getNewsThunkCreator", "add")) // добавить процесс в прелоадер

        const response: Array<HitsItemType> = await apiTasks.getNews( query );
        if (response) {
            dispatch( tasksActions.setNewsDataAC( {...getState().tasks.newsData, serverData: response, query: query} ) ) // получить данные с сервера по новостям

            dispatch(appActions.toggleIsFetchingArray("getNewsThunkCreator", "delete")) // убрать процесс из прелоадера
        }
    };
}

export default tasksReducer;
