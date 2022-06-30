import React from 'react';
import Dialogs from "./Dialogs";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import StoreContext from "../../StoreContext";

const DialogsContainer = (props) => {
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
export default DialogsContainer;

