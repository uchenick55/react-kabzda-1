import React, {ChangeEvent, useState} from "react";
import classes from "./Users.module.css";
import PaginationByCourse from "../common/Pagination/PaginationByCourseBS";
import InputButtonUsersRender from "./InputButtonRender";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import commonClasses from "../common/CommonClasses/common.module.css";
import UserItems from "./UserItems";
import {usersType} from "../api/apiTypes";

type UsersBSType = {
    totalUsersCount: number,
    pageSize:number,
    currentPage:number,
    users: Array<usersType>, // Реселектор users- список пользователей в пачке от сервера
    followingInProgress: Array<number>, // селектор followingInProgress - массив на кого мы подписались, кнопка неактивна
    isAuth: boolean, // селектор isAuth - флаг авторизации
    onChangeTerm:string,
    onlyFriends: boolean, // селектор получить только моих рузей
    currentRangeLocal: number,
    unfollowAPI:(id:number)=>void,
    onPageChanged:(setPage:number)=>void,
    followAPI:(id:number)=>void,
    SetTermFunction:()=>void,
    onChangeTermFunction:(event: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) =>void,
    onChangeRangeLocal:(rangeShift:number) =>void,
    setOnlyFriends:(onlyFriends: boolean)=>void,
}
const UsersBS:React.FC<UsersBSType> = ({
                     totalUsersCount, pageSize, currentPage, onPageChanged, users,
                     followingInProgress, unfollowAPI, isAuth, followAPI,
                     SetTermFunction, onChangeTerm, onChangeTermFunction,
                     onChangeRangeLocal, currentRangeLocal, setOnlyFriends, onlyFriends // раскукожили все пропсы
                 }) => {

    const [error, setError] = useState<any>( {message:""})
    if (error.message) {
        return error.message
    }
    try {

        const handleClick = (e:any) => { // обработка клика по кнопке
            e.preventDefault(); // отменить отправку формы по умолчанию с кнопки
            SetTermFunction() // задать в стейт значения поиска после сабмита
        }

        const paginationRender = <Row className="mt-3"> {/*Вывод пагинации*/}
            <PaginationByCourse
                totalUsersCount={totalUsersCount} pageSize={pageSize}
                currentPage={currentPage}
                onPageChanged={onPageChanged}
                currentRangeLocal={currentRangeLocal}
                onChangeRangeLocal={onChangeRangeLocal}
            />
        </Row>

        const InputButtonUsersRenderLocal = <InputButtonUsersRender //вывод инпута и кнопки для поиска юзеров
            onChangeTerm={onChangeTerm}
            onChangeTermFunction={onChangeTermFunction}
            SetTermFunction={SetTermFunction}
            handleClick={handleClick}
            setOnlyFriends={setOnlyFriends}
            onlyFriends={onlyFriends}
        />

        const TotalUsersCountRender = <Row> {/*вывод количества всех пользователей*/}
            <div className="d-flex justify-content-center opacity-50 mt-2 "> Total: {totalUsersCount}</div>
            <div className={classes.line}/>
        </Row>

        const UserItemsRender = <Row> {/*отрисовка самих карточек полшьзователей*/}
            <UserItems users={users} unfollowAPI={unfollowAPI} followAPI={followAPI}
                       followingInProgress={followingInProgress} isAuth={isAuth}/> {/*отрисовка UsersBS*/}
        </Row>

        return <div>

            <Container fluid className="d-block justify-content-center">

                <h2 className={commonClasses.pageHeader}>Users</h2> {/*заголовок */}

                {paginationRender}{/*Вывод пагинации вверху страницы */}

                {InputButtonUsersRenderLocal} {/*вывод инпута и кнопки для поиска юзеров*/}

                {TotalUsersCountRender} {/*вывод количества всех пользователей*/}

                {UserItemsRender}{/*отрисовка самих карточек пользователей*/}

                {paginationRender}{/*Вывод пагинации снизу страницы */}

            </Container>
        </div>

    } catch (error) {
        setError(error); // задание в стейт ошибки
    } finally {
        // console.log("try/catch -UsersBS.jsx выполнен! ") действие после прохождения try/catch
    }

}

export default UsersBS

