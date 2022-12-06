import {bedug_mode} from "../../redux/store-redux";
import GetDate from "./GetDate";

export let apiDialogs = { // объект с методами api для Dialogs
  getDialog: (myID, userID) => {
    let dialogNameLocal = myID>userID?"Dialog_"+myID+"_"+userID:"Dialog_"+userID+"_"+myID;
    let LocalStorageDialogs1 = JSON.parse(localStorage.getItem(dialogNameLocal));
    if (!LocalStorageDialogs1) {
      LocalStorageDialogs1 = [];
    }
    return LocalStorageDialogs1
  },
  getUpdateTime: (myID, userID) => {
    let dialogUpdateTimeLocal = myID>userID?"Dialog_"+myID+"_"+userID+"_UpdateTime":"Dialog_"+userID+"_"+myID+"_UpdateTime";
    let LocalStoragedialogUpdateTime1 = JSON.parse(localStorage.getItem(dialogUpdateTimeLocal));
    if (!LocalStoragedialogUpdateTime1) {
      LocalStoragedialogUpdateTime1 = null;
    }
    return LocalStoragedialogUpdateTime1
  },
  postDialog: (formDataNewMessage, myID, userID) => { //formDataNewMessage

    let Dialog_1 = apiDialogs.getDialog(myID, userID); // получить данные Dialog_25528_1079 с LocalStorage

    if (bedug_mode) {console.log("apiLocalStorage Dialog_1(getItem): ", Dialog_1 )} // дебаг

    let Dialog_2 = [...Dialog_1, {// запушить введенный текст в Dialog_25528_1079
      id: Dialog_1.length + 1,
      Date: GetDate(),
      userId: myID,
      message: formDataNewMessage
    }]

    let  LocalStoragedialogUpdateTime1 = GetDate()

    let dialogNameLocal = myID>userID?"Dialog_"+myID+"_"+userID:"Dialog_"+userID+"_"+myID;
    let dialogUpdateTimeLocal = myID>userID?"Dialog_"+myID+"_"+userID+"_UpdateTime":"Dialog_"+userID+"_"+myID+"_UpdateTime";

    localStorage.setItem(dialogNameLocal, JSON.stringify(Dialog_2)); // отправить измененый массив в LocalStorage
    localStorage.setItem(dialogUpdateTimeLocal, JSON.stringify(LocalStoragedialogUpdateTime1)); // отправить измененый массив в LocalStorage

    let Dialog_3 = apiDialogs.getDialog(myID, userID); // считать измененный массив с LocalStorage

    return Dialog_3 // вернуть обновленный массив из DAL в BLL

  }

}


