import React from 'react';
import classes from './Navbar.module.css';
import {NavLink} from "react-router-dom";
import MyFriends from "./My Friends/MyFriends";
import {connect} from "react-redux";

const Navbar = ({state}) => {
    return <nav className={classes.nav}>
        <div className={classes.item}>
            <NavLink to='/profile'>Profile</NavLink>
        </div>
        <div className={`${classes.item} ${classes.active}`}>
            <NavLink to='/dialogs'>Dialogs</NavLink>
        </div>
        <div className={classes.item}>
            <NavLink to='/users'>Find Users</NavLink>
        </div>
        <div>
            <MyFriends state={state.myFriends}/>
        </div>

    </nav>;

}
const mapStateToProps = (state) => {
    return {
        state: state.sideBar
    }
}
export default connect(mapStateToProps, null)(Navbar)
