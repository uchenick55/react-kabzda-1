const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const ADD_MESSAGE = "ADD-MESSAGE";

export let addPostActionCreator = () => {
    return {type: ADD_POST}
};
export let updateNewPostTextActionCreator = (text2) => {
    return {type: UPDATE_NEW_POST_TEXT, newText: text2}
};
export let addMessageActionCreator = (text1) => {
    return {type: "ADD-MESSAGE", newMessageProps: text1}
};

export let store = {
    _callSubscriber(state) {
        debugger
        console.log("log updated");
    },
    _state2: {
        profilePage: {
            postsData: [
                {id: 1, message: "state 2 Hi, how are you?", like: "12"},
                {id: 2, message: "state 2 it's, my first post", like: "15"},
            ],
            newPostText : ""
        },
        dialogsPage: {
            messagesData: [
                {id: 1, message: "Hello, how are you?"},
                {id: 2, message: "This is my first message!"},
                {id: 3, message: "Did you tell me anything yesterday?"},
                {id: 4, message: "Yo"},
                {id: 5, message: "Yo"}
            ],
            dialogsData: [
                {
                    id: 1,
                    name: "Artem",
                    avaSrc: "https://i.pinimg.com/originals/03/b6/fe/03b6fe528accfd011629f5271e90e9ac.jpg"
                },
                {id: 2, name: "Misha", avaSrc: "https://cdn1.flamp.ru/3d883d4bb9e3bfa25a8340615b116a80.jpg"},
                {
                    id: 3,
                    name: "Danil",
                    avaSrc: "https://pixelbox.ru/wp-content/uploads/2020/11/ava-maincraft-youtube-76.jpg"
                },
                {
                    id: 4,
                    name: "Natasha",
                    avaSrc: "https://ulibky.ru/wp-content/uploads/2019/10/avatarki_dlya_vatsap_dlya_devushek_42_28061027.jpg"
                },
                {
                    id: 5,
                    name: "Kostya",
                    avaSrc: "https://pixelbox.ru/wp-content/uploads/2021/10/dark-avatar-vk-pixelbox.ru-2.jpg"
                },
                {id: 6, name: "Zhenya", avaSrc: "https://cdn1.flamp.ru/a981cc28c84f99d8f480c8ea6b559671.jpg"}
            ]
        },
        sideBar: {
            myFriends: [
                {
                    id: 1,
                    name: "Artem",
                    avaSrc: "https://i.pinimg.com/originals/03/b6/fe/03b6fe528accfd011629f5271e90e9ac.jpg"
                },
                {
                    id: 3,
                    name: "Danil",
                    avaSrc: "https://pixelbox.ru/wp-content/uploads/2020/11/ava-maincraft-youtube-76.jpg"
                },
                {
                    id: 4,
                    name: "Natasha",
                    avaSrc: "https://ulibky.ru/wp-content/uploads/2019/10/avatarki_dlya_vatsap_dlya_devushek_42_28061027.jpg"
                },

            ]
        }

    },

    getState() {
        return this._state2;
    },
    subscribe(observer) {
        /*debugger*/
        this._callSubscriber = observer;
        /*debugger*/
    },

    addMessage(newMessageProps) {
        let addMessageLocal = {
            id: 5,
            message: newMessageProps
        };
        this._state2.dialogsPage.messagesData.push(addMessageLocal);
        this._callSubscriber(this._state2);
    },

    dispatch(action) {
        debugger
        if (action.type === ADD_POST) { // {type : "ADD-POST"}
            let addPostLocal = {
                id: 5,
                message: this._state2.profilePage.newPostText,
                like: 2
            }
            this._state2.profilePage.postsData.push(addPostLocal);
            this._callSubscriber(this._state2);

        } else if (action.type === ADD_MESSAGE) {
            let addMessageLocal = {
                id: 5,
                message: action.newMessageProps,
            };
            this._state2.dialogsPage.messagesData.push(addMessageLocal);
            this._callSubscriber(this._state2);
        } else if (action.type === UPDATE_NEW_POST_TEXT) {
            this._state2.profilePage.newPostText=action.newText;
            this._callSubscriber(this._state2);
        }
    }


}

window.store = store;

export default store;
