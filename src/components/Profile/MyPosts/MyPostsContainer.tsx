import MyPostsBS from "./MyPostsBS";
import {profileActions} from "../../../redux/profile-reducer";
import {connect} from "react-redux";
import React from "react";
import {postsType} from "../../../types/commonTypes";
import {GlobalStateType} from "../../../redux/store-redux";

const {addPostActionCreator} = profileActions

type ownPropsType = {
    userId: number,
}

const MyPostsContainer: React.FC<mapStateToPropsType & mapDispatchToPropsType & ownPropsType> =
    ({posts, addPostActionCreator, userId}) => {

        type addPostType = (newPostData: string) => void
        const addPost: addPostType = (newPostData: string) => {
            addPostActionCreator( newPostData )
        }
        return <MyPostsBS userId={userId} posts={posts} addPost={addPost}/>
    }

const mapStateToProps = (state: GlobalStateType) => {
    return {
        posts: state.profilePage.posts as Array<postsType>, // мои посты (пока заглушка)
    }
}
type mapDispatchToPropsType = {
    addPostActionCreator: (newPostData: string) => void
}

type mapStateToPropsType = ReturnType<typeof mapStateToProps>

export default connect<mapStateToPropsType, // тип mapStateToProps
    mapDispatchToPropsType, // тип mapDispatchToProps
    ownPropsType, // тип входящих пропсов от родителя
    GlobalStateType // глобальный стейт из стора
    >( mapStateToProps, {addPostActionCreator} )( MyPostsContainer );



