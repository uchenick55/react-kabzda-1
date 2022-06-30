import React from 'react';
import MyPosts from "./MyPosts";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";
import StoreContext from "../../../StoreContext";

const MyPostsContainer = (props) => {
    return (
        <StoreContext.Consumer>
            {
                (store) => {
                    let state = store.getState().profilePage;
                    let addPost = () => {
                        store.dispatch(addPostActionCreator());
                    };
                    let onPostChange = (text2) => {
                        store.dispatch(updateNewPostTextActionCreator(text2))
                    };
                    return (<MyPosts updateNewPostText={onPostChange}
                                     addPost={addPost}
                                     state={state}
                    />)
                }
            }
        </StoreContext.Consumer>
    )
}
export default MyPostsContainer;

