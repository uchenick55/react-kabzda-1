import React from 'react';
import Dialogs from "./Dialogs";
import {
    deleteMessageThunkCreator,
    getDialogLastUpdateTimeTnkCrt,
    getDialogsThunkCreator,
    sendDialogsThunkCreator,
    setdialogUserID,
    setMessages
} from "../../redux/dialogs-reducer";
import {connect} from "react-redux";
import {NavigateToLoginHoc} from "../hoc/NavigateToLoginHoc";
import {compose} from "redux";
import {bedug_mode} from "../../redux/store-redux";
import {useParams} from "react-router";

class DialogsContainer extends React.Component {

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("DialogsContaine -> componentDidUpdate")
        const {match, setdialogUserID, dialogUserID, myID} = this.props;// пропсы
        let userID = match.params["*"];// получить локальный userId из URL браузера
        if (userID === "") { // если перешли на вкладку Dialogs с нулевым userID
            if (this.props.messages2.length>0) { // если массив сообщений непустой
                this.props.setMessages([]); // занулить массив сообщений (очистить список сообщений)
                setdialogUserID(null) // занулить userID (убрать выделение диалога)
            }
            return
        }
        if (dialogUserID!==userID) { // если считаный из URL userID не равен тому, что в BLL
            setdialogUserID(userID) // задать в BLL считаный из URL ID
        }
        if  (this.props.dialogLastUpdateTime!==prevProps.dialogLastUpdateTime) { // если время обновления диалога изменилось
            this.getDialogs()// запросить новые сообщения по диалогу
        }
    }

    getDialogs = () => {
        const {match, getDialogsThunkCreator} = this.props;// пропсы
        let userID = match.params["*"];// получить локальный userId из URL браузера
        if (userID === "") {return}// при клике просто по вкладке Dialogs
        getDialogsThunkCreator(this.props.myID, userID);// получить диалоги
    }

    getDialogLastUpdateTime = () => {
        const {match, getDialogLastUpdateTimeTnkCrt} = this.props;// пропсы
        let userID = match.params["*"];// получить локальный userId из URL браузера
        if (userID === "") {return}// при клике просто по вкладке Dialogs
        getDialogLastUpdateTimeTnkCrt(this.props.myID, userID); // получить время последенего обновления диалога
    }

    sendMessage = (NewMessage) => {
        const {match, sendDialogsThunkCreator} = this.props;// пропсы
        let userID = match.params["*"];// получить локальный userId из URL браузера
        if (userID === "") { // при клике просто по вкладке Dialogs
            alert("Выберите диалог") // предупреждение если диалог не выбран
            return
        }
        sendDialogsThunkCreator(NewMessage, this.props.myID, userID); // отправить сообщение
    }

    deleteMessage = (messageID) => {
        const {match, deleteMessageThunkCreator} = this.props;// пропсы
        let userID = match.params["*"];// получить локальный userId из URL браузера
        if (userID === "") { // при клике просто по вкладке Dialogs
            alert("Выберите диалог") // предупреждение если диалог не выбран
            return
        }
        //alert(messageID)
        deleteMessageThunkCreator(messageID, this.props.myID, userID);
    }

    render () {
        return <div>
            <Dialogs
                messages2 ={this.props.messages2}// массив сообщений текущего диалога
                dialogs ={this.props.dialogs} // список диалогов
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

        sendDialogsThunkCreator: (formDataNewMessage, myID, userID) => { // отправить сообщение
            dispatch(sendDialogsThunkCreator(formDataNewMessage, myID, userID))
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
        dispatch: dispatch // для зануления redux-form
    }
}
let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth, // флаг, авторизован ли я сейчас,
        myID: state.auth.myID, // мой ID (авторизованного пользователя)
        dialogUserID: state.dialogsPage.dialogUserID, // ID пользователя, с кем сейчас идет диалог
        messages2: state.dialogsPage.messages2, // массив сообщений текущего диалога
        dialogs: state.dialogsPage.dialogs, // список диалогов
        dialogLastUpdateTime: state.dialogsPage.dialogLastUpdateTime,// время последнего времени обновления текущего диалога
    }
}

function withRouter (Children) { // функция получения данных из URL браузера
    return (props) => {
        let match = {params: useParams()} // получить данные ID из URL браузера
        return <Children {...props} match = {match}/>// добавить данные в оборачиваемую компоненту
    }
}
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter, // получить данные ID из URL браузера и добавить в пропсы
    NavigateToLoginHoc // проверка, залогинен ли я
)
(DialogsContainer);






















