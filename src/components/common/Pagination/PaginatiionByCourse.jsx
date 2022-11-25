import {useState} from "react";
import classes from "./Pagination.module.css";

let PaginatiionByCourse = ({
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
    // PortionSizeLeft -
    const [mouseHovered, setMouseHovered] = useState("");
    let PagesCount = Math.ceil(totalUsersCount / pageSize); // сколько всего страниц можно вызвать
    //с пользователями пачками по PageSize
    let pages = []; // определяем массив страниц под всех пользователей
    for (let i = 1; i <= PagesCount; i++) {
        // В этот массив
        pages.push(i); // добавляем все страницы пользователей
    }

    let PortionSizeLeft = 1 + PortionSize * (currentRangeLocal - 1); // Нижнее значение страниц (не меньше 1)
    let PortionSizeRight = PortionSize * currentRangeLocal; // Верхнее значение страниц (не больше PagesCount)
    let slicedPages2 = pages.filter(
        // фильтруем весь массив страниц пользователей
        (p) => p >= PortionSizeLeft && p <= PortionSizeRight // оставляем только в заданном диапазоне
    );
    const prevPortion = () => {
        if (currentRangeLocal > 1)
            // если текущий диапазон больше 1
        {
            onChangeRangeLocal(-1)
        }
    };

    const nextPortion = () => {
        if (currentRangeLocal < Math.ceil(PagesCount / PortionSize))
            // если текущий диапазон меньше максимального
        {
            onChangeRangeLocal(+1)
        }
    };

    return (
        <div>
            {/*<div> Текущая страница {currentPage}</div>*/}
            <button onClick={prevPortion}>Prev</button>
            {slicedPages2.map((p) => {
                return (
                    <span
                        key={p}
                        className={classes.rangeList}
                        onMouseLeave={() => {
                            setMouseHovered(0);
                        }}
                        onClick={() => {
                            onPageChanged(p);
                        }}
                        onMouseOver={() => {
                            setMouseHovered(p);
                        }}
                    >
            {p === currentPage || p === mouseHovered ? (
                <span className={classes.selected}>{p} </span>
            ) : (
                <span>{p} </span>
            )}
          </span>
                );
            })}
            <button onClick={nextPortion}>Next</button>
        </div>
    );
};

export default PaginatiionByCourse;
