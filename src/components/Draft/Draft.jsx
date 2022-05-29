import React from 'react';
import classes from "../Dialogs/Dialogs.module.css";

let oldArray = [{eng: "blabla", ru: "БЛАБЛА"}, {eng:"hello", ru:"привет"}, {eng:"hi", ru:"здарова"}];


/*let newArray =
    oldArray
        .map(name =>    ({name, ru}));*/

/*

 <Message eng="blabla" ru="БЛАБЛА">,
  */
const Message =(props)=> {
    return
        <div>
            Текст Message Draft
        </div>
}
    const Draft = () => {
        return (
            <div>
                <div>
                    Old Array: {oldArray}
                </div>
                <div>{/*
                    New Array name = "Dmitriy": {newArray}
                */}</div>
            </div>
        )
    }
    export default Draft;

