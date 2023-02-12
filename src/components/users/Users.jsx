import React, {useState} from "react";
import classes from "./Users.module.css";
import userPhoto from "../../assets/images/no-image3.png";
import {NavLink} from "react-router-dom";
import PaginationByCourse from "../common/Pagination/PaginationByCourseBS";
import {bedug_mode} from "../../redux/store-redux";
import ScrollContainer from "../common/Scroll/ScrollContainer";
import FindUsers from "./FindUsers";
import InputButtonUsersRender from "./InputButtonRender";

import "bootstrap/dist/css/bootstrap.min.css"
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


let Users = ({
                 totalUsersCount, pageSize, currentPage, onPageChanged, users,
                 followingInProgress, unfollowAPI, isAuth, followAPI,
                 SetTermFunction, onChangeTerm, onChangeTermFunction,
                 onChangeRangeLocal, currentRangeLocal, myId // раскукожили все пропсы
             }) => {
    const [error, setError] = useState("")
    if (error) {
        return error.message
    }
    try {
        if (bedug_mode) {
            console.log("Users")
        }

        let FollowUnfollowButtons = ({u, followUnfollowAPICallback, buttonText}) => { // унификация нажатия кнопки Follow/Unfollow
            return (<span>
            <Button variant="primary"
                    disabled={followingInProgress.some(id => id === u.id) || u.id === myId}
                // отключение возможности повторного нажатия пока не пришел ответ от сервера или если это ваш ID
                    onClick={() => {
                        isAuth // проверка авторизации. Если нет, то алерт. Если да, то API запрос на follow/unfollow
                            ? followUnfollowAPICallback(u.id) //send to server request follow/unfollow from UsersContainer
                            : alert("You are not authorized, please Login") // алерт авторизуйтесь!
                    }}> {buttonText}
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
                    <div key={u.id} className="d-inline-block text-truncate m-2">
                        <Card style={{width: '12rem'}}>
                            <NavLink to={'/profile/' + u.id}>
                                <Card.Img variant="top" className={"p-3 rounded img-fluid"} src={u.photos.small !== null
                                    ? u.photos.small
                                    : userPhoto}/> </NavLink>
                            <Card.Body>
                                <Card.Title>{u.name}</Card.Title>
                                <Card.Text>
                                    <div> My FriendList:{" "}
                                        {u.followed
                                            ? <FollowUnfollowButtons u={u} followUnfollowAPICallback={unfollowAPI}
                                                                     buttonText={"Remove"}/>
                                            : <FollowUnfollowButtons u={u} followUnfollowAPICallback={followAPI}
                                                                     buttonText={"Add"}/>
                                        }
                                    </div>
                                    <div className={classes.textMaxWidth}>
                                        <div>Name: {u.name}</div>
                                        <div>
                                            <div>{u.status}</div>
                                        </div>
                                    </div>
                                </Card.Text>
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

        return <div className={classes.users}>


            <Container fluid>
                <Row >
                    <Col >
                        Find users
                    </Col>
                </Row>
                <Row>
                    <Col md="auto">            <div> Total users: {totalUsersCount}        </div>
                        <div>
                            {paginationRender}{/*Вывод пагинации вверху страницы */}
                        </div></Col>
                </Row>
                <Row>
                    <Col>1 of 3</Col>
                    <Col md="auto">Variable width content</Col>
                    <Col xs lg="2">
                        3 of 3
                    </Col>
                </Row>
            </Container>





            <div>
                <InputButtonUsersRender
                    onChangeTerm={onChangeTerm}
                    onChangeTermFunction={onChangeTermFunction}
                    SetTermFunction={SetTermFunction}
                    handleClick={handleClick}
                /> {/*вывод инпута и кнопки для поиска юзеров*/}
            </div>
            {/*отрисовка Users в скрол контейнере*/}
            <ScrollContainer
                child={UserItems}
                height={window.screen.availHeight - 298}
                firstInsideContainer={"UsersUp"}
                secondInsideContainer={"UsersDown"}
                containerElement={"UserContainer"}
            />

        </div>

    } catch (error) {
        setError(error); // задание в стейт ошибки
    } finally {
        // console.log("try/catch Users.jsx выполнен! ") действие после прохождения try/catch
    }

}

export default Users

