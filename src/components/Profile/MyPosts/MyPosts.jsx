import React from 'react'; // импорт реакта
import classes from './MyPosts.module.css' // css обработка
import Post from "./Post/Post"; // подкомпонента отрисовки постов через map
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, Required} from "../../common/Validation/validationField";
import {Textarea} from "../../common/Validation/customFields"; // reduxForm для ввода новых постов

const newPostForm = (props) => { // компонента формы
    return (
        <form onSubmit={props.handleSubmit} /*привязка сабмита формы к внутренней функции reduxForm - handleSubmit*/>
            <div>
                <div>
                    <Field
                        name={"newPostData"} // имя поля формы и возвращаемого свойства объекта после сабмита формы
                        component={Textarea} //настраиваемый компонент текстовое поле для вывода ошибок ввода
                        placeholder={"newPost"} // текст подсказка при пустом поле
                        validate = {[Required, maxLengthCreator(30)]} //  валидация требуемого поля и максимальной длины
                    />
                </div>
                <div>
                    <button>Submit</button> {/*кнопка*/}
                </div>
            </div>
        </form>
    )
}

// оберточная компонента формы, задает имя подстейта "newPostForm"
const NewPostReduxForm = reduxForm({form: "newPostForm"})(newPostForm)

const MyPosts = (props) => { // основная компонента отрисовки постов

    let postElements = props.state.posts.map((p) => // подкомпонента отрисовки всех постов через map
            <Post message={p.message} like={p.like} id={p.id}/>);

    let addPost = (formData) => { // функция отправления данных формы нового поста в стейт
        props.addPost(formData.newPostData);
    };

    return (
        <div className={classes.postsBlock} /*стиль*/ >
            <h3>My posts</h3> {/*h3 заголовок*/}
            <NewPostReduxForm onSubmit={addPost} /> {/*вызов формы постов с отсылкой на локальный обработчик сабмита*/}
            <div className={classes.posts}>
                {postElements} {/*отрисовка постов*/}
            </div>
        </div>
    )
}
export default MyPosts;