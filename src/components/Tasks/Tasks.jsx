import React from "react";
import classes from "./Tasks.module.css"

import FilterSort from "../../assets/images/Filter&Sort page.jpg"
import combinationChisel from "../../assets/images/combinationChisel.jpg"
import bootstrapImg from "../../assets/images/bootstrap.jpg"
import ScrollContainer from "../common/Scroll/ScrollContainer";
import commonClasses from "../common/CommonClasses/common.module.css";

const filterSort = "https://uchenick55.github.io/supplydirector-web-page-test/#/app/profile"
const lhtask1 = "https://uchenick55.github.io/lhtask1/"
const bootstrapUrl = "https://uchenick55.github.io/bootstraphtmlcss/"

let tasksRender = <div className={classes.taskcCommon}>
    <div>
        <h2 className={commonClasses.pageHeader}>Tasks</h2>
        <p>Здесь собраны небольшие работы, не касающиеся социальной сети</p>
        <div><a href={filterSort} target = "_blank"  rel="noreferrer"><h2>Поиск, сортировка и фильтрация</h2>
            <img className={classes.imgTasks} src={FilterSort} alt="Поиск, сортировка и фильтрация"/></a>
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

            Репозиторий: https://github.com/uchenick55/supplydirector-web-page-test.git<br/>
        </ul>
        <div>
        </div>

    </div>

    {/*================================================*/}

    <div>

        <div><a href={lhtask1} target="_blank" rel="noreferrer"><h2>Комбинации чисел</h2>
            <img className={classes.imgTasks} src={combinationChisel} alt="Комбинации чисел"/></a>
        </div>
        <p>Написать функцию sostavChisla(massivChisel: number[], chislo: number),<br/>
            которая бы находила все возможные комбинации чисел из massivChisel,<br/>
            сумма которых равна chislo. При этом:</p>
        <ul>
            <li> massivChisel содержит, только уникальные положительные числа (> 0)</li>
            <li> В комбинации не должно быть повторений чисел</li>
            <li> Все комбинации должны быть уникальными</li>
        </ul>
        <p>Репозиторий: https://github.com/uchenick55/lhtask1.git</p>
        {/*<p>Посмотреть код через Ctrl+p в консоли: lhtask1.jsx</p>*/}
    </div>
    {/*================================================*/}

    <div>

        <div><a href={bootstrapUrl} target="_blank" rel="noreferrer"><h2>Пример bootstrap сайта на чистом HTML+CSS</h2>
            <img className={classes.imgTasks} src={bootstrapImg} alt="Пример bootstrap сайта на чистом HTML+CSS"/></a>
        </div>
        <p>Одностраничник на HTML+CSS + адаптивный масштаб, popup, аккордеон, слайдер, и прочее оформление из bootstrap</p>
        <p>Репозиторий: https://github.com/uchenick55/bootstraphtmlcss</p>
    </div>

</div>

let Tasks = () => {
    return <div>
        <ScrollContainer
            child={tasksRender}
            height={window.screen.availHeight - 218}
            firstInsideContainer={"ProfileUp"}
            secondInsideContainer={"ProfileDown"}
            containerElement={"ProfileContainer"}
        /> {/*отрисовка FriendList в скрол контейнере*/}
    </div>


}
export default Tasks

