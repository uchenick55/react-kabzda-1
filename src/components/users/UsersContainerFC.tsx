import {usersType} from "../api/apiTypes";
import {GlobalStateType} from "../../redux/store-redux";
import {getUsersReselect, usersSelectorsSimple} from "./users-selectors";
import {connect} from "react-redux";
import {followThunkCreator, getUsersThunkCreator, unfollowThunkCreator, UsersActions} from "../../redux/users-reducer";
import React, {ChangeEvent, useEffect, useState} from "react";
import Preloader from "../common/Preloader/Preloader";
import UsersBS from "./UsersBS1";
import {Dialog2Actions} from "../../redux/dialog2-reducer";

const UsersContainerFC: React.FC<mapStateToPropsType & mapDispatchToPropsType> = (
    {
        users, pageSize, totalUsersCount, currentPage, isFetching, followingInProgress,
        isAuth, term, onlyFriends, patch, PageWidth, setCurrentPage,
        getUsersThunkCreator, followThunkCreator, unfollowThunkCreator, setTerm, setOnlyFriends,
        setDialog2InitialState
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

    useEffect(()=>{
        setDialog2InitialState()
    }, [setDialog2InitialState])

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

const mapStateToProps = (state: GlobalStateType) => {
    return {
        users: getUsersReselect( state ) as Array<usersType>, // Реселектор users- список пользователей в пачке от сервера
        pageSize: usersSelectorsSimple.getPageSize( state ) as number,// селектор pageSize - количество пользователей на странице
        totalUsersCount: usersSelectorsSimple.getTotalUsersCount( state ) as number, // селектор totalUsersCount - общее число пользователей с сервера
        currentPage: usersSelectorsSimple.getCurrentPage( state ) as number,// селектор currentPage - текущая страница пачки пользователей с сервера
        isFetching: usersSelectorsSimple.getIsFetching( state ) as boolean, // селектор isFetching - показать крутилку при загрузке страницы
        followingInProgress: usersSelectorsSimple.getFollowingInProgress( state ) as Array<number>, // селектор followingInProgress - массив на кого мы подписались, кнопка неактивна
        isAuth: usersSelectorsSimple.getIsAuth( state ) as boolean, // селектор isAuth - флаг авторизации
        term: state.usersPage.term as string, // поисковый запрос среди users
        onlyFriends: usersSelectorsSimple.getOnlyFriends( state ) as boolean, // селектор получить только моих рузей
        patch: state.app.patch as string, // страница из URL
        PageWidth: state.app.PageWidth as number, // ширина страницы
    }
}
type mapStateToPropsType = ReturnType<typeof mapStateToProps>

type mapDispatchToPropsType = {
    setCurrentPage: (currentPage: number) => void, // задать текущую страницу пользователей
    getUsersThunkCreator: (currentPage: number, pageSize: number, term: string, friend: boolean, userId: number) => void, // получить пользователей
    followThunkCreator: (userId: number, currentPage: number, pageSize: number, term: string, friend: boolean) => void, // друг
    unfollowThunkCreator: (userId: number, currentPage: number, pageSize: number, term: string, friend: boolean) => void, // не друг
    setTerm: (term: string) => void, // задать поисковый запрос в стейт
    setOnlyFriends: (onlyFriends: boolean) => void, // поставить флаг - только друзья
    setDialog2InitialState: () => void // занулить весь dialog2 стейт при переходе на страницу users
}

const {setCurrentPage, setOnlyFriends, setTerm} = UsersActions // деструктуризация методов ActionCreator

const {setDialog2InitialState} = Dialog2Actions// деструктуризация методов ActionCreator

export default connect<mapStateToPropsType,
    mapDispatchToPropsType,
    unknown,
    GlobalStateType>( mapStateToProps,
    {
        setCurrentPage, getUsersThunkCreator, followThunkCreator,
        unfollowThunkCreator, setTerm, setOnlyFriends, setDialog2InitialState
    } )( UsersContainerFC );
