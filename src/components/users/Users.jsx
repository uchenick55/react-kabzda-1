import React from "react";
import classes from "./Users.module.css";
import userPhoto from "../../assets/images/no-image3.png";
import {NavLink} from "react-router-dom";
import Pagination from "../common/Pagination/Pagination";
import PaginatiionByCourse from "../common/Pagination/PaginatiionByCourse";
import {bedug_mode} from "../../redux/store-redux";
import ScrollContainer from "../common/Scroll/ScrollContainer";

let Users = ({
                 totalUsersCount, pageSize, currentPage, onPageChanged, users,
                 followingInProgress, unfollowAPI, isAuth, followAPI,
                 SetTermFunction, onChangeTerm, onChangeTermFunction,
                 onChangeRangeLocal, currentRangeLocal // раскукожили все пропсы
             }) => {

    if (bedug_mode) {console.log("Users")}

    try { // выполнить код с возможностью отлова ошибок
        let FollowUnfollowButtons = ({u, followUnfollowAPICallback, buttonText}) => { // унификация нажатия кнопки Follow/Unfollow
            return (<span>
                <button
                    disabled={followingInProgress.some(id => id === u.id)} // отключение возможности повторного нажатия пока не пришел ответ от сервера
                    onClick={() => {
                        isAuth // проверка авторизации. Если нет, то алерт. Если да, то API запрос на follow/unfollow
                            ? followUnfollowAPICallback(u.id) //send to server request follow/unfollow from UsersContainer
                            : alert("You are not authorized, please Login") // алерт авторизуйтесь!
                    }}> {buttonText}
                </button>
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
                <div key={u.id}/>
                return (
                    <div>
                        <div>
                            <NavLink to={'/profile/' + u.id}>
                                <img className={classes.userPhoto}
                                     src={u.photos.small != null
                                         ? u.photos.small
                                         : userPhoto}/>
                            </NavLink>
                        </div>
                        <div> My FriendList:{" "}
                            {u.followed
                                ? <FollowUnfollowButtons u={u} followUnfollowAPICallback={unfollowAPI}
                                                         buttonText={"Remove"}/>
                                : <FollowUnfollowButtons u={u} followUnfollowAPICallback={followAPI}
                                                         buttonText={"Add"}/>
                            }
                        </div>
                        <div>Name: {u.name}</div>
                        <div>{u.status}</div>
                        <div>{u.id}</div>
                    </div>
                )
            })

        return <div className={classes.users}>

            <div> Total users: {totalUsersCount}        </div>
            <div>
                {<PaginatiionByCourse
                    totalUsersCount={totalUsersCount} pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChanged={onPageChanged}
                    currentRangeLocal={currentRangeLocal}
                    onChangeRangeLocal={onChangeRangeLocal}

                />}{/*Вывод слайсера вверху страницы (пагинация)*/}
            </div>
            <form>  {/* объединение инпута и кнопки*/}
                <input
                    value={onChangeTerm} // значение поля поиска захардкодили
                    onChange={(event) => {
                        onChangeTermFunction(event)
                    }} // по изменению поля получить значение
                    onBlur={SetTermFunction}// задать в локальный стейт значение поиска при потере фокуса
                    placeholder={"find users"} // пояснение поля ввода
                    autoFocus={true} // сразу фокусировка на поле ввода
                />
                <button onClick={handleClick}>Find</button>
                {/* кнопка с обработчиком клика*/}
            </form>

            <ScrollContainer
                child={UserItems}
                height={"391px"}
                firstInsideContainer={"UsersUp"}
                secondInsideContainer={"UsersDown"}
                containerElement={"UserContainer"}

            /> {/*отрисовка Users в скрол контейнере*/}

        </div>

    } catch (error) { // поймать ошибку в выводе пользователей
        console.log(error) // вывести ее в консоль
    }

}

export default Users

