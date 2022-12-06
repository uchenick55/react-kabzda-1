import React from 'react';
import Dialogs from "./Dialogs";
import {
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
    componentDidMount() {
        this.getDialogs()
    }

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
        // ЗДЕСЬ ПРОВЕРИТЬ обновилось ли время диалога, если да, то getDialogs()
        // убрать getDialogs из setInterval
    }

    getDialogs = () => {
        const {match, getDialogsThunkCreator} = this.props;// пропсы
        let userID = match.params["*"];// получить локальный userId из URL браузера
        if (userID === "") {return}
        getDialogsThunkCreator(this.props.myID, userID);

    }

    getDialogLastUpdateTime = () => {
        const {match, getDialogLastUpdateTimeTnkCrt} = this.props;// пропсы
        let userID = match.params["*"];// получить локальный userId из URL браузера
        if (userID === "") {return}
        getDialogLastUpdateTimeTnkCrt(this.props.myID, userID);
    }


    sendMessage = (NewMessage) => {
        const {match, sendDialogsThunkCreator} = this.props;// пропсы
        let userID = match.params["*"];// получить локальный userId из URL браузера
        if (userID === "") {
            alert("Выберите диалог")
            // занулить messages2[]
            // занулить

            return
        }
        sendDialogsThunkCreator(NewMessage, this.props.myID, userID);
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
            />
        </div>
    }
}

let mapDispatchToProps  = (dispatch) => {
    return {

        sendDialogsThunkCreator: (formDataNewMessage, myID, userID) => {
            dispatch(sendDialogsThunkCreator(formDataNewMessage, myID, userID))
        },
        getDialogsThunkCreator: (myID, userID) => {
            dispatch(getDialogsThunkCreator(myID, userID))
        },
        setdialogUserID: (dialogUserID) => {
            dispatch(setdialogUserID(dialogUserID))
        },
        setMessages: (updatedMessages) => {
            dispatch(setMessages(updatedMessages))
        },
        getDialogLastUpdateTimeTnkCrt: (myID, userID) => {
            dispatch(getDialogLastUpdateTimeTnkCrt(myID, userID))
        },
        dispatch: dispatch
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

function withRouter (Children) {
    return (props) => {
        let match = {params: useParams()}
        return <Children {...props} match = {match}/>
    }
}
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    NavigateToLoginHoc
)
(DialogsContainer);






















