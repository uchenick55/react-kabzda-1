import React from 'react'; // импорт реакта
import classes from './MyPosts.module.css' // css обработка
import Post from "./Post/Post"; // подкомпонента отрисовки постов через map
import MyPostsFormik from "./Post/MyPostsFormik/MyPostsFormikBS";
import Container from "react-bootstrap/Container";
import {postsType} from "../../../types/commonTypes"; // reduxForm для ввода новых постов

type MyPostsBSType = {
    userId: number,
    posts: Array<postsType>,
    addPost: (newPostData:string)=>void
}
const MyPostsBS:React.FC<MyPostsBSType> = ({userId, posts, addPost}) => { // основная компонента отрисовки постов

    const postElements = posts.map((p, ind) => // подкомпонента отрисовки всех постов через map
        <Post key={ind} message={p.message} like={p.like}/>);

    return (
        <div className={classes.postsBlock} /*стиль*/ >
            <Container>
                {(userId === 0) && // если мы перешли на свой профиль (в браузере нет ID возле profile)
                <div>
                    <fieldset>
                        <legend>
                            <div className={classes.legendStyle}>Мои посты</div>
                        </legend>
                        <MyPostsFormik
                            addPost={addPost}/> {/*вызов формы постов с отсылкой на локальный обработчик сабмита*/}
                        <div className={classes.posts}>
                            {postElements} {/*отрисовка постов*/}
                        </div>
                    </fieldset>
                </div>
                }
            </Container>

        </div>
    )
}
export default MyPostsBS;
