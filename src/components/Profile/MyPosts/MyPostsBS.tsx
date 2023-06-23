import React from 'react'; // импорт реакта
import classes from './MyPosts.module.css' // css обработка
import PostItem from "./PostItem"; // подкомпонента отрисовки постов через map
import MyPostsFormik from "./MyPosts/MyPostsFormikBS";
import Container from "react-bootstrap/Container";
import {PostsType} from "../../common/types/commonTypes";
import MyPostsInput from "./MyPosts/MyPostsInput"; // reduxForm для ввода новых постов

type MyPostsBSType = {
    posts: Array<PostsType>,
    addPost: (newPostData: string) => void
}
const MyPostsBS: React.FC<MyPostsBSType> = ({posts, addPost}) => { // основная компонента отрисовки постов

    return <Container>
        <div className={classes.legendStyle}>Мои посты</div>
        <MyPostsInput //вызов формы постов с отсылкой на локальный обработчик сабмита
            addPost={addPost}/>
        <div className={classes.posts}>
            {posts.map( (p, ind) => // подкомпонента отрисовки всех постов через map
                <PostItem key={ind} message={p.message} like={p.like}/> )} {/*отрисовка постов*/}
        </div>
    </Container>
}
export default MyPostsBS;
