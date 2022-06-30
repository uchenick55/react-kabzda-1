import React from 'react';
import MyPosts from "./MyPosts";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";
import StoreContext from "../../../StoreContext";
import {connect} from "react-redux";

/*const MyPostsContainer = () => {
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
}*/

let mapStateToProps = (state) => {
    return {
        state: state.profilePage
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        updateNewPostText: (text2) => {
            dispatch(updateNewPostTextActionCreator(text2))
        },
        addPost: () => {
            dispatch(addPostActionCreator())
        }
    }
}

let MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;

