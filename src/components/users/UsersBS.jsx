import React, {useState} from "react";
import classes from "./Users.module.css";
import userPhoto from "../../assets/images/no-image3.png";
import DialogPic from "../../assets/images/swg/dialog-svgrepo-com.svg"

import FollowPic from "../../assets/images/swg/star-.svg"
import UnfollowPic from "../../assets/images/swg/star+.svg"

import {NavLink} from "react-router-dom";
import PaginationByCourse from "../common/Pagination/PaginationByCourseBS";
import {bedug_mode} from "../../redux/store-redux";
import InputButtonUsersRender from "./InputButtonRender";

import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import commonClasses from "../common/CommonClasses/common.module.css";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";


let UsersBS = ({
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
        if (bedug_mode) {
            console.log("UsersBS")
        }

        let FollowUnfollowButtons = ({u, followUnfollowAPICallback, buttonText}) => { // унификация нажатия кнопки Follow/Unfollow
            return (<span>
            <Button variant={"light"}
                    disabled={followingInProgress.some(id => id === u.id) || u.id === myId}
                // отключение возможности повторного нажатия пока не пришел ответ от сервера или если это ваш ID
                    onClick={() => {
                        isAuth // проверка авторизации. Если нет, то алерт. Если да, то API запрос на follow/unfollow
                            ? followUnfollowAPICallback(u.id) //send to server request follow/unfollow from UsersContainer
                            : alert("You are not authorized, please Login") // алерт авторизуйтесь!
                    }}> {/*{buttonText}*/}
                {!u.followed &&
                <Image fluid={true} src={FollowPic} alt={"Добавить в избранное"} title={"Добавить в избранное"}/>}
                {u.followed &&
                <Image fluid={true} src={UnfollowPic} alt={"Удалить из избранного"} title={"Удалить из избранного"}/>}
                </Button>
                    {/* buttonText - текст кнопки Follow/Unfollow*/}
            </span>
            )
        }
        const handleClick = (e) => { // обработка клика по кнопке
            e.preventDefault(); // отменить отправку формы по умолчанию с кнопки
            SetTermFunction() // задать в стейт значения поиска после сабмита
        }

        let UserItems =
            users.map((u) => {
                //   throw new Error("Я - сообщение об ошибке"); //проверка обработки ошибок
                return (
                    <div key={u.id}
                         className="my-2 col-12 col-sm-3 col-lg-2 d-inline-block"> {/*размеры карточек в зависимости от размера экрана*/}
                        <Card>
                            <NavLink to={'/profile/' + u.id}> {/*при нажатии на картинку переход в профиль*/}
                                <Image fluid={true} variant="top" className={classes.userPhoto}
                                       src={u.photos.small !== null
                                           ? u.photos.large
                                           : userPhoto}
                                       alt={"Перейти в профиль"}
                                       title={"Перейти в профиль"}
                                /> </NavLink>
                            <Card.Body>
                                <Card.Title className={commonClasses.textMaxWidth}>{u.name}</Card.Title>
                                <Row>
                                    <Col>
                                        <div>
                                            {u.followed
                                                ? <FollowUnfollowButtons u={u} followUnfollowAPICallback={unfollowAPI}
                                                                         buttonText={"Remove"}/>
                                                : <FollowUnfollowButtons u={u} followUnfollowAPICallback={followAPI}
                                                                         buttonText={"Add"}/>
                                            }
                                        </div>
                                    </Col>
                                    <Col>
                                        <NavLink to={'/dialogs/' + u.id}><Button variant="light">
                                            <Image fluid={true} src={DialogPic} alt={"Начать диалог"}
                                                   title={"Начать диалог"}/>
                                        </Button></NavLink>
                                    </Col>
                                </Row>

                                <Row className={commonClasses.textMaxWidth}>
                                    {u.status && <div>Status: {u.status}</div>}
                                </Row>
                            </Card.Body>
                        </Card>
                    </div>
                )
            })
        let paginationRender = <PaginationByCourse
            totalUsersCount={totalUsersCount} pageSize={pageSize}
            currentPage={currentPage}
            onPageChanged={onPageChanged}
            currentRangeLocal={currentRangeLocal}
            onChangeRangeLocal={onChangeRangeLocal}

        />

        return <div>
            {/*<div className={classes.minwidth}></div>*/}

            <Container fluid className="d-block justify-content-center">
                <h2 className={commonClasses.pageHeader}>Users</h2>

                <Row>

                    {paginationRender}{/*Вывод пагинации вверху страницы */}

                    <InputButtonUsersRender //вывод инпута и кнопки для поиска юзеров
                        onChangeTerm={onChangeTerm}
                        onChangeTermFunction={onChangeTermFunction}
                        SetTermFunction={SetTermFunction}
                        handleClick={handleClick}
                        setOnlyFriends={setOnlyFriends}
                        onlyFriends={onlyFriends}
                    />

                </Row>
                <Row>
                    <div className="d-flex justify-content-center opacity-50 mt-2 "> Total: {totalUsersCount}</div>
                    <div className={classes.line}/>
                </Row>
                <Row>
                    {UserItems} {/*отрисовка UsersBS*/}
                </Row>
                <Row className="mt-3">
                    {paginationRender}{/*Вывод пагинации снизу страницы */}
                </Row>


            </Container>
        </div>

    } catch (error) {
        setError(error); // задание в стейт ошибки
    } finally {
        // console.log("try/catch UsersBS.jsx выполнен! ") действие после прохождения try/catch
    }

}

export default UsersBS

