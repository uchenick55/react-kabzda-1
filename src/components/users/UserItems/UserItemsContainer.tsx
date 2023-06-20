import UserItems from "./UserItems";
import React from "react";
import {UsersType} from "../../api/apiTypes";
import {useDispatch, useSelector} from "react-redux";
import {getUsersReselect, usersSelectorsSimple} from "../users-selectors";
import {followThunkCreator, unfollowThunkCreator} from "../../../redux/users-reducer";
import {GlobalStateType} from "../../../redux/store-redux";

const UserItemsContainer: React.FC = () => {

    const dispatch = useDispatch()

    const users: Array<UsersType> = useSelector( getUsersReselect )// Реселектор users- список пользователей в пачке от сервера
    const followingInProgress: Array<number> = useSelector( usersSelectorsSimple.getFollowingInProgress )// селектор followingInProgress - массив на кого мы подписались, кнопка неактивна
    const currentPage: number = useSelector( usersSelectorsSimple.getCurrentPage )// селектор currentPage - текущая страница пачки пользователей с сервера
    const isAuth: boolean = useSelector( usersSelectorsSimple.getIsAuth )// селектор isAuth - флаг авторизации
    const patch: string = useSelector( (state: GlobalStateType) => state.app.patch )// страница из URL
    const PageWidth: number = useSelector( (state: GlobalStateType) => state.app.PageWidth ) // ширина страницы

    const unfollowAPI = (id: number) => {
        dispatch( unfollowThunkCreator( id, currentPage ) )
    }

    const followAPI = (id: number) => {
        dispatch( followThunkCreator( id, currentPage) )
    }

    return <div className='my-4'> {/*отрисовка самих карточек пользователей*/}
            <UserItems users={users}
                       unfollowAPI={unfollowAPI}
                       followAPI={followAPI}
                       followingInProgress={followingInProgress}
                       isAuth={isAuth}
                       patch={patch}
                       PageWidth={PageWidth}/>
            {/*отрисовка Users*/}
    </div>
}
export default UserItemsContainer
