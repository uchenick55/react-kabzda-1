import React from 'react';
import {connect} from "react-redux";
import {
    followThunkCreator,
    getUsersThunkCreator,
    setCurrentPage, setTerm, unfollowThunkCreator,
} from "../../redux/users-reducer";
import UsersBS from "./UsersBS";
import Preloader from "../common/Preloader/Preloader";
import {getUsersReselect, usersSelectorsSimple} from "./users-selectors";

class UsersAPI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            onChangeTerm: this.props.term, // задание поискового запроса в локальный стейт обновления поля
            currentRangeLocal: 1 // текущий диапазон 
        }
    }

    componentDidMount() {
        const {getUsersThunkCreator, currentPage, pageSize, term, onlyFriends} = this.props; // данные из пропсов для получения пользователей по умолчанию
        getUsersThunkCreator(currentPage, pageSize, term, onlyFriends);
    }
    onChangeTermFunction = (event) => {
        this.setState({onChangeTerm: event.currentTarget.value }) // задание значения поиска при изменении поля
    }
    onChangeRangeLocal = (rangeShift) => { // rangeShift - смещение диапазона страниц пагинации2
        this.setState({currentRangeLocal: this.state.currentRangeLocal + rangeShift })

    }
    SetTermFunction = () => {
        this.props.setTerm(this.state.onChangeTerm) // задание в стейт поискового запроса
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.term !== this.props.term) {
            this.props.setCurrentPage(1)// задание в стейт текущей страницы
            this.setState({currentRangeLocal: 1}) // перевод диапазона пагинации2 на 1 (сброс)
            const {getUsersThunkCreator, pageSize, term, onlyFriends } = this.props; // получение из проспсов данные для запроса
            getUsersThunkCreator(1, pageSize, term, onlyFriends );// получение списка пользователей с поисковым запросом (переключение на 1 страницу)
        }
    }


    onPageChanged = (setPage) => {
        const {setCurrentPage, getUsersThunkCreator, pageSize, term, onlyFriends } = this.props;
        setCurrentPage(setPage, );
        getUsersThunkCreator(setPage, pageSize, term, onlyFriends );
    }
    followAPI = (id) => {
        this.props.followThunkCreator(id, this.props.currentPage,this.props.pageSize, this.props.term, this.props.onlyFriends)
    }
    unfollowAPI = (id) => {
        this.props.unfollowThunkCreator(id, this.props.currentPage,this.props.pageSize, this.props.term, this.props.onlyFriends)
    }
    render() {
        const {isFetching, totalUsersCount, pageSize, currentPage, users, followingInProgress, isAuth} = this.props;
        return <> {/*использование фрагмента вместо div/span*/}
            {isFetching && <Preloader/>}
            <UsersBS onPageChanged={this.onPageChanged}
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
                     currentRangeLocal= {this.state.currentRangeLocal}
                     onChangeRangeLocal = {this.onChangeRangeLocal}
                     myId ={this.props.myId}
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
        term: state.usersPage.term,
        myId: state.auth.myId,
        onlyFriends: usersSelectorsSimple.getOnlyFriends(state), // селектор получить только моих рузей
    }
}

export let UsersContainer = connect(mapStateToProps,
    { setCurrentPage,
        getUsersThunkCreator, followThunkCreator, unfollowThunkCreator, setTerm})(UsersAPI);

//export default UsersContainer;












