import React from 'react';
import classes from './MyPosts.module.css'
import Post from "./Post/Post";

const MyPosts = (props) => {
    let postElements =
        props.state.posts.map((p) => <Post message={p.message} like={p.like} id={p.id}/>);

    let newPostElement = React.createRef();

    let addPost = () => {
        props.addPost();
    };

    let onPostChange = () => {
        let text2 = newPostElement.current.value;
        props.updateNewPostText(text2);
    };

    return (
        <div className={classes.postsBlock}>
            <h3>My posts</h3>
            <div>
                <textarea ref={newPostElement} onChange={onPostChange} value={props.state.newPostText}/>
            </div>
            <div>
                <button onClick={addPost}>Press here</button>
            </div>
            <div className={classes.posts}>
                {postElements}
            </div>
        </div>
    )

}
export default MyPosts;