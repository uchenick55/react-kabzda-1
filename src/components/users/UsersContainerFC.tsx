import {usersType} from "../api/apiTypes";
import {GlobalStateType} from "../../redux/store-redux";
import {getUsersReselect, usersSelectorsSimple} from "./users-selectors";
import {connect} from "react-redux";
import {
    followThunkCreator,
    getUsersThunkCreator,
    setCurrentPage, setOnlyFriends, setTerm,
    unfollowThunkCreator
} from "../../redux/users-reducer";
import React, {ChangeEvent, useEffect, useState} from "react";
import Preloader from "../common/Preloader/Preloader";
import UsersBS from "./UsersBS1";

type MainProps = {
    users: Array<usersType>, // Реселектор users- список пользователей в пачке от сервера
    pageSize: number,// селектор pageSize - количество пользователей на странице
    totalUsersCount: number, // селектор totalUsersCount - общее число пользователей с сервера
    currentPage: number,// селектор currentPage - текущая страница пачки пользователей с сервера
    isFetching: boolean, // селектор isFetching - показать крутилку при загрузке страницы
    followingInProgress: Array<number>, // селектор followingInProgress - массив на кого мы подписались, кнопка неактивна
    isAuth: boolean, // селектор isAuth - флаг авторизации
    term: string,
    onlyFriends: boolean, // селектор получить только моих рузей
    patch: string, // страница из адресной строки
    PageWidth: number // ширина страницы
    setCurrentPage: (currentPage: number) => void,
    getUsersThunkCreator: (currentPage: number, pageSize: number, term: string, friend: boolean, userId: number) => void,
    followThunkCreator: (userId: number, currentPage: number, pageSize: number, term: string, friend: boolean) => void,
    unfollowThunkCreator: (userId: number, currentPage: number, pageSize: number, term: string, friend: boolean) => void,
    setTerm: (term: string) => void,
    setOnlyFriends: (onlyFriends: boolean) => void
}
const UsersContainerFC: React.FC<MainProps> = (
    {
        users, pageSize, totalUsersCount, currentPage, isFetching, followingInProgress,
        isAuth, term, onlyFriends, patch, PageWidth, setCurrentPage,
        getUsersThunkCreator, followThunkCreator, unfollowThunkCreator, setTerm, setOnlyFriends
    }
) => {
    const [onChangeTerm, setOnChangeTerm] = useState<string>( term ) // локальный стейт значения поля ввода input Users
    const [currentRangeLocal, setCurrentRangeLocal] = useState<number>( 1 ) // диапазон страниц пагинации
    const onPageChanged = (setPage: number) => {
        setCurrentPage( setPage );
        getUsersThunkCreator( setPage, pageSize, term, onlyFriends, 0 );
    }
    const followAPI = (id: number) => {
        followThunkCreator( id, currentPage, pageSize, term, onlyFriends )
    }
    const unfollowAPI = (id: number) => {
        unfollowThunkCreator( id, currentPage, pageSize, term, onlyFriends )
    }
    const SetTermFunction = () => {
        setTerm( onChangeTerm ) // задание в стейт поискового запроса
    }
    const onChangeTermFunction = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setOnChangeTerm( event.currentTarget.value ) // задание значения поиска при изменении поля
    }
    const onChangeRangeLocal = (rangeShift: number) => { // rangeShift - смещение диапазона страниц пагинации2
        setCurrentRangeLocal( currentRangeLocal + rangeShift )
    }
    useEffect( () => {
        getUsersThunkCreator( currentPage, pageSize, term, onlyFriends, 0 );
    }, [currentPage, getUsersThunkCreator, onlyFriends, pageSize, term] )

    useEffect( () => {
        setCurrentPage( 1 )// задание в стейт текущей страницы
        setCurrentRangeLocal( 1 ) // перевод диапазона пагинации2 на 1 (сброс)
        getUsersThunkCreator( 1, pageSize, term, onlyFriends, 0 );// получение списка пользователей с поисковым запросом (переключение на 1 страницу)
    }, [term, onlyFriends, getUsersThunkCreator, pageSize, setCurrentPage] )

    return <> {/*использование фрагмента вместо div/span*/}
        {isFetching && <Preloader/>}
        <UsersBS onPageChanged={onPageChanged}
                 totalUsersCount={totalUsersCount}
                 pageSize={pageSize}
                 currentPage={currentPage}
                 users={users}
                 unfollowAPI={unfollowAPI}
                 followAPI={followAPI}
                 followingInProgress={followingInProgress}
                 isAuth={isAuth}
                 SetTermFunction={SetTermFunction}
                 onChangeTerm={onChangeTerm}
                 onChangeTermFunction={onChangeTermFunction}
                 currentRangeLocal={currentRangeLocal}
                 onChangeRangeLocal={onChangeRangeLocal}
                 setOnlyFriends={setOnlyFriends}
                 onlyFriends={onlyFriends}
                 patch={patch}
                 PageWidth={PageWidth}
        />
    </>
}

type mapStateToPropsType = {
    users: Array<usersType>, // Реселектор users- список пользователей в пачке от сервера
    pageSize: number,// селектор pageSize - количество пользователей на странице
    totalUsersCount: number, // селектор totalUsersCount - общее число пользователей с сервера
    currentPage: number,// селектор currentPage - текущая страница пачки пользователей с сервера
    isFetching: boolean, // селектор isFetching - показать крутилку при загрузке страницы
    followingInProgress: Array<number>, // селектор followingInProgress - массив на кого мы подписались, кнопка неактивна
    isAuth: boolean, // селектор isAuth - флаг авторизации
    term: string,
    onlyFriends: boolean, // селектор получить только моих рузей
    patch: string,
    PageWidth: number
}
const mapStateToProps = (state: GlobalStateType) => {
    return {
        users: getUsersReselect( state ), // Реселектор users- список пользователей в пачке от сервера
        pageSize: usersSelectorsSimple.getPageSize( state ),// селектор pageSize - количество пользователей на странице
        totalUsersCount: usersSelectorsSimple.getTotalUsersCount( state ), // селектор totalUsersCount - общее число пользователей с сервера
        currentPage: usersSelectorsSimple.getCurrentPage( state ),// селектор currentPage - текущая страница пачки пользователей с сервера
        isFetching: usersSelectorsSimple.getIsFetching( state ), // селектор isFetching - показать крутилку при загрузке страницы
        followingInProgress: usersSelectorsSimple.getFollowingInProgress( state ), // селектор followingInProgress - массив на кого мы подписались, кнопка неактивна
        isAuth: usersSelectorsSimple.getIsAuth( state ), // селектор isAuth - флаг авторизации
        term: state.usersPage.term,
        onlyFriends: usersSelectorsSimple.getOnlyFriends( state ), // селектор получить только моих рузей
        patch: state.app.patch, // страница из URL
        PageWidth: state.app.PageWidth, // ширина страницы
    }
}
type mapDispatchToPropsType = {
    setCurrentPage: (currentPage: number) => void,
    getUsersThunkCreator: (currentPage: number, pageSize: number, term: string, friend: boolean, userId: number) => void,
    followThunkCreator: (userId: number, currentPage: number, pageSize: number, term: string, friend: boolean) => void,
    unfollowThunkCreator: (userId: number, currentPage: number, pageSize: number, term: string, friend: boolean) => void,
    setTerm: (term: string) => void,
    setOnlyFriends: (onlyFriends: boolean) => void
}
export default connect<mapStateToPropsType,
    mapDispatchToPropsType,
    unknown,
    GlobalStateType>( mapStateToProps,
    {
        setCurrentPage, getUsersThunkCreator, followThunkCreator,
        unfollowThunkCreator, setTerm, setOnlyFriends
    } )( UsersContainerFC );
