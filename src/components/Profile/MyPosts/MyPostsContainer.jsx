import MyPosts from "./MyPosts";
import {addPostActionCreator} from "../../../redux/profile-reducer";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        state: state.profilePage,
        myId: state.auth.myId
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPostData) => {
            dispatch(addPostActionCreator(newPostData))
        },
        dispatch: dispatch
    }
}

let MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;

