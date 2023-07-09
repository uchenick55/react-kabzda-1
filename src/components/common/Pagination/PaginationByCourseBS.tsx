import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import Pagination from 'react-bootstrap/Pagination';
import classes from "./Pagination.module.css"

type PaginationByCourseType = {
    totalUsersCount: number,
    pageSize: number,
    currentPage: number,
    onPageChanged: (setPage: number) => void,
    currentRangeLocal: number,
    onChangeRangeLocal: (rangeShift: number) => void,

}
const PaginationByCourse: React.FC<PaginationByCourseType> = (({
                                                                   totalUsersCount, // общее число пользователей на сервере
                                                                   pageSize, // количество пользователей на одной странице
                                                                   currentPage, // текущая страница пагинации
                                                                   onPageChanged, // колбек-функция изменения текущей страницы
                                                                   currentRangeLocal,
                                                                   onChangeRangeLocal
                                                               }) => {
 //   console.log( "PaginationByCourse" )
    const PortionSize: number = 6 // количество отображаемых страниц из всего массива
    // currentRange - текущий диапазон. Он в PortionSize меньше PagesCount
    //setCurrentRange - изменение currentRange по клику на кнопку
    // PortionSizeLeft - Нижнее значение порций (не меньше 1)
    // const [mouseHovered, setMouseHovered] = useState("");
    const PagesCount = Math.ceil( totalUsersCount / pageSize ); // сколько всего страниц можно вызвать
    //с пользователями пачками по PageSize
    const pages = []; // определяем массив страниц под всех пользователей
    for (let i = 1; i <= PagesCount; i++) {
        // В этот массив
        pages.push( i ); // добавляем все страницы пользователей
    }

    const PortionSizeLeft = 1 + PortionSize * (currentRangeLocal - 1); // Нижнее значение порций (не меньше 1)
    const PortionSizeRight = PortionSize * currentRangeLocal; // Верхнее значение страниц (не больше PagesCount)
    const slicedPages2 = pages.filter(
        // фильтруем весь массив страниц пользователей
        (p) => p >= PortionSizeLeft && p <= PortionSizeRight // оставляем только в заданном диапазоне
    );

    type SetPortionValueType = "prevPortion" | "nextPortion"
    const setPortion = (setPortionValue: SetPortionValueType) => { // задать текущую порцию пагинации
        if (setPortionValue === "prevPortion" && currentRangeLocal > 1) // если мы жмем prevPortion
        {
            onChangeRangeLocal( -1 ) // уменьшаем диапазон на 1
        }
        if (setPortionValue === "nextPortion") // если мы жмем nextPortion
        {
            onChangeRangeLocal( +1 ) // увеличиваем  диапазон на 1
        }
    };

    const renderSlicedPages = slicedPages2.map( (p) => { // мапинг отобранного массива
        return <Pagination.Item // пагинация бутстрапа
            active={p === currentPage} // акттивная страница
            key={p} // ключ - страница
            onClick={() => { // по клику
                onPageChanged( p ); // смена текущей старницы на кликнутую
            }}
        >
            {p} {/*отрисовать номер страницы в пагинации*/}
        </Pagination.Item>
    } )

    return (
        <div className={classes.pagination}>
            <Pagination className={"pagination align-items-center justify-content-center"}> {/*стиль мышки рука */}
                <Pagination.Prev onClick={() => {
                    setPortion( "prevPortion" )
                }}/> {/*диапазон пагинации вниз*/}
                {renderSlicedPages} {/*отрисовка пагинации страниц внутри кнопок*/}
                <Pagination.Next onClick={() => {
                    setPortion( "nextPortion" )
                }}/> {/*диапазон пагинации вверх*/}
            </Pagination>
        </div>
    );
});

export default PaginationByCourse;
