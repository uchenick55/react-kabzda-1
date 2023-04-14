import React, {ChangeEvent} from 'react';
import {connect} from "react-redux";
import {
    followThunkCreator,
    getUsersThunkCreator,
    setCurrentPage, setOnlyFriends, setTerm, unfollowThunkCreator,
} from "../../redux/users-reducer";
import UsersBS from "./UsersBS1";
import Preloader from "../common/Preloader/Preloader";
import {getUsersReselect, usersSelectorsSimple} from "./users-selectors";
import {usersType} from "../api/apiTypes";
import {GlobalStateType} from "../../redux/store-redux";
import {NulableType} from "../../types/commonTypes";

//type MainProps =  mapStateToPropsType | mapDispatchToPropsType
type MainProps =  {
    users: Array<usersType>, // Реселектор users- список пользователей в пачке от сервера
    pageSize: number,// селектор pageSize - количество пользователей на странице
    totalUsersCount: number, // селектор totalUsersCount - общее число пользователей с сервера
    currentPage: number,// селектор currentPage - текущая страница пачки пользователей с сервера
    isFetching: boolean, // селектор isFetching - показать крутилку при загрузке страницы
    followingInProgress: Array<number>, // селектор followingInProgress - массив на кого мы подписались, кнопка неактивна
    isAuth: boolean, // селектор isAuth - флаг авторизации
    term: string,
    myId: number,
    onlyFriends: boolean, // селектор получить только моих рузей
    setCurrentPage:(currentPage: number)=>void,
    getUsersThunkCreator:(currentPage: number, pageSize: number, term: string, friend: boolean, userId: number)=>void,
    followThunkCreator:(userId: number, currentPage: number, pageSize: number, term: string, friend: boolean)=>void,
    unfollowThunkCreator:(userId: number, currentPage: number, pageSize: number, term: string, friend: boolean)=>void,
    setTerm:(term: string)=>void,
    setOnlyFriends:(onlyFriends: boolean)=>void
}

type MainState = {
    onChangeTerm: string, // задание поискового запроса в локальный стейт обновления поля
    currentRangeLocal: number // текущий диапазон
}
class UsersAPI extends React.Component<MainProps, MainState> {
    constructor(props: any) {
        super(props);
        this.state = {
            onChangeTerm: this.props.term, // задание поискового запроса в локальный стейт обновления поля
            currentRangeLocal: 1 // текущий диапазон
        }
    }

    componentDidMount() {
        const {
            getUsersThunkCreator, currentPage, pageSize, term, onlyFriends} = this.props; // данные из пропсов для получения пользователей по умолчанию
        getUsersThunkCreator( currentPage, pageSize, term, onlyFriends, 0);
    }
    onChangeTermFunction = (event: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        this.setState({onChangeTerm: event.currentTarget.value }) // задание значения поиска при изменении поля
    }
    onChangeRangeLocal = (rangeShift:number) => { // rangeShift - смещение диапазона страниц пагинации2
        this.setState({currentRangeLocal: this.state.currentRangeLocal + rangeShift })

    }
    SetTermFunction = () => {
        this.props.setTerm(this.state.onChangeTerm) // задание в стейт поискового запроса
    }

    componentDidUpdate(prevProps:MainProps, prevState:MainState) {
        if (prevProps.term !== this.props.term || prevProps.onlyFriends !== this.props.onlyFriends) {
            this.props.setCurrentPage(1)// задание в стейт текущей страницы
            this.setState({currentRangeLocal: 1}) // перевод диапазона пагинации2 на 1 (сброс)
            const {getUsersThunkCreator, pageSize, term, onlyFriends } = this.props; // получение из проспсов данные для запроса
            getUsersThunkCreator(1, pageSize, term, onlyFriends, 0);// получение списка пользователей с поисковым запросом (переключение на 1 страницу)
        }
    }

    onPageChanged = (setPage:number) => {
        const {setCurrentPage, getUsersThunkCreator, pageSize, term, onlyFriends } = this.props;
        setCurrentPage(setPage, );
        getUsersThunkCreator(setPage, pageSize, term, onlyFriends, 0 );
    }
    followAPI = (id:number) => {
        this.props.followThunkCreator(id, this.props.currentPage,this.props.pageSize, this.props.term, this.props.onlyFriends)
    }
    unfollowAPI = (id:number) => {
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
                     setOnlyFriends={this.props.setOnlyFriends}
                     onlyFriends={this.props.onlyFriends}
            />
        </>
    }
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
    myId: NulableType<number>,
    onlyFriends: boolean, // селектор получить только моих рузей
}
let mapStateToProps = (state:GlobalStateType) => {
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

type mapDispatchToPropsType = {
    setCurrentPage:(currentPage: number)=>void,
    getUsersThunkCreator:(currentPage: number, pageSize: number, term: string, friend: boolean, userId: number)=>void,
    followThunkCreator:(userId: number, currentPage: number, pageSize: number, term: string, friend: boolean)=>void,
    unfollowThunkCreator:(userId: number, currentPage: number, pageSize: number, term: string, friend: boolean)=>void,
    setTerm:(term: string)=>void,
    setOnlyFriends:(onlyFriends: boolean)=>void
}
export let UsersContainer = connect<
    mapStateToPropsType,
    mapDispatchToPropsType,
    unknown,
    GlobalStateType
>(mapStateToProps,
    { setCurrentPage, getUsersThunkCreator, followThunkCreator,
        unfollowThunkCreator, setTerm, setOnlyFriends})(UsersAPI);
