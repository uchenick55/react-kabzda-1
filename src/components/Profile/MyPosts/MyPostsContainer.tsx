import MyPostsBS from "./MyPostsBS";
import {profileActions} from "../../../redux/profile-reducer";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {PostsType} from "../../common/types/commonTypes";
import {GlobalStateType} from "../../../redux/store-redux";

const {addPostActionCreator} = profileActions

const MyPostsContainer: React.FC = () => {

    //console.log( "MyPostsContainer" )

    const dispatch = useDispatch()

    const posts: Array<PostsType> = useSelector( (state: GlobalStateType) => state.profilePage.posts )

    type AddPostType = (newPostData: string) => void
    const addPost: AddPostType = (newPostData: string) => {
        dispatch( addPostActionCreator( newPostData ) ) // добавить пост с новыми данными
    }
    return <MyPostsBS posts={posts} addPost={addPost}/>
}

export default MyPostsContainer



