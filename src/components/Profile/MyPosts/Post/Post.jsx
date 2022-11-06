import React from 'react';
import classes from './Post.module.css'

const Post = ({message, like}) => {
    return (
        <div className={classes.item}>
            <img src="https://i.pinimg.com/originals/03/b6/fe/03b6fe528accfd011629f5271e90e9ac.jpg"/>
            {message}
            <div>
                <span>Like {like}</span>
            </div>
        </div>
    )


}
export default Post;
