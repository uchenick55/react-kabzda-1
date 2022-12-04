import React from 'react';
import Dialogs from "./Dialogs";
import {getDialogsThunkCreator, sendDialogsThunkCreator} from "../../redux/dialogs-reducer";
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
        dispatch: dispatch
    }
}

let mapStateToProps = (state) => {
    return {
        state: state.dialogsPage,
        isAuth: state.auth.isAuth,
        myID: state.auth.myID,
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
/*
export default connect(mapStateToProps, mapDispatchToProps)(NavigateToLoginHoc(DialogsContainer));

function withRouter (Children) {
    return (props) => {
        let match = {params: useParams()}
        return <Children {...props} match = {match}/>
    }
}

export default compose(
    connect(mapStateToProps, {getProfileThunkCreator, putStatusThunkCreator}),
    withRouter,
    NavigateToLoginHoc
)
(ProfileContainer)
*/





















