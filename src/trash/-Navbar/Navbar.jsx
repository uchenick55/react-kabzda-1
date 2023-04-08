import React from 'react';
import classes from './Navbar.module.css';
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";

const Navbar = ({myFriends2, unfollowFriendsAPI, dialogUserID}) => {

    return <nav className={classes.nav}>
        <div className={classes.item}>
            <NavLink to=''>Info</NavLink>
        </div>
        <div className={classes.item}>
            <NavLink to='/profile'>Profile</NavLink>
        </div>
        <div className={classes.item}>
            <NavLink to='/users'>Find Users</NavLink>
        </div>
        <div className={classes.item}>
            <NavLink to='/friends'>My friends</NavLink>
        </div>
        <div className={`${classes.item} ${classes.active}`}>
            <NavLink to='/dialogs'>Dialogs</NavLink>
        </div>
        <div className={classes.item}>
            <NavLink to='/news'>News</NavLink>
        </div>
        <div className={classes.item}>
            <NavLink to='/rest'>Rest</NavLink>
        </div>
        <div className={classes.item}>
            <NavLink to='/feedback'>FeedBack</NavLink>
        </div>
        <div className={classes.item}>
            <NavLink to='/tasks'>Tasks</NavLink>
        </div>

    </nav>;

}
const mapStateToProps = (state) => {
    return {
        state: state.sideBar
    }
}
export default connect(mapStateToProps, null)(Navbar)
