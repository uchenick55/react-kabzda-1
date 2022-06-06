import React from 'react';
import classes from './MyPosts.module.css'
import Post from "./Post/Post";

const MyPosts = (props) => {

    let postElements =
        props.postsData.map((p) => <Post message={p.message} like={p.like} id={p.id}/>);


    return (
        <div className={classes.postsBlock}>
            <h3>My posts</h3>
            <div>
                <textarea></textarea>
            </div>
            <div>
                <button>Press here</button>
            </div>
            <div className={classes.posts}>
                {postElements}
            </div>
        </div>
    )
}
export default MyPosts;