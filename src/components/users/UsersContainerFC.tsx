import {GlobalStateType} from "../../redux/store-redux";
import {usersSelectorsSimple} from "./users-selectors";
import {useDispatch, useSelector} from "react-redux";
import {getUsersThunkCreator} from "../../redux/users-reducer";
import React, {useEffect, useMemo} from "react";
import Preloader from "../common/Preloader/Preloader";
import classes from "./Users.module.css";
import commonClasses from "../common/CommonClasses/common.module.css";
import PaginationContainer from "../common/Pagination/PaginationContainer";
import InputButtonContainer from "./InputButton/InputButtonCont";
import UserItemsContainer from "./UserItems/UserItemsContainer";
import {dialog2Actions} from "../../redux/dialog2-reducer";
import {D2ItemType} from "../api/apiTypes";

const UsersContainerFC: React.FC = () => {
    console.log("===>>> UsersContainerFC ")
    const {setDialog2InitialState} = dialog2Actions

    const currentPage: number = useSelector( usersSelectorsSimple.getCurrentPage )// селектор currentPage - текущая страница пачки пользователей с сервера
    const totalUsersCount: number = useSelector( usersSelectorsSimple.getTotalUsersCount )// селектор totalUsersCount - общее число пользователей с сервера
    const patch: string = useSelector( (state: GlobalStateType) => state.app.patch )// страница из URL
    const onlyFriends: boolean = useSelector( usersSelectorsSimple.getOnlyFriends )// селектор получить только моих рузей
    const term: string = useSelector( (state: GlobalStateType) => state.usersPage.term )// поисковый запрос среди users
    const d2Item: D2ItemType = useSelector( (state: GlobalStateType) => state.dialog2.d2Item )// отфильтрованый  из dialog2All выбранный пользователь по userId


    const dispatch = useDispatch()

    useEffect( () => { // при смене страницы получить пользователей - дубликат с пагинацией
        dispatch( getUsersThunkCreator() );
    }, [dispatch, onlyFriends, term, currentPage] )

    useEffect( () => {
        if (d2Item.id) { // если стейт d2Item не пустой, занулить его перед новым выбором собеседника
            dispatch( setDialog2InitialState() )
        }
    }, [setDialog2InitialState, dispatch, d2Item] )


    const totalUsersCountRender = <div> {/*вывод количества всех пользователей*/}
        <div className="d-flex justify-content-center opacity-50 mt-2 "> Total: {totalUsersCount}</div>
        <div className={classes.line}/>
    </div>

    const paginationMemo = useMemo( () => <PaginationContainer/>, [] ) // мемоизация чтобы не рисовалась при срабатывании колбеков соседей

    const inputButtonMemo = useMemo( () => <InputButtonContainer/>, [] )// мемоизация чтобы не рисовалась при срабатывании колбеков соседей
    return <div>

        <div className={patch === "users" ? "" : classes.usersHeaderDialogsPage}> {/*на странице Users - одна колонка*/}

            <h2 className={commonClasses.pageHeader}>Чаты</h2> {/*заголовок */}

            {patch === "users" && paginationMemo} {/*Вывод пагинации только на странице users*/}

            {inputButtonMemo} {/*ввод поиска по пользователям с кнопкой отправить*/}

            {patch === "users" && totalUsersCountRender} {/*вывод количества всех пользователей только на странице users*/}

        </div>

        <UserItemsContainer/>{/*отрисовка самих карточек пользователей*/}

    </div>
}

export default UsersContainerFC




