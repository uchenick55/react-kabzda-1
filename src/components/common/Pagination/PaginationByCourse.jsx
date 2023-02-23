import React, {useState} from "react";
import classes from "./Pagination.module.css";
import {PointerCursor} from "../../-Dark_light_theme/-globalStyles";

let PaginationByCourse = ({
                              totalUsersCount, // общее число пользователей на сервере
                              pageSize, // количество пользователей на одной странице
                              currentPage, // текущая страница пагинации
                              onPageChanged, // колбек-функция изменения текущей страницы
                              PortionSize = 10, // количество отображаемых страниц из всего массива
                              currentRangeLocal,
                              onChangeRangeLocal
                          }) => {
    // currentRange - текущий диапазон. Он в PortionSize меньше PagesCount
    //setCurrentRange - изменение currentRange по клику на кнопку
    // PortionSizeLeft - Нижнее значение порций (не меньше 1)
    const [mouseHovered, setMouseHovered] = useState("");
    let PagesCount = Math.ceil(totalUsersCount / pageSize); // сколько всего страниц можно вызвать
    //с пользователями пачками по PageSize
    let pages = []; // определяем массив страниц под всех пользователей
    for (let i = 1; i <= PagesCount; i++) {
        // В этот массив
        pages.push(i); // добавляем все страницы пользователей
    }

    let PortionSizeLeft = 1 + PortionSize * (currentRangeLocal - 1); // Нижнее значение порций (не меньше 1)
    let PortionSizeRight = PortionSize * currentRangeLocal; // Верхнее значение страниц (не больше PagesCount)
    let slicedPages2 = pages.filter(
        // фильтруем весь массив страниц пользователей
        (p) => p >= PortionSizeLeft && p <= PortionSizeRight // оставляем только в заданном диапазоне
    );
    const prevPortion = () => { // по клеку на кнопку Prev
        if (currentRangeLocal > 1) // если текущий диапазон больше 1
        {
            onChangeRangeLocal(-1) // уменьшаем диапазон на 1
        }
    };

    const nextPortion = () => {
        if (currentRangeLocal < Math.ceil(PagesCount / PortionSize))
            // если текущий диапазон меньше максимального
        {
            onChangeRangeLocal(+1) // увеличиваем диапазон на 1
        }
    };

    let renderSlicedPages = slicedPages2.map((p) => { // мапинг отобранного массива
        return (
            <span
                key={p} // ключ - страница
                onMouseLeave={() => { // мышка ушла с элемента (страницы)
                    setMouseHovered(0); // номер выделенной страницы зануляем
                }}
                onClick={() => { // по клику
                    onPageChanged(p); // смена текущей старницы на кликнутую
                }}
                onMouseOver={() => { // мышка сверху элемента (страницы)
                    setMouseHovered(p); // номер выделенной страницы равен отрисованной странице
                }}
            >
                <span className={
                    (p === currentPage || p === mouseHovered)?// если страница равна текущей, или на нее навели мышкой
                     classes.selected: null}> {p} </span>  {/*отрисовать страницу жирным шрифтом, иначе обычным*/}
            </span>
        );
    })

    return (
        <div>
            {/*<div> Текущая страница {currentPage}</div>*/}
            {(currentRangeLocal) > 1
                ? <button onClick={prevPortion}>Prev</button> // кнопка Prev активна с обработчиком
                : <button disabled>Prev</button> // кнопка Prev неактивна
            }
            <PointerCursor> {/*стиль мышки рука */}
                {renderSlicedPages} {/*отрисовка пагинации десяти страниц внутри кнопок*/}
            </PointerCursor>

            <button onClick={nextPortion}>Next</button>
            {/*кнопка следующая страница*/}
        </div>
    );
};

export default PaginationByCourse;
