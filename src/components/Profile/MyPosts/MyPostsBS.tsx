import React from 'react'; // импорт реакта
import classes from './MyPosts.module.css' // css обработка
import Post from "./Post/Post"; // подкомпонента отрисовки постов через map
import MyPostsFormik from "./Post/MyPostsFormik/MyPostsFormikBS";
import Container from "react-bootstrap/Container";
import {PostsType} from "../../common/types/commonTypes"; // reduxForm для ввода новых постов

type MyPostsBSType = {
    posts: Array<PostsType>,
    addPost: (newPostData: string) => void
}
const MyPostsBS: React.FC<MyPostsBSType> = ({posts, addPost}) => { // основная компонента отрисовки постов

    const postElements = posts.map( (p, ind) => // подкомпонента отрисовки всех постов через map
        <Post key={ind} message={p.message} like={p.like}/> );

    return (
        <div className={classes.postsBlock} /*стиль*/ >
            <Container>
                <div className={classes.legendStyle}>Мои посты</div>
                <MyPostsFormik
                    addPost={addPost}/> {/*вызов формы постов с отсылкой на локальный обработчик сабмита*/}
                <div className={classes.posts}>
                    {postElements} {/*отрисовка постов*/}
                </div>
            </Container>

        </div>
    )
}
export default MyPostsBS;
