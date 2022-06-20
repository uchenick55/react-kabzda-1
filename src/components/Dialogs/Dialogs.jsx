import React from 'react';
import classes from './Dialogs.module.css';
import {NavLink} from "react-router-dom";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {addMessageActionCreator} from "../../redux/state";

const Dialogs = (props) => {

    let dialogElements =
        props.state.dialogsData.map((d) => {
                return (
                    <DialogItem name={d.name} id={d.id} avaSrc={d.avaSrc}/>
                )
            }
        );
    let messagesElements =
        props.state.messagesData.map((m) => {
            return <Message message={m.message}/>
        });
    let addNewItem = React.createRef();

    let addItemLocal = () => {
        let text1 = addNewItem.current.value;
        props.dispatch(addMessageActionCreator(text1));
    };

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogItems}>
                {dialogElements}
            </div>

            <div className={classes.messages}>
                <div>
                    <textarea ref={addNewItem}></textarea>
                    <div>
                        <button onClick={addItemLocal}>Press here</button>
                    </div>
                    {messagesElements}
                </div>
            </div>
        </div>
    )
}
export default Dialogs;

