import React from 'react';
import classes from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";


const Dialogs = (props) => {
    let state = props.store.getState().dialogsPage;
    let dialogElements =
        state.dialogs.map((d) => {
                return (
                    <DialogItem name={d.name} id={d.id} avaSrc={d.avaSrc}/>
                )
            }
        );
    let messagesElements =
        state.messages.map((m) => {
            return <Message message={m.message}/>
        });

    let newMessageBody = state.newMessageBody;

    let onNewMessageChange = (event) => {
        let body = event.target.value;
        props.store.dispatch(updateNewMessageBodyCreator(body));
    };

    let onSendMessageClick = () => {
        props.store.dispatch(sendMessageCreator());
    };

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogItems}>
                {dialogElements}
            </div>

            <div className={classes.messages}>
                <div>
                    {messagesElements}
                    <textarea onChange={onNewMessageChange} value={newMessageBody} placeholder={"type your text here"}/>
                    <div>
                        <button onClick={onSendMessageClick} >Press here</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Dialogs;

