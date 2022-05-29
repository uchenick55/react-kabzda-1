import React from 'react';
import classes from './MyPosts.module.css'
import Post from "./Post/Post";

const MyPosts = (props) => {
    let posts = [
        {id: 1, message: "Hi, how are you?", like: "12"},
        {id: 2, message: "it's, my first post", like: "15"},
    ];

    let postElements =
        posts.map((p) => <Post message={p.message} like={p.like} id={p.id}/>);
/*
    let postElements =
        posts.map((p) => {
            return (
                <div>
                    <Post message={p.message} like={p.like} id={p.id}/>
                </div>
            )
        });
    let postElement1 = [
        <Post message={posts[0].message} like={posts[0].like} id={posts[0].id}/>,
        <Post message={posts[1].message} like={posts[1].like} id={posts[1].id}/>
    ];
*/

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