import PaginationByCourse from "./PaginationByCourseBS";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {usersSelectorsSimple} from "../../users/users-selectors";
import {getUsersThunkCreator, UsersActions} from "../../../redux/users-reducer";
import {GlobalStateType} from "../../../redux/store-redux";

const PaginationContainer:React.FC = () => {

    const dispatch = useDispatch()

    const {setCurrentPage} = UsersActions // деструктуризация методов ActionCreator

    const totalUsersCount: number = useSelector( usersSelectorsSimple.getTotalUsersCount )// селектор totalUsersCount - общее число пользователей с сервера
    const pageSize: number = useSelector( usersSelectorsSimple.getPageSize )// селектор pageSize - количество пользователей на странице
    const currentPage: number = useSelector( usersSelectorsSimple.getCurrentPage )// селектор currentPage - текущая страница пачки пользователей с сервера
    const term: string = useSelector( (state: GlobalStateType) => state.usersPage.term )// поисковый запрос среди users
    const onlyFriends: boolean = useSelector( usersSelectorsSimple.getOnlyFriends )// селектор получить только моих рузей

    const [currentRangeLocal, setCurrentRangeLocal] = useState<number>( 1 ) // диапазон страниц пагинации

    const onChangeRangeLocal = (rangeShift: number) => { // rangeShift - смещение диапазона страниц пагинации2
        setCurrentRangeLocal( currentRangeLocal + rangeShift )
    }

    const onPageChanged =  (page: number) => {
        dispatch( setCurrentPage( page ) );
        dispatch( getUsersThunkCreator( page ) );
    }
    return <div>
        <PaginationByCourse
            totalUsersCount={totalUsersCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChanged={onPageChanged}
            currentRangeLocal={currentRangeLocal}
            onChangeRangeLocal={onChangeRangeLocal}
        />
    </div>
}
export default PaginationContainer
