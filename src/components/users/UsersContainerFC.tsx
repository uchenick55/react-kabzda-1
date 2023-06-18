import {GlobalStateType} from "../../redux/store-redux";
import {usersSelectorsSimple} from "./users-selectors";
import {useDispatch, useSelector} from "react-redux";
import {getUsersThunkCreator, UsersActions} from "../../redux/users-reducer";
import React, {useEffect, useMemo} from "react";
import Preloader from "../common/Preloader/Preloader";
import classes from "./Users.module.css";
import commonClasses from "../common/CommonClasses/common.module.css";
import PaginationContainer from "../common/Pagination/PaginationContainer";
import InputButtonContainer from "./InputButton/InputButtonCont";
import UserItemsContainer from "./UserItems/UserItemsContainer";
import {Dialog2Actions} from "../../redux/dialog2-reducer";

const UsersContainerFC: React.FC = () => {

    const {setDialog2InitialState} = Dialog2Actions

    const totalUsersCount: number = useSelector( usersSelectorsSimple.getTotalUsersCount )// селектор totalUsersCount - общее число пользователей с сервера
    const isFetching: boolean = useSelector( usersSelectorsSimple.getIsFetching )// селектор isFetching - показать крутилку при загрузке страницы
    const patch: string = useSelector( (state: GlobalStateType) => state.app.patch )// страница из URL

    const dispatch = useDispatch()

    const {setCurrentPage} = UsersActions // деструктуризация методов ActionCreator

    useEffect( () => { // при первой загрузке получить пользователей
        dispatch( setCurrentPage( 1 ) )// задание в стейт текущей страницы
        // setCurrentRangeLocal( 1 ) // перевод диапазона пагинации2 на 1 (сброс)
        dispatch( getUsersThunkCreator() );// получение списка пользователей (переключение на 1 страницу)
    }, [getUsersThunkCreator, setCurrentPage, dispatch] )

    useEffect( () => {
        dispatch( setDialog2InitialState() ) // при переключении со страницы диалогов, занулить стейт диалогов
    }, [setDialog2InitialState, dispatch] )

    const totalUsersCountRender = <div> {/*вывод количества всех пользователей*/}
        <div className="d-flex justify-content-center opacity-50 mt-2 "> Total: {totalUsersCount}</div>
        <div className={classes.line}/>
    </div>

    const paginationMemo = useMemo(()=><PaginationContainer/>,[]) // мемоизация чтобы не рисовалась при срабатывании колбеков соседей

    const inputButtonMemo = useMemo(()=><InputButtonContainer/>,[])// мемоизация чтобы не рисовалась при срабатывании колбеков соседей
    return <div>

        {isFetching && <Preloader/>} {/*лоадер при загрузке*/}

        <div className={patch === "users" ? "" : classes.usersHeaderDialogsPage}> {/*на странице Users - одна колонка*/}

            <h2 className={commonClasses.pageHeader}>Чаты</h2> {/*заголовок */}

            {patch === "users" && paginationMemo } {/*Вывод пагинации только на странице users*/}

            {inputButtonMemo} {/*ввод поиска по пользователям с кнопкой отправить*/}

            {patch === "users" && totalUsersCountRender} {/*вывод количества всех пользователей только на странице users*/}

        </div>

        <UserItemsContainer/>{/*отрисовка самих карточек пользователей*/}

    </div>
}

export default UsersContainerFC



/*    useEffect( () => { // при смене страницы получить пользователей - дубликат с пагинацией
      //  dispatch( getUsersThunkCreator( currentPage ) );
    }, [currentPage, getUsersThunkCreator, dispatch] )*/
