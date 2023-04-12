import MyPostsBS from "./MyPostsBS";
import {addPostActionCreator} from "../../../redux/profile-reducer";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        myId: state.auth.myId
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPostData) => {
            dispatch(addPostActionCreator(newPostData))
        },
    }
}

let MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPostsBS);

export default MyPostsContainer;

