import React from 'react';
import classes from './Dialogs.module.css';
import {NavLink} from "react-router-dom";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

const Dialogs = (props) => {

/*    let dialogs = [
        {id: 1, name: "Artem"},
        {id: 2, name: "Misha"},
        {id: 3, name: "Danil"},
        {id: 4, name: "Natasha"},
        {id: 5, name: "Kostya"},
        {id: 6, name: "Zhenya"}
    ];

    let messages = [
        {id: 1, message: "Hello, how are you?"},
        {id: 2, message: "This is my first message!"},
        {id: 3, message: "Did you tell me anything yesterday?"},
        {id: 4, message: "Yo"},
        {id: 5, message: "Yo"}
    ];*/
    let dialogElements =
        props.dialogsData.map((d) => {
                return (
                    <DialogItem name={d.name} id={d.id}/>
                )
            }
        );
    let messagesElements=
        props.messagesData.map((m) => {
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

