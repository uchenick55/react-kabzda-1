import React from 'react';
import classes from './Dialogs.module.css';
import {NavLink} from "react-router-dom";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

const Dialogs = (props) => {

    let dialogElements =
        props.state.dialogsData.map((d) => {
                return (
                    <DialogItem name={d.name} id={d.id} avaSrc={d.avaSrc} />
                )
            }
        );
    let messagesElements=
        props.state.messagesData.map((m) => {
            return <Message message={m.message} />

    });

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogItems}>
                {dialogElements}
            </div>

            <div className={classes.messages}>
                {messagesElements}
            </div>
        </div>
    )
}
export default Dialogs;

