import React from 'react';
import MyFriends from "./My Friends/MyFriends";
import {connect} from "react-redux";

const MyFriends1 = ({myFriends2, unfollowFriendsAPI, dialogUserID}) => {

    return <nav>

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
export default connect(mapStateToProps, null)(MyFriends1)
