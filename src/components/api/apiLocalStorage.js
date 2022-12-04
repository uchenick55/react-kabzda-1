import {bedug_mode} from "../../redux/store-redux";
import GetDate from "./GetDate";

export let apiDialogs = { // объект с методами api для Dialogs
  getDialog: (dialogNameLocal) => {
    let LocalStorageDialogs1 = JSON.parse(localStorage.getItem(dialogNameLocal));
    return LocalStorageDialogs1
  },
  postDialog: (formDataNewMessage, myID, userID) => { //formDataNewMessage

    let dialogNameLocal = myID>userID?"Dialog_"+myID+"_"+userID:"Dialog_"+userID+"_"+myID;
    let Dialog_1 = apiDialogs.getDialog(dialogNameLocal); // получить данные Dialog_25528_1079 с LocalStorage

    if (!Dialog_1) {
      Dialog_1 = [];
    }

    if (bedug_mode) {console.log("apiLocalStorage Dialog_1(getItem): ", Dialog_1 )} // дебаг


    let Dialog_2 = [...Dialog_1, {// запушить введенный текст в Dialog_25528_1079
      id: Dialog_1.length + 1,
      Date: GetDate(),
      userId: myID,
      message: formDataNewMessage
    }]

    localStorage.setItem(dialogNameLocal, JSON.stringify(Dialog_2)); // отправить измененый массив в LocalStorage

    let Dialog_3 = apiDialogs.getDialog(dialogNameLocal); // считать измененный массив с LocalStorage

    return Dialog_3 // вернуть обновленный массив из DAL в BLL

  }

}


