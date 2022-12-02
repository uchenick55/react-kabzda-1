import React from 'react';
import classes from './Navbar.module.css';
import {NavLink} from "react-router-dom";
import MyFriends from "./My Friends/MyFriends";
import {connect} from "react-redux";
import {bedug_mode} from "../../redux/store-redux";

const Navbar = ({myFriends2, unfollowFriendsAPI}) => {

    if (bedug_mode) {console.log("Navbar")}
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
        <div className={classes.item}>
            <NavLink to='/news'>News</NavLink>
        </div>
        <div className={classes.item}>
            <NavLink to='/rest'>Rest</NavLink>
        </div>
        <div>
            <MyFriends state={myFriends2} unfollowFriendsAPI={unfollowFriendsAPI}/>
        </div>

    </nav>;

}
const mapStateToProps = (state) => {
    return {
        state: state.sideBar
    }
}
export default connect(mapStateToProps, null)(Navbar)
