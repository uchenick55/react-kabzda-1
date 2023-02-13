import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import Pagination from 'react-bootstrap/Pagination';

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

    const setPortion = (setPortionValue) => { // задать текущую порцию пагинации
        if (setPortionValue === "prevPortion" && currentRangeLocal > 1) // если мы жмем prevPortion
        {
            onChangeRangeLocal(-1) // уменьшаем диапазон на 1
        }
        if (setPortionValue === "nextPortion") // если мы жмем nextPortion
        {
            onChangeRangeLocal(+1) // увеличиваем  диапазон на 1
        }
    };

    let renderSlicedPages = slicedPages2.map((p) => { // мапинг отобранного массива
        return (
            <Pagination.Item // пагинация бутстрапа
                active={p === currentPage} // акттивная страница
                key={p} // ключ - страница
                 onClick={() => { // по клику
                    onPageChanged(p); // смена текущей старницы на кликнутую
                }}
            >
                {p} {/*отрисовать номер страницы в пагинации*/}
            </Pagination.Item>

        );
    })

    return (
        <div>
            <Pagination className={"pagination align-items-center justify-content-center"}> {/*стиль мышки рука */}
                <Pagination.Prev onClick={()=>{setPortion("prevPortion")}} /> {/*диапазон пагинации вниз*/}
                {renderSlicedPages} {/*отрисовка пагинации десяти страниц внутри кнопок*/}
                <Pagination.Next onClick={()=>{setPortion("nextPortion")}}/>  {/*диапазон пагинации вверх*/}
            </Pagination>
        </div>
    );
};

export default PaginationByCourse;
