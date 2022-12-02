import {bedug_mode, debugItem} from "./store-redux";
import {apiUsers} from "../components/api/api";
import {apiDialogs} from "../components/api/apiLocalStorage";

const SEND_MESSAGE = "myApp/dialogs-reducer/SEND-MESSAGE"; // Константа отправки сообщения

export let sendMessageCreator = (formDataNewMessage) => { // экшнкреатор отправки сообщений
    return {type: SEND_MESSAGE, formDataNewMessage}
};

let initialState = { // стейт сообщений по умолчанию
        messages: [ // сообщения по одному из диалогов по умолчанию (заглушка)
            {id: 1, message: "Hello, how are you?"},
            {id: 2, message: "This is my first message!"},
            {id: 3, message: "Did you tell me anything yesterday?"},
            {id: 4, message: "Yo"},
            {id: 5, message: "Yo"}
        ],
        messages2: [],
        dialogs: [ // список диалогов по умолчанию (заглушка)
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
    }

let dialogsReducer = (state = initialState, action) => { // редьюсер диалогов
  let stateCopy; // объявлениечасти части стейта до изменения редьюсером
  switch (action.type) {
       case SEND_MESSAGE: // экшн отправки сообщений по данным из формы диалогов
               let body = action.formDataNewMessage;
             stateCopy = {
                   ...state,
                   messages: [...state.messages, {id: 6, message: body}], // добавление сообщений (заглушка)
             }
             if (bedug_mode) {console.log("dialogs-reducer.js, SEND_MESSAGE: ", state, stateCopy)} // дебаг
         return stateCopy
        default:
            return state;
    }
}


export let sendDialogsThunkCreator = (formDataNewMessage, myId) => {//санкреатор получения диалогов с данными
  if (bedug_mode) {console.log("sendDialogsThunkCreator")}

  let sendDialogsThunk = async (dispatch) => {// санка отправки диалогов
    if (bedug_mode) {console.log("dialogs-reducer.js, sendDialogsThunkCreator->: dispatch(sendMessageCreator())->SEND_MESSAGE")} // дебаг
    dispatch(sendMessageCreator(formDataNewMessage))
    let aaa = await apiDialogs.postDialogs(formDataNewMessage, myId)
    //console.log(aaa)
  }
  return sendDialogsThunk
}



export default dialogsReducer;
