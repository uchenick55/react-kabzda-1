import React from 'react';
import classes from './MyPosts.module.css'
import Post from "./Post/Post";

const MyPosts = (props) => {

    let postElements =
        props.postsData.map((p) => <Post message={p.message} like={p.like} id={p.id}/>);

    let newPostElement=React.createRef();

    let addPostLocal= () => {
        props.dispatch({type : "ADD-POST"});
        debugger
    };
    let onPostChange = () => {
        let text2=newPostElement.current.value;
        props.dispatch({type: "UPDATE-NEW-POST-TEXT", newText : text2})
    };

    return (
        <div className={classes.postsBlock}>
            <h3>My posts</h3>
            <div>

                <textarea ref={newPostElement} onChange={onPostChange}/>
                {/*С этой строкой работает добавление текста на странице Profile - я просто обновляю
                данные в _state2 (state.js) при каждом нажатии символа без постоянной отрисовки страницы Profile.*/}


{/*
                <textarea ref={newPostElement} onChange={onPostChange} value={props.newPostText}/>
*/}

                {/* С этой строкой, при каждом вводе символа, теряется фокус из textarea и страница прокручивается в самый верх
                 !!!!!Для ререндеринга нужно раскомментировать 110 стоку в state.js: this._callSubscriber(this._state2);
                 */}
            </div>
            <div>
                <button onClick={addPostLocal}>Press here</button>
            </div>
            <div className={classes.posts}>
                {postElements}
            </div>
        </div>
    )
}
export default MyPosts;