import Saper from "../assets/images/saper.jpg";
import CryptoCalculator from "../assets/images/CryptoCalculator.jpg";
import FilterSort from "../assets/images/Filter&Sort page.jpg";
import combinationChisel from "../assets/images/combinationChisel.jpg";
import bootstrapImg from "../assets/images/bootstrap.jpg";
import krestikiNoliki from "../assets/images/krestiki-noliki.jpg";
import news from "../assets/images/News.jpg";
import React from "react";
import {tasksDataType} from "../types/commonTypes";

type initialStateType = {
    tasksData: Array<tasksDataType>
}

let initialState = { //стейт по умолчанию темы
    tasksData: [
        {
            TaskHeader: <>Игра сапер (React + Typescript)</>,
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
            repositoryHref: "https://github.com/uchenick55/saper-ts"
        },
        {
            TaskHeader: <>Калькулятор обмена криптовалют <br/> (на Typescript)</>,
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
            repositoryHref: "https://github.com/uchenick55/supplydirector-web-page-test.git"
        },
        {
            TaskHeader: "Комбинации чисел",
            imgSrc: combinationChisel,
            taskLink: "https://uchenick55.github.io/lhtask1/",
            altTitle: "Комбинации чисел",
            description: [
                <>
                    <p>Написать функцию sostavChisla(massivChisel: number[], chislo: number),<br/>
                        которая бы находила все возможные комбинации чисел из massivChisel,
                        сумма которых равна chislo. При этом:</p>
                    <ul>
                        <li> massivChisel содержит уникальные положительные числа ( больше 0)</li>
                        <li> В комбинации не должно быть повторений чисел</li>
                        <li> Все комбинации должны быть уникальными</li>
                    </ul>
                </>
            ],
            repositoryHref: "https://github.com/uchenick55/lhtask1.git"
        },
        {
            TaskHeader: "Пример bootstrap сайта на чистом HTML+CSS",
            imgSrc: bootstrapImg,
            taskLink: "https://uchenick55.github.io/bootstraphtmlcss/",
            altTitle: "Пример bootstrap сайта на чистом HTML+CSS",
            description: [
                <>
                    <p>Одностраничник на HTML+CSS + адаптивный масштаб, popup, аккордеон, слайдер, и прочее оформление
                        из
                        bootstrap</p>
                </>
            ],
            repositoryHref: "https://github.com/uchenick55/bootstraphtmlcss"
        },
        {
            TaskHeader: "Игра крестики-нолики",
            imgSrc: krestikiNoliki,
            //  taskLink: "https://uchenick55.github.io/react-kabzda-1/#/rest",
            taskLink: "http://localhost:3000/#/rest",
            altTitle: "Игра крестики-нолики",
            description: [
                <>
                    <p>На основе обучающих уроков реакт</p>
                </>
            ],
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
            repositoryHref: "https://github.com/uchenick55/react-kabzda-1/tree/main2/src/components/News"
        },
    ]
}


let tasksReducer = (state: initialStateType = initialState, action: any): initialStateType => {//редьюсер микрозаданий
    switch (action.type) {
        default:
            return state; // по умолчанию стейт возврашается неизмененным
    }
}

export default tasksReducer;
