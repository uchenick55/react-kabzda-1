import {usersType} from "../api/apiTypes";
import {GlobalStateType} from "../../redux/store-redux";
import {getUsersReselect, usersSelectorsSimple} from "./users-selectors";
import {useDispatch, useSelector} from "react-redux";
import {followThunkCreator, getUsersThunkCreator, unfollowThunkCreator, UsersActions} from "../../redux/users-reducer";
import React, {ChangeEvent, useCallback, useEffect, useMemo, useState} from "react";
import Preloader from "../common/Preloader/Preloader";
import UsersBS from "./UsersBS1";
import {Dialog2Actions} from "../../redux/dialog2-reducer";

const UsersContainerFC: React.FC = ({}) => {

    const users: Array<usersType> = useSelector( getUsersReselect )// Реселектор users- список пользователей в пачке от сервера
    const pageSize: number = useSelector( usersSelectorsSimple.getPageSize )// селектор pageSize - количество пользователей на странице
    const totalUsersCount: number = useSelector( usersSelectorsSimple.getTotalUsersCount )// селектор totalUsersCount - общее число пользователей с сервера
    const currentPage: number = useSelector( usersSelectorsSimple.getCurrentPage )// селектор currentPage - текущая страница пачки пользователей с сервера
    const isFetching: boolean = useSelector( usersSelectorsSimple.getIsFetching )// селектор isFetching - показать крутилку при загрузке страницы
    const followingInProgress: Array<number> = useSelector( usersSelectorsSimple.getFollowingInProgress )// селектор followingInProgress - массив на кого мы подписались, кнопка неактивна
    const isAuth: boolean = useSelector( usersSelectorsSimple.getIsAuth )// селектор isAuth - флаг авторизации
    const onlyFriends: boolean = useSelector( usersSelectorsSimple.getOnlyFriends )// селектор получить только моих рузей
    const term: string = useSelector( (state: GlobalStateType) => state.usersPage.term )// поисковый запрос среди users
    const patch: string = useSelector( (state: GlobalStateType) => state.app.patch )// страница из URL
    const PageWidth: number = useSelector( (state: GlobalStateType) => state.app.PageWidth ) // ширина страницы

    const dispatch = useDispatch()

    const {setCurrentPage, setOnlyFriends, setTerm} = UsersActions // деструктуризация методов ActionCreator

    const {setDialog2InitialState} = Dialog2Actions// деструктуризация методов ActionCreator

    const [onChangeTerm, setOnChangeTerm] = useState<string>( term ) // локальный стейт значения поля ввода input Users
    const [currentRangeLocal, setCurrentRangeLocal] = useState<number>( 1 ) // диапазон страниц пагинации

    const onPageChanged = useCallback( (setPage: number) => {
        dispatch( setCurrentPage( setPage ) );
        dispatch( getUsersThunkCreator( setPage, pageSize, term, onlyFriends, 0 ) );
    },[setCurrentPage, getUsersThunkCreator, pageSize, term, onlyFriends])

    const followAPI = useCallback((id: number) => {
        dispatch( followThunkCreator( id, currentPage, pageSize, term, onlyFriends ) )
    },[followThunkCreator, currentPage, pageSize, term, onlyFriends])

    const unfollowAPI = useCallback((id: number) => {
        dispatch( unfollowThunkCreator( id, currentPage, pageSize, term, onlyFriends ) )
    }, [unfollowThunkCreator, currentPage, pageSize, term, onlyFriends])

    const SetTermFunction = useCallback(  () => {
        dispatch( setTerm( onChangeTerm ) ) // задание в стейт поискового запроса
    },[setTerm, onChangeTerm])

    const onChangeTermFunction = useCallback ((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setOnChangeTerm( event.currentTarget.value ) // задание значения поиска при изменении поля
    },[setOnChangeTerm])

    const onChangeRangeLocal = useCallback ( (rangeShift: number) => { // rangeShift - смещение диапазона страниц пагинации2
        setCurrentRangeLocal( currentRangeLocal + rangeShift )
    }, [setCurrentRangeLocal, currentRangeLocal])

    useEffect( () => {
        dispatch( getUsersThunkCreator( currentPage, pageSize, term, onlyFriends, 0 ) );
    }, [currentPage, getUsersThunkCreator, onlyFriends, pageSize, term] )

    useEffect( () => {
        dispatch( setCurrentPage( 1 ) )// задание в стейт текущей страницы
        setCurrentRangeLocal( 1 ) // перевод диапазона пагинации2 на 1 (сброс)
        dispatch( getUsersThunkCreator( 1, pageSize, term, onlyFriends, 0 ) );// получение списка пользователей с поисковым запросом (переключение на 1 страницу)
    }, [term, onlyFriends, getUsersThunkCreator, pageSize, setCurrentPage] )

    useEffect( () => {
        dispatch( setDialog2InitialState() ) // при переключении со страницы диалогов, занулить стейт диалогов
    }, [setDialog2InitialState] )

    return <> {/*использование фрагмента вместо div/span*/}
        {isFetching && <Preloader/>}
        <UsersBS
            onlyFriends={onlyFriends}
            patch={patch}
            PageWidth={PageWidth}
            pageSize={pageSize}
            totalUsersCount={totalUsersCount}
            currentPage={currentPage}
            isAuth={isAuth}
            onChangeTerm={onChangeTerm}
            currentRangeLocal={currentRangeLocal}

            users={useMemo(()=>users,[users])}
            followingInProgress={useMemo(()=>followingInProgress,[followingInProgress])}

            onPageChanged={onPageChanged }
            unfollowAPI={unfollowAPI}
            followAPI={followAPI}
            SetTermFunction={SetTermFunction}
            onChangeTermFunction={onChangeTermFunction}
            onChangeRangeLocal={onChangeRangeLocal}
            setOnlyFriends={setOnlyFriends}

        />
    </>
}

export default UsersContainerFC

