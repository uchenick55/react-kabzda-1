import React from 'react';
import Dialogs from "./Dialogs";
import {
    deleteMessageThunkCreator,
    getDialogLastUpdateTimeTnkCrt,
    getDialogsThunkCreator, getFollowThunkCreator, getMyDialogListThunkCreator,
    sendDialogsThunkCreator,
    setdialogUserID,
    setMessages
} from "../../redux/dialogs-reducer";
import {connect} from "react-redux";
import {NavigateToLoginHoc} from "../hoc/NavigateToLoginHoc";
import {compose} from "redux";
import {bedug_mode} from "../../redux/store-redux";
import {useParams} from "react-router";
import {getProfileThunkCreator} from "../../redux/profile-reducer";

class DialogsContainer extends React.Component {
    commonPartMountUpdate = () => {// общая часть для componentDidMount и componentDidUpdate
        if (this.props.userID === "") { // если перешли на вкладку Dialogs с нулевым userID
            if (this.props.messages2.length>0) { // если массив сообщений непустой
                this.props.setMessages([]); // занулить массив сообщений (очистить список сообщений)
                this.props.setdialogUserID(null) // занулить userID (убрать выделение диалога)
            }
            return
        }
        if ( this.props.dialogUserID!==this.props.userID) { // если считаный из URL userID не равен тому, что в BLL
            this.props.setdialogUserID(this.props.userID) // задать в BLL считаный из URL ID
            //здесь запросить профиль выбранного userId через getProfileThunkCreator
            this.props.getProfileThunkCreator(this.props.userID)// при переходе в диалог любого пользователя считать его данные профиля с сервера
        }

    }
    componentDidMount() {
        this.getDialogList()
  //      console.log("DialogsContainer -> componentDidMount")
        this.commonPartMountUpdate();// общая часть для componentDidMount и componentDidUpdate
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
 //       console.log("DialogsContainer -> componentDidUpdate")
        this.commonPartMountUpdate(); // общая часть для componentDidMount и componentDidUpdate
        if  (this.props.dialogLastUpdateTime!==prevProps.dialogLastUpdateTime) { // если время обновления диалога изменилось
            this.getDialogs()// запросить новые сообщения по диалогу
        }
    }

    getDialogs = () => {
        const {match, getDialogsThunkCreator} = this.props;// пропсы
        if (this.props.userID === "") {return}// при клике просто по вкладке Dialogs
        this.props.getDialogsThunkCreator(this.props.myID, this.props.userID);// получить диалоги
    }

    getDialogLastUpdateTime = () => {
        if (this.props.userID === "") {return}// при клике просто по вкладке Dialogs
        this.props.getDialogLastUpdateTimeTnkCrt(this.props.myID, this.props.userID); // получить время последенего обновления диалога

    }

    getDialogList = () => {
        this.props.getMyDialogListThunkCreator(this.props.myID)
    }

    sendMessage = (NewMessage) => {
        let profilePage = this.props.profilePage
        let userName = 0
        let userPhoto = 0
        if (profilePage!==null) {
            userName = this.props.profilePage.profile.fullName;
            userPhoto = this.props.profilePage.profile.photos.small;
        }

        if (!this.props.userID) { // при клике просто по вкладке Dialogs
            alert("Выберите диалог") // предупреждение если диалог не выбран
            return
        }

        this.props.sendDialogsThunkCreator(

            NewMessage,
            this.props.auth.myID, // мой ID для формирования DialogList собеседника
            this.props.auth.myLogin, // мой логин  для формирования DialogList собеседника
            this.props.auth.myProfile.photos.small, // мое фото  для формирования DialogList собеседника
            this.props.userID, // ID собеседника для формирования моего DialogList
            userName, // имя собеседника для формирования моего DialogList
            userPhoto, // фотос обеседника для формирования моего DialogList
        ); // отправить сообщение
           // formDataNewMessage, myID, MyName, MyPhoto, userID, userName, userPhoto
    }

    deleteMessage = (messageID) => {
        this.props.deleteMessageThunkCreator(messageID, this.props.myID, this.props.userID);
    }

    render () {
        return <div>
            <Dialogs
                messages2 ={this.props.messages2}// массив сообщений текущего диалога
                dialogs ={this.props.dialogs} // список диалогов
                dialogs2 ={this.props.dialogs2} // список диалогов с LocalStorage
                {...this.props} // все входящие пропсы пробросили дальше
                sendMessage={this.sendMessage} // проброс местного метода отправки сообщений
                getDialogs={this.getDialogs}  // проброс местного метода получить диалоги
                getDialogLastUpdateTime={this.getDialogLastUpdateTime} // проброс метода - получить время обновления текущего диалога
                myID={this.props.myID}
                deleteMessage = {this.deleteMessage}
            />
        </div>
    }
}

let mapDispatchToProps  = (dispatch) => {
    return {

        sendDialogsThunkCreator: (formDataNewMessage, myID, MyName, MyPhoto, userID, userName, userPhoto) => { // отправить сообщение
            dispatch(sendDialogsThunkCreator(formDataNewMessage, myID, MyName, MyPhoto, userID, userName, userPhoto))
        },
        getDialogsThunkCreator: (myID, userID) => { // получить данные по текущему диалогу
            dispatch(getDialogsThunkCreator(myID, userID))
        },
        setdialogUserID: (dialogUserID) => { // задать ID собеседника в BLL
            dispatch(setdialogUserID(dialogUserID))
        },
        setMessages: (updatedMessages) => { // задать сообщения напрямую (для зануления)
            dispatch(setMessages(updatedMessages))
        },
        getDialogLastUpdateTimeTnkCrt: (myID, userID) => { // получить время последнего обновления текущего диалога
            dispatch(getDialogLastUpdateTimeTnkCrt(myID, userID))
        },
        deleteMessageThunkCreator: (messageID, myID, userID) => { // удалить сообщение из диалога
            dispatch(deleteMessageThunkCreator(messageID, myID, userID))
        },
        getProfileThunkCreator: (dialogUserID) => { // удалить сообщение из диалога
            dispatch(getProfileThunkCreator(dialogUserID))
        },
        getFollowThunkCreator: (dialogUserID) => { // удалить сообщение из диалога
            dispatch(getFollowThunkCreator(dialogUserID))
        },
        getMyDialogListThunkCreator: (myID) => { // удалить сообщение из диалога
            dispatch(getMyDialogListThunkCreator(myID))
        },
        dispatch: dispatch // для зануления redux-form
    }
}
//getMyDialogListThunkCreator
let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth, // флаг, авторизован ли я сейчас,
        myID: state.auth.myID, // мой ID (авторизованного пользователя)
        dialogUserID: state.dialogsPage.dialogUserID, // ID пользователя, с кем сейчас идет диалог
        messages2: state.dialogsPage.messages2, // массив сообщений текущего диалога
        dialogs: state.dialogsPage.dialogs, // список диалогов
        dialogLastUpdateTime: state.dialogsPage.dialogLastUpdateTime,// время последнего времени обновления текущего диалога
        dialogs2: state.dialogsPage.dialogs2, // список диалогов с LocalStorage

        profilePage:state.profilePage, // страница профиля пользователя для создания dialogList
        auth: state.auth,// страница моего профиля для создания dialogList
    }
}

function withRouter (Children) { // функция получения данных из URL браузера
    return (props) => {
        let match = {params: useParams()} // получить данные ID из URL браузера
        let userID = Number(match.params["*"]); // получить локальный userId из URL браузера
        return <Children {...props} match = {match} userID={userID}/>// добавить данные в оборачиваемую компоненту
    }
}
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter, // получить данные ID из URL браузера и добавить в пропсы
    NavigateToLoginHoc // проверка, залогинен ли я
)
(DialogsContainer);






















