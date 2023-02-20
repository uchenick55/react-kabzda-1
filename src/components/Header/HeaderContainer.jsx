import React from 'react';
import Header from "./HeaderBS";
import {connect} from "react-redux";
import {deleteLoginThunkCreator} from "../../redux/auth-reducer";
import {getProfileThunkCreator} from "../../redux/profile-reducer";
import {getInfoModeThunkCreator, setInfoMode, setInfoModeThunkCreator} from "../../redux/app-reducer";
import ErrorBoundary from "../common/ErrorBoundary/ErrorBoundary";
import {compose} from "redux";


class HeaderContainer extends React.Component {
    componentDidMount() {
        this.props.getInfoModeThunkCreator() // считыаем с localStorage флаг комментариев по сайту
    }

    deleteLogin = () => {
        this.props.deleteLoginThunkCreator()// логаут текущего пользователя
    }
    switchInfo = () => {
        let info_modeLocal = !this.props.info_mode // меняем infoMode на противоположный и отправляем в localStorage
        this.props.setInfoModeThunkCreator(info_modeLocal) // задать infoMode в localStorage

    }
    goToMyPage = () => {
        getProfileThunkCreator(this.props.myId); //получить профиль по моему ID
    }

    render() {
        return <ErrorBoundary> {/*Локальный обработчик ошибок Header*/}
            <Header
                {...this.props}
                deleteLogin={this.deleteLogin}
                switchInfo={this.switchInfo}
                goToMyPage={this.goToMyPage}
            /> {/*отрисовка целевой компоненты*/}
        </ErrorBoundary>
    }
}

let mapStateToProps = (state) => {
    return {
        myLogin: state.auth.myLogin,
        myId: state.auth.myId,
        isAuth: state.auth.isAuth,
        myProfile: state.auth.myProfile,
        info_mode: state.app.info_mode,
    }
}
export default compose(
    connect(mapStateToProps,
        {
            getProfileThunkCreator,
            deleteLoginThunkCreator,
            setInfoMode,
            setInfoModeThunkCreator,
            getInfoModeThunkCreator
        }),

)(HeaderContainer)


/*zds

export default compose(
    connect(mapStateToProps,
        {
        //    sendDialogsThunkCreator,//санкреатор отправки нового сообщения в диалог
            getDialogsThunkCreator,//санкреатор получения диалогов с данными
            setdialogUserID, // экшнкреатор задания списка сообщений в стейт messages2
            setMessages,// экшнкреатор задания списка сообщений в стейт messages2
            getDialogLastUpdateTimeTnkCrt,//санкреатор получения диалогов с данными
         //   deleteMessageThunkCreator,//санкреатор удаления сообщения из далога
            getProfileThunkCreator,// санкреатор на получение профиля выбранного пользователя
            getFollowThunkCreator,//санкреатор проверки follow/unfollow выбранного юзера для составления списка диалогов
            getMyDialogListThunkCreator,//санкреатор получения моего диалогЛиста
          //  updateDialogListThunkCreator,//санкреатор обновления диалогЛиста (моего когда я пишу кому то сообщение) - запись в localStorage.
            deleteDialogThunkCreator, //санкреатор удаления диалога из диалогЛиста
        }
    ),
    withRouter2,// получить данные ID из URL браузера и добавить в пропсы
    NavigateToLoginHoc2 // проверка, залогинен ли я
)



fzsdfg*/





