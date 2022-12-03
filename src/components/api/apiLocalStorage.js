import {bedug_mode} from "../../redux/store-redux";

let Dialog_25528_1079 = [
  {id: 1, userId: 25528, message: "Привет, как дела?"},
  {id: 2, userId: 1079, message: "Нормально, только погода на улице не очень"},
  {id: 3, userId: 25528, message: "Чем думаешь заняться сегодня?"},
  {id: 4, userId: 1079, message: "Нужно картошки в магазине купить"},
]

let LocalStorageDialogs = {
  "Dialog_25528_1079": {
    1: {userId: 25528, message: "Привет, как дела?"},
    2: {userId: 1079, message: "Нормально, только погода на улице не очень"},
    3: {userId: 25528, message: "Чем думаешь заняться сегодня?"},
    4: {userId: 1079, message: "Нужно картошки в магазине купить"},
  }
  , "Dialog_25000_1000": {
    1: {userId: 25528, message: "Привет, как дела?"},
    2: {userId: 1079, message: "Нормально, только погода на улице не очень"},
    3: {userId: 25528, message: "Чем думаешь заняться сегодня?"},
    4: {userId: 1079, message: "Нужно картошки в магазине купить"},
  }
}

export let apiDialogs = { // объект с методами api для Dialogs
  getDialogs: () => {
    LocalStorageDialogs = JSON.parse(localStorage.getItem("Dialog_25528_1079"));
    return LocalStorageDialogs
  },
  postDialogs: (formDataNewMessage, myID) => { //formDataNewMessage
    // localStorage.removeItem('Dialog_25528_1079_fromServer'); DELETE
    let Dialog_25528_1079_1 = apiDialogs.getDialogs(); // получить данные Dialog_25528_1079 с LocalStorage

    if (bedug_mode) {console.log("apiLocalStorage Dialog_25528_1079_2(getItem): ", Dialog_25528_1079_1 )} // дебаг

    let Dialog_25528_1079_2 = [...Dialog_25528_1079_1, {// запушить введенный текст в Dialog_25528_1079
      id: Dialog_25528_1079_1.length + 1,
      userId: myID,
      message: formDataNewMessage
    }]

    localStorage.setItem("Dialog_25528_1079", JSON.stringify(Dialog_25528_1079_2)); // отправить измененый массив в LocalStorage

    let Dialog_25528_1079_3 = apiDialogs.getDialogs(); // считать измененный массив с LocalStorage

    if (bedug_mode) {console.log("apiLocalStorage Dialog_25528_1079_3(setItem/getItem): ", Dialog_25528_1079_2 )} // дебаг


    return Dialog_25528_1079_3 // вернуть обновленный массив из DAL в BLL

  }

}


