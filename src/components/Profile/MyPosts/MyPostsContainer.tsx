import MyPostsBS from "./MyPostsBS";
import {profileActions} from "../../../redux/profile-reducer";
import {connect} from "react-redux";
import React from "react";
import {PostsType} from "../../common/types/commonTypes";
import {GlobalStateType} from "../../../redux/store-redux";

const {addPostActionCreator} = profileActions

type OwnPropsType = {
    userId: number,
}

const MyPostsContainer: React.FC<MapStateToPropsType & MapDispatchToPropsType & OwnPropsType> =
    ({posts, addPostActionCreator, userId}) => {

        type AddPostType = (newPostData: string) => void
        const addPost: AddPostType = (newPostData: string) => {
            addPostActionCreator( newPostData )
        }
        return <MyPostsBS userId={userId} posts={posts} addPost={addPost}/>
    }

const mapStateToProps = (state: GlobalStateType) => {
    return {
        posts: state.profilePage.posts as Array<PostsType>, // мои посты (пока заглушка)
    }
}
type MapDispatchToPropsType = {
    addPostActionCreator: (newPostData: string) => void
}

type MapStateToPropsType = ReturnType<typeof mapStateToProps>

export default connect<MapStateToPropsType, // тип mapStateToProps
    MapDispatchToPropsType, // тип mapDispatchToProps
    OwnPropsType, // тип входящих пропсов от родителя
    GlobalStateType // глобальный стейт из стора
    >( mapStateToProps, {addPostActionCreator} )( MyPostsContainer );



