const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const SEND_MESSAGE = "SEND-MESSAGE";
const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-_BODY";


export let addPostActionCreator = () => {
    return {type: ADD_POST}
};
export let updateNewPostTextActionCreator = (text2) => {
    return {type: UPDATE_NEW_POST_TEXT, newText: text2}
};
export let sendMessageCreator = (text1) => {
    return {type: SEND_MESSAGE, newMessageProps: text1}
};
export let updateNewMessageBodyCreator = (body) => {
    return {type: UPDATE_NEW_MESSAGE_BODY, body: body}
};


export let store = {
    _callSubscriber(state) {

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
            messages: [
                {id: 1, message: "Hello, how are you?"},
                {id: 2, message: "This is my first message!"},
                {id: 3, message: "Did you tell me anything yesterday?"},
                {id: 4, message: "Yo"},
                {id: 5, message: "Yo"}
            ],
            dialogs: [
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
            ],
            newMessageBody: "",
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
        this._callSubscriber = observer;
    },
    dispatch(action) {
        if (action.type === ADD_POST) { // {type : "ADD-POST"}
            let addPostLocal = {
                id: 5,
                message: this._state2.profilePage.newPostText,
                like: 2
            }
            this._state2.profilePage.postsData.push(addPostLocal);
            this._state2.profilePage.newPostText="";
            this._callSubscriber(this._state2);
        }
        else if (action.type === SEND_MESSAGE) {
            let addMessageLocal = {
                id: 5,
                message: this._state2.dialogsPage.newMessageBody,
            };
            this._state2.dialogsPage.messages.push(addMessageLocal);
            this._state2.dialogsPage.newMessageBody="";
            this._callSubscriber(this._state2);
        }
       else if (action.type === UPDATE_NEW_POST_TEXT) {
            this._state2.profilePage.newPostText=action.newText;
            this._callSubscriber(this._state2);
        }
        else if (action.type === UPDATE_NEW_MESSAGE_BODY) {
            this._state2.dialogsPage.newMessageBody=action.body;
            this._callSubscriber(this._state2);
        }

    }


}

window.store = store;

export default store;
