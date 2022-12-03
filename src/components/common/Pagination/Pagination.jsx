// Вынес в отдельную компоненту (файл) пагинацию страниц из Users.

import classes from "./Pagination.module.css";
import React from "react";
import {bedug_mode} from "../../../redux/store-redux";

let Pagination = ({totalUsersCount, pageSize, currentPage, onPageChanged}) => {
    let PagesCount = Math.ceil(totalUsersCount / pageSize);
    let pages = [];
    for (let i = 1; i <= PagesCount; i++) {
        pages.push(i)
    }

    let curP = currentPage;
    let curPF = ((curP - 5) < 0) ? 0 : curP - 5;
    let curPL = ((curP + 5) > PagesCount) ? PagesCount : curP + 5;
    let slicedPages = pages.slice(curPF, curPL);

    return (
        <div>
            {slicedPages.map((p) => {
                return (
                    p === currentPage
                        ? <span className={classes.selected} onClick={() => {
                            <div>
                            </div>
                        }}>{p}</span>
                        : <span onClick={() => {
                            onPageChanged(p)
                        }}>{p}</span>
                )
            })}
        </div>
    )
}


{/*        <div>
            {<Pagination
                totalUsersCount={totalUsersCount} pageSize={pageSize}
                currentPage={currentPage}
                onPageChanged={onPageChanged}/>}Вывод слайсера вверху страницы (пагинация)
        </div>*/}

export default Pagination
