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
        if (this.props.userID === "") { // если перешли на вкладку Dialogs с нулевым userID
            if (this.props.messages2.length>0) { // если массив сообщений непустой
                this.props.setMessages([]); // занулить массив сообщений (очистить список сообщений)
                this.props.setdialogUserID(null) // занулить userID (убрать выделение диалога)
            }
            return
        }
        if ( this.props.dialogUserID!==this.props.userID) { // если считаный из URL userID не равен тому, что в BLL
            this.props.setdialogUserID(this.props.userID) // задать в BLL считаный из URL ID
        }
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

    sendMessage = (NewMessage) => {
        if (!this.props.userID) { // при клике просто по вкладке Dialogs
            alert("Выберите диалог") // предупреждение если диалог не выбран
            return
        }
        this.props.sendDialogsThunkCreator(NewMessage, this.props.myID, this.props.userID); // отправить сообщение
    }

    deleteMessage = (messageID) => {
        this.props.deleteMessageThunkCreator(messageID, this.props.myID, this.props.userID);
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






















