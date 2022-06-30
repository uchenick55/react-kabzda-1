import React from 'react';
import Dialogs from "./Dialogs";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import StoreContext from "../../StoreContext";
import {connect} from "react-redux";


/*
const DialogsContainer = () => {
    return (
        <StoreContext.Consumer>
            {
                (store)=> {
                    let state = store.getState().dialogsPage;

                    let onSendMessageClick = () => {
                        store.dispatch(sendMessageCreator());
                    };

                    let onNewMessageChange = (body) => {
                        store.dispatch(updateNewMessageBodyCreator(body));
                    };

                    return <Dialogs state={state}
                                    sendMessage={onSendMessageClick}
                                    updateNewMessageBody={onNewMessageChange} />
                }
            }
        </StoreContext.Consumer>
    )
}
*/

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
        state: state.dialogsPage
    }
}
let DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;

