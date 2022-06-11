import React from 'react';
import classes from './Post.module.css'

const Post = (props) => {
    return (
        <div className={classes.item}>
            <img src="https://i.pinimg.com/originals/03/b6/fe/03b6fe528accfd011629f5271e90e9ac.jpg"/>
            {props.message}
            <div>
                <span>Like {props.like}</span>
            </div>
        </div>
    )


}
export default Post;