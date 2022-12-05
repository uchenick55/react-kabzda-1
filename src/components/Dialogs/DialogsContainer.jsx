import React from 'react';
import Dialogs from "./Dialogs";
import {
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
import CheckNewDialogData from "../api/checkNewDialogData";

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
            return CheckNewDialogData(myID, userID) // переход на проверку появления новых данных сообщений в LocalStorage
        }
    }

    getDialogs = () => {
        const {match, getDialogsThunkCreator} = this.props;// пропсы
        let userID = match.params["*"];// получить локальный userId из URL браузера
        if (userID === "") {return}
        getDialogsThunkCreator(this.props.myID, userID);

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
            <Dialogs {...this.props} sendMessage={this.sendMessage} getDialogs={this.getDialogs}/>
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
        dispatch: dispatch
    }
}
let mapStateToProps = (state) => {
    return {
        state: state.dialogsPage,
        isAuth: state.auth.isAuth,
        myID: state.auth.myID,
        dialogUserID: state.dialogsPage.dialogUserID,
        messages2: state.dialogsPage.messages2,
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






















