import React, {useState} from "react";
import classes from "./Users.module.css";
import userPhoto from "../../assets/images/no-image3.png";
import {NavLink} from "react-router-dom";
import PaginationByCourse from "../common/Pagination/PaginationByCourseBS";
import {bedug_mode} from "../../redux/store-redux";
/*import ScrollContainer from "../common/Scroll/ScrollContainer";
import FindUsers from "./FindUsers";*/
import InputButtonUsersRender from "./InputButtonRender";

import "bootstrap/dist/css/bootstrap.min.css"
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';



let UsersBS = ({
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
            console.log("UsersBS")
        }

        let FollowUnfollowButtons = ({u, followUnfollowAPICallback, buttonText}) => { // унификация нажатия кнопки Follow/Unfollow
            return (<span>
            <Button variant="primary btn-sm"
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
                    <div key={u.id}
                         class="col-12 col-sm-3 col-lg-2 d-inline-block"> {/*размеры карточек в зависимости от размера экрана*/}
                        <Card>
                            <NavLink to={'/profile/' + u.id}> {/*при нажатии на картинку переход в профиль*/}
                                <img variant="top" class={''} className={classes.userPhoto}
                                     src={u.photos.small !== null
                                         ? u.photos.large
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
                                        <div>{u.status}</div>
                                    </div >
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

            <Container fluid className="d-block justify-content-center">
                <h2 className="d-flex justify-content-center text-uppercase mb-5">Users</h2>

                <Row>
                    {paginationRender}{/*Вывод пагинации вверху страницы */}

                    <InputButtonUsersRender //вывод инпута и кнопки для поиска юзеров
                        onChangeTerm={onChangeTerm}
                        onChangeTermFunction={onChangeTermFunction}
                        SetTermFunction={SetTermFunction}
                        handleClick={handleClick}
                    />

                </Row>
                <Row>
                    <div className="d-flex justify-content-center opacity-50 mt-2 "> Total: {totalUsersCount}</div>
                    <div className={classes.line}></div>
                </Row>
                <Row>
                    {UserItems} {/*отрисовка UsersBS*/}
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

