import React from 'react';
import classes from './Dialogs.module.css';
import {NavLink} from "react-router-dom";

const DialogItem = (props) => {
    let path = '/dialogs/' + props.id;
    return <div className={classes.dialog}>
        <NavLink to={path}>{props.name}</NavLink>
    </div>
}

const Message = (props) => {
    return <div className={classes.dialog}>
        {props.message}
    </div>
}

const Dialogs = () => {
    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogItems}>
                <DialogItem name="Artem" id="1"/>
                <DialogItem name="Misha" id="2"/>
                <DialogItem name="Danil" id="3"/>
                <DialogItem name="Natasha" id="4"/>
                <DialogItem name="Kostya" id="5"/>
                <DialogItem name="Zhenya" id="6"/>
            </div>

            <div className={classes.messages}>
                <Message message="Hello, how are you?"/>
                <Message message="This is my first message!"/>
                <Message message="Did you tell me anything yesterday?"/>
                <Message message="Yo"/>
                <Message message="Yo"/>
            </div>
        </div>
    )
}
export default Dialogs;

