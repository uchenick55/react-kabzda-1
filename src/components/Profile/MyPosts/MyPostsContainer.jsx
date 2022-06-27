import React from 'react';
import MyPosts from "./MyPosts";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";

const MyPostsContainer = (props) => {
    let state =props.store.getState().profilePage;

    let addPost = () => {
        props.store.dispatch(addPostActionCreator());
    };
    let onPostChange = (text2) => {
        props.store.dispatch(updateNewPostTextActionCreator(text2))
    };
    return ( <MyPosts updateNewPostText={onPostChange}
                      addPost={addPost}
                      state={state}
                      />)
}
export default MyPostsContainer;