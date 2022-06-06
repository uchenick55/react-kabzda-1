import React from 'react';
import classes from './Navbar.module.css';
import {NavLink} from "react-router-dom";
import MyFriends from "./My Friends/MyFriends";

const Navbar = (props) => {
    return <nav className={classes.nav}>
        <div className={classes.item}>
            <NavLink to='/profile'>Profile</NavLink>
        </div>
        <div className={`${classes.item} ${classes.active}`}>
            <NavLink to='/dialogs'>Dialogs</NavLink>
        </div>
        <div className={classes.item}>
            <NavLink to='/news'>News</NavLink>
        </div>
        <div className={classes.item}>
            <NavLink to='/music'>Music</NavLink>
        </div>
        <div className={classes.item}>
            <NavLink to='/settings'>Settings</NavLink>
        </div>
        <div>
            <MyFriends state={props.state.myFriends}/>
        </div>
    </nav>;

}
export default Navbar;