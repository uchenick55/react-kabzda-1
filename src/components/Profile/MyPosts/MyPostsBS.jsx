import React from 'react'; // импорт реакта
import classes from './MyPosts.module.css' // css обработка
import Post from "./Post/Post"; // подкомпонента отрисовки постов через map
import MyPostsFormik from "./Post/MyPostsFormik/MyPostsFormikBS";
import Container from "react-bootstrap/Container"; // reduxForm для ввода новых постов

const MyPostsBS = ({userId, state, addPost, dispatch}) => { // основная компонента отрисовки постов

    let postElements = state.posts.map((p) => // подкомпонента отрисовки всех постов через map
        <Post key={p.id} message={p.message} like={p.like} id={p.id}/>);

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
