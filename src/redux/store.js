
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

export let store = {
    _callSubscriber() {
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
        profileReducer(this._state2.profilePage, action)
        dialogsReducer(this._state2.dialogsPage, action)
        sidebarReducer(this._state2.sideBar, action)
        this._callSubscriber(this._state2);
    }
}

window.store = store;

export default store;
