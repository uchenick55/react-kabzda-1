import React, {ChangeEvent, useState} from "react";
import classes from "./Users.module.css";
import PaginationByCourse from "../common/Pagination/PaginationByCourseBS";
import InputButtonUsersRender from "./InputButtonRender";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import commonClasses from "../common/CommonClasses/common.module.css";
import UserItems from "./UserItems";
import {usersType} from "../api/apiTypes";
import "./scss/style.scss"

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
    patch: string, // страница из адресной строки
    PageWidth: number // ширина страницы
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
                     onChangeRangeLocal, currentRangeLocal, setOnlyFriends, onlyFriends, patch, PageWidth
                                           // раскукожили все пропсы
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

        const UserItemsRender = <div className='my-4'> {/*отрисовка самих карточек пользователей*/}
            <UserItems users={users} unfollowAPI={unfollowAPI} followAPI={followAPI}
                       followingInProgress={followingInProgress} isAuth={isAuth} patch={patch} PageWidth={PageWidth}/>
                       {/*отрисовка UsersBS*/}
        </div>

        return <div>

            <Container  fluid >

                <h2 className={commonClasses.pageHeader}>Чаты</h2> {/*заголовок */}

                {patch==="users" && paginationRender}{/*Вывод пагинации вверху страницы  только на странице users*/}

                {InputButtonUsersRenderLocal} {/*вывод инпута и кнопки для поиска юзеров*/}

                {patch==="users" && TotalUsersCountRender} {/*вывод количества всех пользователей только на странице users*/}

                {UserItemsRender}{/*отрисовка самих карточек пользователей*/}

                {/* {paginationRender}Вывод пагинации снизу страницы */}

            </Container>
        </div>

    } catch (error) {
        setError(error); // задание в стейт ошибки
    } finally {
        // console.log("try/catch -UsersBS.jsx выполнен! ") действие после прохождения try/catch
    }

}

export default UsersBS

