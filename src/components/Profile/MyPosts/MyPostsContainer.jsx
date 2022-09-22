import React from 'react';
import MyPosts from "./MyPosts";
import {addPostActionCreator} from "../../../redux/profile-reducer";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        state: state.profilePage
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPostData) => {
            dispatch(addPostActionCreator(newPostData))
        }
    }
}

let MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;

