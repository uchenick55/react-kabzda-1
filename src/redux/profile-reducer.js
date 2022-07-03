const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";


export let addPostActionCreator = () => {
    return {type: ADD_POST}
};
export let updateNewPostTextActionCreator = (text2) => {
    return {type: UPDATE_NEW_POST_TEXT, newText: text2}
};

let initialState = {
    posts: [
        {id: 1, message: "state 2 Hi, how are you?", like: "12"},
        {id: 2, message: "state 2 it's, my first post", like: "15"},
    ],
    newPostText : ""
}

let profileReducer = (state=initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: state.newPostText,
                like: 2
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ""
            }
        }
        case UPDATE_NEW_POST_TEXT:{
            return {
                ...state,
                newPostText: action.newText,
            }
        }
        default:
            return state;
    }
}

export default profileReducer;
