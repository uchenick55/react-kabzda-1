import React from 'react';
import classes from './Rest.css';
import {NavLink} from "react-router-dom";

const Rest = () => {
    return (
        <div className={classes.content}>
            <div className={classes.item}>
                <NavLink to='/krestiki-noliki'>Крестики нолики</NavLink>
            </div>
        </div>
    )
}
export default Rest;

