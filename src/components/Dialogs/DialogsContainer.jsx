import React from 'react';
import Dialogs from "./Dialogs";
import {sendMessageCreator, sendDialogsThunkCreator} from "../../redux/dialogs-reducer";
import {connect} from "react-redux";
import {NavigateToLoginHoc} from "../hoc/NavigateToLoginHoc";
import {compose} from "redux";
import {bedug_mode} from "../../redux/store-redux";

class DialogsContainer extends React.Component {
    render () {
        return <div>
            <Dialogs {...this.props} />
        </div>
    }
}

let mapDispatchToProps  = (dispatch) => {
    return {
        sendDialogsThunkCreator: (formDataNewMessage, myID) => {
            dispatch(sendDialogsThunkCreator(formDataNewMessage, myID))
        }
    }
}

let mapStateToProps = (state) => {
    return {
        state: state.dialogsPage,
        isAuth: state.auth.isAuth,
        myID: state.auth.myID,
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    NavigateToLoginHoc
)
(DialogsContainer);
/*
export default connect(mapStateToProps, mapDispatchToProps)(NavigateToLoginHoc(DialogsContainer));
*/





















