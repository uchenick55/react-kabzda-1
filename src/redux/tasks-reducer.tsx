import Saper from "../assets/images/saper.jpg";
import CryptoCalculator from "../assets/images/CryptoCalculator.jpg";
import FilterSort from "../assets/images/Filter&Sort page.jpg";
import Ghlist from "../assets/images/Ghlist.jpg";
import combinationChisel from "../assets/images/combinationChisel.jpg";
import bootstrapImg from "../assets/images/bootstrap.jpg";
import krestikiNoliki from "../assets/images/krestiki-noliki.jpg";
import news from "../assets/images/News.jpg";
import React from "react";
import {ComThunkTp, HitsItemType} from "../components/common/types/commonTypes";
import {InferActionsTypes} from "./store-redux";
import {apiTasks} from "../components/api/api";

const SET_NEWS_DATA = "myApp/app-reducer/SET_NEWS_DATA"; //константа задания данных News

export const tasksActions = {
    setNewsDataAC: (newsData: newsDataType) => { // экшн креатор задания данных News
        return {type: SET_NEWS_DATA, newsData} as const
    }
}

type newsDataType = typeof initialState.newsData

type initialStateType = typeof initialState

type TasksActionTypes = InferActionsTypes<typeof tasksActions>

const initialState = { //стейт по умолчанию темы
    newsData: {
        query: "white rabbit",
        serverData: [] as Array<HitsItemType>
    },
    tasksData: [
        {
            TaskHeader: <>Поиск по GitHub репозиториям</>,
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
             TaskHeader: <>Игра сапер</>,
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
             TaskHeader: <>Калькулятор обмена криптовалют</>,
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
             TaskHeader: "Поиск, сортировка и фильтрация",
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
             TaskHeader: "Комбинации чисел",
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
             TaskHeader: "bootstrap на HTML",
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
             TaskHeader: "Игра крестики-нолики",
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
             TaskHeader: "Страница поиска новостей",
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


const tasksReducer = (state: initialStateType = initialState, action: TasksActionTypes): initialStateType => {//редьюсер микрозаданий
    let stateCopy: initialStateType; // объявлениечасти части стейта до изменения редьюсером
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
        const response:Array<HitsItemType>  = await apiTasks.getNews( query );
        dispatch( tasksActions.setNewsDataAC({...getState().tasks.newsData, serverData: response, query: query}) ) // получить данные с сервера по новостям
    };
}

export default tasksReducer;
