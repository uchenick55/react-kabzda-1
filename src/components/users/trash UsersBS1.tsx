import React from "react";
import classes from "./Users.module.css";
import commonClasses from "../common/CommonClasses/common.module.css";
import "./scss/style.scss"
import PaginationContainer from "../common/Pagination/PaginationContainer";
import InputButtonContainer from "./InputButton/InputButtonCont";
import UserItemsContainer from "./UserItems/UserItemsContainer";

type UsersBSType = {
    totalUsersCount: number,
    patch: string, // страница из адресной строки
}
const UsersBS: React.FC<UsersBSType> = (({// раскукожили все пропсы
                                             totalUsersCount, patch,
                                         }) => {

    const TotalUsersCountRender = <div> {/*вывод количества всех пользователей*/}
        <div className="d-flex justify-content-center opacity-50 mt-2 "> Total: {totalUsersCount}</div>
        <div className={classes.line}/>
    </div>

    return <div className={classes.usersOverflowAuto}>

        <div>
            <div className={patch === "users" ? classes.usersHeaderUsersPage : classes.usersHeaderDialogsPage}>

                <h2 className={commonClasses.pageHeader}>Чаты</h2> {/*заголовок */}

                {patch === "users" && <div className="mt-3"> {/*Вывод пагинации*/}
                    <PaginationContainer/>
                </div>
                }{/*Вывод пагинации вверху страницы  только на странице users*/}

                <InputButtonContainer/>

                {patch === "users" && TotalUsersCountRender} {/*вывод количества всех пользователей только на странице users*/}

            </div>

            <UserItemsContainer/>{/*отрисовка самих карточек пользователей*/}

        </div>
    </div>

})

export default UsersBS

