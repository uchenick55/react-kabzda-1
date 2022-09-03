import React from 'react';
import Dialogs from "./Dialogs";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";

class DialogsContainer extends React.Component {
    render () {
        if (!this.props.isAuth) {
            return <Navigate to="/login" />
        }
        return <Dialogs {...this.props} />
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

//+++