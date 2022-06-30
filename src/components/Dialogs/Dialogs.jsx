import React from 'react';
import classes from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

const Dialogs = (props) => {

    let dialogElements = props.state.dialogs.map((d) =>
        <DialogItem name={d.name} id={d.id} avaSrc={d.avaSrc}/>);

    let messagesElements = props.state.messages.map((m) =>
        <Message message={m.message}/> );

    let newMessageBody = props.state.newMessageBody;

    let onSendMessageClick = () => {
        props.sendMessage();
    };

    let onNewMessageChange = (event) => {
        debugger
        let body = event.target.value;
        props.updateNewMessageBody(body);
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

