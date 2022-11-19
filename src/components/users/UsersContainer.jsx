import React from 'react';
import {connect} from "react-redux";
import {
    followThunkCreator,
    getUsersThunkCreator,
    setCurrentPage, setTerm, unfollowThunkCreator,
} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {getUsersReselect, usersSelectorsSimple} from "./users-selectors";

class UsersAPI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            onChangeTerm: this.props.term // задание поискового запроса в локальный стейт обновления поля
        }
    }

    componentDidMount() {
        const {getUsersThunkCreator, currentPage, pageSize, term } = this.props; // данные из пропсов для получения пользователей по умолчанию
        getUsersThunkCreator(currentPage, pageSize, term);
    }
    onChangeTermFunction = (event) => {
        this.setState({onChangeTerm: event.currentTarget.value }) // задание значения поиска при изменении поля
    }
    SetTermFunction = () => {
        this.props.setTerm(this.state.onChangeTerm) // задание в стейт поискового запроса
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.term != this.props.term) {
            this.props.setCurrentPage(1)// задание в стейт текущей страницы
            const {getUsersThunkCreator, pageSize, term } = this.props; // получение из проспсов данные для запроса
            getUsersThunkCreator(1, pageSize, term);// получение списка пользователей с поисковым запросом (переключение на 1 страницу)
        }
    }


    onPageChanged = (setPage) => {
        const {setCurrentPage, getUsersThunkCreator, pageSize, term } = this.props;
        setCurrentPage(setPage, );
        getUsersThunkCreator(setPage, pageSize, term );
    }
    followAPI = (id) => {
        this.props.followThunkCreator(id, this.props.currentPage,this.props.pageSize, this.props.term)
    }
    unfollowAPI = (id) => {
        this.props.unfollowThunkCreator(id, this.props.currentPage,this.props.pageSize, this.props.term)
    }
    render() {
        const {isFetching, totalUsersCount, pageSize, currentPage, users, followingInProgress, isAuth, setTerm} = this.props;
        return <>
            {isFetching ? <Preloader/> : null}
            <Users onPageChanged={this.onPageChanged}
                   totalUsersCount={totalUsersCount}
                   pageSize={pageSize}
                   currentPage={currentPage}
                   users={users}
                   unfollowAPI={this.unfollowAPI}
                   followAPI={this.followAPI}
                   followingInProgress={followingInProgress}
                   isAuth={isAuth}
                   SetTermFunction = {this.SetTermFunction}
                   onChangeTerm = {this.state.onChangeTerm}
                   onChangeTermFunction = {this.onChangeTermFunction}
            />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsersReselect(state), // Реселектор users- список пользователей в пачке от сервера
        pageSize: usersSelectorsSimple.getPageSize(state),// селектор pageSize - количество пользователей на странице
        totalUsersCount: usersSelectorsSimple.getTotalUsersCount(state), // селектор totalUsersCount - общее число пользователей с сервера
        currentPage: usersSelectorsSimple.getCurrentPage(state),// селектор currentPage - текущая страница пачки пользователей с сервера
        isFetching: usersSelectorsSimple.getIsFetching(state), // селектор isFetching - показать крутилку при загрузке страницы
        followingInProgress: usersSelectorsSimple.getFollowingInProgress(state), // селектор followingInProgress - массив на кого мы подписались, кнопка неактивна
        isAuth: usersSelectorsSimple.getIsAuth(state), // селектор isAuth - флаг авторизации
        term: state.usersPage.term
    }
}

let UsersContainer = connect(mapStateToProps,
    { setCurrentPage,
        getUsersThunkCreator, followThunkCreator, unfollowThunkCreator, setTerm})(UsersAPI);

export default UsersContainer;












