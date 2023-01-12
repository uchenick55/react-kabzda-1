import React, {useState} from "react";
import classes from "./Users.module.css";
import userPhoto from "../../assets/images/no-image3.png";
import {NavLink} from "react-router-dom";
import PaginationByCourse from "../common/Pagination/PaginationByCourse";
import {bedug_mode} from "../../redux/store-redux";
import ScrollContainer from "../common/Scroll/ScrollContainer";
import FindUsers from "./FindUsers";

let Users = ({
                 totalUsersCount, pageSize, currentPage, onPageChanged, users,
                 followingInProgress, unfollowAPI, isAuth, followAPI,
                 SetTermFunction, onChangeTerm, onChangeTermFunction,
                 onChangeRangeLocal, currentRangeLocal, myID // раскукожили все пропсы
             }) => {
    const [error, setError] = useState("")
    if  (error) {return error.message}
    try {
        if (bedug_mode) {
            console.log("Users")
        }

        let FollowUnfollowButtons = ({u, followUnfollowAPICallback, buttonText}) => { // унификация нажатия кнопки Follow/Unfollow
            return (<span>
                <button
                    disabled={followingInProgress.some(id => id === u.id) || u.id === myID}
                    // отключение возможности повторного нажатия пока не пришел ответ от сервера или если это ваш ID
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
             //   throw new Error("Я - сообщение об ошибке"); //проверка обработки ошибок
                return (
                    <div key={u.id}>
                        <div>
                            <NavLink to={'/profile/' + u.id}>
                                <img alt={"userPhoto"} className={classes.userPhoto}
                                     src={u.photos.small !== null
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
        let paginationRender = <PaginationByCourse
            totalUsersCount={totalUsersCount} pageSize={pageSize}
            currentPage={currentPage}
            onPageChanged={onPageChanged}
            currentRangeLocal={currentRangeLocal}
            onChangeRangeLocal={onChangeRangeLocal}

        />
        let inputButtonRender = <form className={classes.inputFindUsers}>  {/* объединение инпута и кнопки*/}
            <input
                value={onChangeTerm} // значение поля поиска захардкодили
                onChange={(event) => {
                    onChangeTermFunction(event)
                }} // по изменению поля получить значение
                onBlur={SetTermFunction}// задать в локальный стейт значение поиска при потере фокуса
                placeholder={"find users"} // пояснение поля ввода
                autoFocus // сразу фокусировка на поле ввода
            />
            <button onClick={handleClick}>Find</button>
            {/* кнопка с обработчиком клика*/}
        </form>


        return <div className={classes.users}>

            <div> Total users: {totalUsersCount}        </div>
            <div>
                {paginationRender}{/*Вывод пагинации вверху страницы */}
            </div>
            <div>
                {inputButtonRender} {/*вывод инпута и кнопки для поиска юзеров*/}
            </div>
            <div>
                <FindUsers/>
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

