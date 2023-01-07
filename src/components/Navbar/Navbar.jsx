import React from 'react';
import classes from './Navbar.module.css';
import {NavLink} from "react-router-dom";
import MyFriends from "./My Friends/MyFriends";
import {connect} from "react-redux";
import {bedug_mode} from "../../redux/store-redux";

const filterSort = "https://uchenick55.github.io/supplydirector-web-page-test/#/app/profile"

const Navbar = ({myFriends2, unfollowFriendsAPI, dialogUserID}) => {

    if (bedug_mode) {console.log("Navbar")}
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
            <a href={filterSort} target="_blank">Filter&Sort page</a>
        </div>
        <div>
            <MyFriends
                state={myFriends2}
                unfollowFriendsAPI={unfollowFriendsAPI}
                dialogUserID={dialogUserID}

            />
        </div>

    </nav>;

}
const mapStateToProps = (state) => {
    return {
        state: state.sideBar
    }
}
export default connect(mapStateToProps, null)(Navbar)
