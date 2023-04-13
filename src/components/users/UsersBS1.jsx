import React, {useState} from "react";
import classes from "./Users.module.css";
import userPhoto from "../../assets/images/no-image3.png";
import DialogPic from "../../assets/images/swg/dialog-svgrepo-com.svg"

import FollowPic from "../../assets/images/swg/star-.svg"
import UnfollowPic from "../../assets/images/swg/star+.svg"
import {NavLink} from "react-router-dom";
import PaginationByCourse from "../common/Pagination/PaginationByCourseBS";
import InputButtonUsersRender from "./InputButtonRender";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import commonClasses from "../common/CommonClasses/common.module.css";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import UserItems from "./UserItems";

const UsersBS = ({
                     totalUsersCount, pageSize, currentPage, onPageChanged, users,
                     followingInProgress, unfollowAPI, isAuth, followAPI,
                     SetTermFunction, onChangeTerm, onChangeTermFunction,
                     onChangeRangeLocal, currentRangeLocal, myId, setOnlyFriends, onlyFriends // раскукожили все пропсы
                 }) => {
    const [error, setError] = useState("")
    if (error) {
        return error.message
    }
    try {

        const handleClick = (e) => { // обработка клика по кнопке
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

