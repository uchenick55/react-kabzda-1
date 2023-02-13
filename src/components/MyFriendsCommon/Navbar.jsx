import React from 'react';
import classes from './MyFriendsContainer.module.css';
import MyFriends from "./My Friends/MyFriends";
import {connect} from "react-redux";
import {bedug_mode} from "../../redux/store-redux";

const Navbar = ({myFriends2, unfollowFriendsAPI, dialogUserID}) => {

    if (bedug_mode) {console.log("Navbar")}
    return <nav className={classes.nav}>

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