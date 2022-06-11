import React from 'react';
import classes from './MyPosts.module.css'
import Post from "./Post/Post";

const MyPosts = (props) => {

    let postElements =
        props.postsData.map((p) => <Post message={p.message} like={p.like} id={p.id}/>);

    let addNewPost=React.createRef();

    let addPostLocal= () => {
        let text1=addNewPost.current.value;
        props.addPost(text1);
    };

    return (
        <div className={classes.postsBlock}>
            <h3>My posts</h3>
            <div>
                <textarea ref={addNewPost}></textarea>
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