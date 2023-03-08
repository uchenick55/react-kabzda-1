import React from "react";
import classes from "./Tasks.module.css"

import FilterSort from "../../assets/images/Filter&Sort page.jpg"
import krestikiNoliki from "../../assets/images/krestiki-noliki.jpg"
import news from "../../assets/images/News.jpg"
import combinationChisel from "../../assets/images/combinationChisel.jpg"
import bootstrapImg from "../../assets/images/bootstrap.jpg"
import commonClasses from "../common/CommonClasses/common.module.css";
import Container from "react-bootstrap/Container";
import {NavLink} from "react-router-dom";
import CryptoCalculator from "../../assets/images/CryptoCalculator.jpg"
import Image from "react-bootstrap/Image";

const filterSort = "https://uchenick55.github.io/supplydirector-web-page-test/#/app/profile"
const lhtask1 = "https://uchenick55.github.io/lhtask1/"
const bootstrapUrl = "https://uchenick55.github.io/bootstraphtmlcss/"
const CryptoCalculatorUrl = "https://uchenick55.github.io/bestchange/"

let tasksRender = <div>
    <Container className={classes.TasksContainer}>

        <h3 className={commonClasses.pageHeader}>Tasks</h3>
        <p>Здесь собраны небольшие работы, не касающиеся социальной сети</p>

        <div>
            <h4 className={'mt-5'}>Калькулятор обмена криптовалют <br/>(на Typescript)
            </h4>
            <div><a href={CryptoCalculatorUrl}>
                <Image fluid={true} className={classes.imgTasks} src={CryptoCalculator}
                     alt="крипто-калькулятор"
                     title="крипто-калькулятор"
                /></a>
            </div>
            <h5>Задание:</h5>

            <p>Берём исходные данные по парам на обмен, подробное описание формата
                https://www.bestchange.ru/wiki/rates.html</p>

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
            <a href="https://github.com/uchenick55/bestchange">Репозиторий</a>


        </div>

        {/*================================================*/
        }
        <div>
            <h4 className={'mt-5'}>Поиск, сортировка и фильтрация</h4>
            <div><a href={filterSort}>
                <Image fluid={true} className={classes.imgTasks} src={FilterSort}
                     alt="Поиск, сортировка и фильтрация"
                     title="Поиск, сортировка и фильтрация"
                /></a>
            </div>

            <ul>
                <li>Поиск в запросах по полю "Название товара" независимо от регистра</li>
                <li>Фильтрация запросов по кнопкам под полем поиска</li>
                <li>Двунаправленная сортировка по заголовкам</li>
                <li>Контекстное меню запросов:</li>
                <ol>
                    <li>"Удалить" запрос</li>
                    <li>Пометить "В архив"/снять отметку</li>
                </ol>
                <a href="https://github.com/uchenick55/supplydirector-web-page-test.git">Репозиторий</a>
            </ul>

        </div>

        {/*================================================*/
        }

        <div>
            <h4 className={'mt-5'}>Комбинации чисел</h4>
            <div><a href={lhtask1}>
                <Image fluid={true} className={classes.imgTasks} src={combinationChisel}
                     alt="Комбинации чисел" title="Комбинации чисел"
                /></a>
            </div>
            <p>Написать функцию sostavChisla(massivChisel: number[], chislo: number),<br/>
                которая бы находила все возможные комбинации чисел из massivChisel,
                сумма которых равна chislo. При этом:</p>
            <ul>
                <li> massivChisel содержит уникальные положительные числа (> 0)</li>
                <li> В комбинации не должно быть повторений чисел</li>
                <li> Все комбинации должны быть уникальными</li>
            </ul>
            <a href="https://github.com/uchenick55/lhtask1.git">Репозиторий</a>
            {/*<p>Посмотреть код через Ctrl+p в консоли: lhtask1.jsx</p>*/}
        </div>
        {/*================================================*/
        }

        <div>
            <h4 className={'mt-5'}>Пример bootstrap сайта на чистом HTML+CSS</h4>
            <div><a href={bootstrapUrl}>
                <Image fluid={true} className={classes.imgTasks} src={bootstrapImg}
                     alt="Пример bootstrap сайта на чистом HTML+CSS"
                     title="Пример bootstrap сайта на чистом HTML+CSS"
                /></a>
            </div>
            <p>Одностраничник на HTML+CSS + адаптивный масштаб, popup, аккордеон, слайдер, и прочее оформление из
                bootstrap</p>
            <a href="https://github.com/uchenick55/bootstraphtmlcss">Репозиторий</a>
        </div>
        {/*================================================*/
        }

        <div>
            <h4 className={'mt-5'}>Игра крестики-нолики</h4>
            <div>
                <NavLink to='/rest'>
                    <Image fluid={true} className={classes.imgTasks} src={krestikiNoliki}
                         alt="Игра крестики-нолики" title="Игра крестики-нолики"/>
                </NavLink>
            </div>
            <p>На основе обучающих уроков реакт</p>
        </div>
        {/*================================================*/
        }

        <div>
            <h4 className={'mt-5'}>Страница поиска новостей</h4>
            <div>
                <NavLink to='/news'>
                    <Image fluid={true} className={classes.imgTasks} src={news}
                         alt="hacker-news" title="hacker-news"/>
                </NavLink>
            </div>
            <p>На основе открытого api HackerNews</p>
        </div>
    </Container>
</div>


let Tasks = () => {
    return <div>
        {tasksRender} {/*отрисовка FriendList*/}
    </div>


}
export default Tasks

