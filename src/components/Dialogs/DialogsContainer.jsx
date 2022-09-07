import React from 'react';
import Dialogs from "./Dialogs";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import {connect} from "react-redux";
import IsAuthCheckToLogin from "../api/isAuthCheckToLogin";

class DialogsContainer extends React.Component {
    render () {
        return <div>
            <IsAuthCheckToLogin/>
            <Dialogs {...this.props} />
        </div>
    }
}

let mapDispatchToProps  = (dispatch) => {
    return {
        sendMessage: () => {
            dispatch(sendMessageCreator())
        },
        updateNewMessageBody: (body) => {
            dispatch(updateNewMessageBodyCreator(body))
        }
    }
}

let mapStateToProps = (state) => {
    return {
        state: state.dialogsPage,
        isAuth: state.auth.isAuth
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DialogsContainer);

