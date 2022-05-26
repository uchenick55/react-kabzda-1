import React from 'react';
import classes from './MyPosts.module.css'
import Post from "./Post/Post";

const MyPosts = () => {
    return (
        <div className={classes.posts}>
            My posts
            <Post message="Hi, how are you?" like="12"/>
            <Post message="it's, my first post" like="15"/>
        </div>
    )
}
export default MyPosts;