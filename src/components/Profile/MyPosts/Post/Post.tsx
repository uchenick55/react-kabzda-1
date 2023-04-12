import React from 'react';
import classes from './Post.module.css'

type PostType = {
    message:string, like: number
}
const Post: React.FC<PostType> = ({message, like}) => {
    return (
        <div className={classes.item}>
            <img alt={"Мистер бин на прогулке"}  src="https://i.pinimg.com/originals/03/b6/fe/03b6fe528accfd011629f5271e90e9ac.jpg"/>
            {message}
            <div>
                <span>Like {like}</span>
            </div>
        </div>
    )
}
export default Post;
