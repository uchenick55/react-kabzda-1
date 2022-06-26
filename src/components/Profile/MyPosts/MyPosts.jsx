import React from 'react';
import classes from './MyPosts.module.css'
import Post from "./Post/Post";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";

const MyPosts = (props) => {

    let postElements =
        props.postsData.map((p) => <Post message={p.message} like={p.like} id={p.id}/>);

    let newPostElement = React.createRef();

    let addPostLocal = () => {
        props.dispatch(addPostActionCreator());
    };

    let onPostChange = () => {
        let text2 = newPostElement.current.value;
        props.dispatch(updateNewPostTextActionCreator(text2))
    };

    return (
        <div className={classes.postsBlock}>
            <h3>My posts</h3>
            <div>
                <textarea ref={newPostElement} onChange={onPostChange} value={props.newPostText}/>
            </div>
            <div>
                <button onClick={addPostLocal}>Press here</button>
            </div>
            <div className={classes.posts}>
                {postElements}
            </div>
        </div>
    )
}
export default MyPosts;