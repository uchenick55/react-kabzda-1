import MyPostsBS from "./MyPostsBS";
import {ProfileActions} from "../../../redux/profile-reducer";
import {connect} from "react-redux";
import React from "react";
import {postsType} from "../../../types/commonTypes";
import {GlobalStateType} from "../../../redux/store-redux";

type MyPostsContainerType = {
    userId: number,
    posts: Array<postsType>,
    addPostActionCreator: (newPostData: string) => void
}
const MyPostsContainer: React.FC<MyPostsContainerType> = ({posts, addPostActionCreator, userId}) => {

    type addPostType = (newPostData: string) => void
    const addPost: addPostType = (newPostData: string) => {
        addPostActionCreator( newPostData )
    }
    return <MyPostsBS userId={userId} posts={posts} addPost={addPost}/>
}

let mapStateToProps = (state: GlobalStateType) => {
    return {
        posts: state.profilePage.posts,
    }
}
type mapDispatchToPropsType = {
    addPostActionCreator: (newPostData: string) => void
}

type mapStateToPropsType = {
    posts: Array<postsType>
}
const addPostActionCreator = ProfileActions.addPostActionCreator
export default connect<mapStateToPropsType, // тип mapStateToProps
    mapDispatchToPropsType, // тип mapDispatchToProps
    unknown, // тип входящих пропсов от родителя
    GlobalStateType // глобальный стейт из стора
    >( mapStateToProps, {addPostActionCreator} )( MyPostsContainer );



