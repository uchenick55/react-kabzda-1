import {bedug_mode} from "../../redux/store-redux";
import GetDate from "./GetDate";

export let apiDialogs = { // объект с методами api для Dialogs
  _setMessages2LS: (Dialog_2, myID, userID) => { // метод отправки измененного диалога в LocalStorage и считывания его же
    let LocalStoragedialogUpdateTime1 =
      GetDate().Day + "." +
      GetDate().Month + "" +
      GetDate().Year + " " +
      GetDate().Hour + ":" +
      GetDate().Minutes + ":" +
      GetDate().Seconds

    // в случае обновления диалога запомнить время его обновления

    let dialogNameLocal = myID > userID ? "Dialog_" + myID + "_" + userID : "Dialog_" + userID + "_" + myID;  // задать имя диалога для запроса
    let dialogUpdateTimeLocal = myID > userID ? "Dialog_" + myID + "_" + userID + "_UpdateTime" : "Dialog_" + userID + "_" + myID + "_UpdateTime";// задать имя времени обновления диалога для запроса

    localStorage.setItem(dialogNameLocal, JSON.stringify(Dialog_2)); // отправить измененый массив в LocalStorage
    localStorage.setItem(dialogUpdateTimeLocal, JSON.stringify(LocalStoragedialogUpdateTime1)); // отправить вреия изменения диалога в LocalStorage

    let Dialog_3 = apiDialogs.getDialog(myID, userID); // считать записанный массив с LocalStorage

    return Dialog_3
  },
  getDialog: (myID, userID) => {
    let dialogNameLocal = myID > userID ? "Dialog_" + myID + "_" + userID : "Dialog_" + userID + "_" + myID; // задать имя диалога для запроса
    let LocalStorageDialogs1 = JSON.parse(localStorage.getItem(dialogNameLocal)); // запросить диалог из LocalStorage по текущему имени
    if (!LocalStorageDialogs1) { // если диалога с таким именем нет (undefined)
      LocalStorageDialogs1 = []; // то присвоить пустой массив
    }
    return LocalStorageDialogs1 // вернуть результат
  },
  getUpdateTime: (myID, userID) => {
    let dialogUpdateTimeLocal = myID > userID ? "Dialog_" + myID + "_" + userID + "_UpdateTime" : "Dialog_" + userID + "_" + myID + "_UpdateTime"; // задать имя времени обновления диалога для запроса
    let LocalStoragedialogUpdateTime1 = JSON.parse(localStorage.getItem(dialogUpdateTimeLocal)); // запросить время обновления диалога по сформированному времени
    if (!LocalStoragedialogUpdateTime1) { // если времени обновления с таким именем нет (undefined)
      LocalStoragedialogUpdateTime1 = null; // то задать нулевое значение
    }
    return LocalStoragedialogUpdateTime1 // вернуть результат
  },

  deleteMessage: (messageID, myID, userID) => {
    let Dialog_1 = apiDialogs.getDialog(myID, userID); // получить данные Dialog_25528_1079 с LocalStorage
    let Dialog_2 = Dialog_1.filter(message => message.id !== messageID) // отфильтровали массив, удалив сообщение с нужным ШВ

    let Dialog_3 = apiDialogs._setMessages2LS(Dialog_2, myID, userID)// отправить измененый массив на сервер (LocalStorage)
    return Dialog_3 // вернуть результат
  },

  updateDialogListUserId: (userID, userName, userPhoto, followed) => { // запись в сервер данные о том, что у конкретного пользователя есть диалоги
    let dialogListUserId1 = "DialogList_"+ userID // задать имя вида "DialogList_1079"
    let  Data1 = JSON.parse(localStorage.getItem(dialogListUserId1)); // запросить диалоглист с сервера по заданному имени
    if (!Data1) {
      Data1=[] // если такого диалога на сервере нет, занулить его
    }
    let Data2 = [
      ...Data1, {
      dialogId: Data1.length + 1, // id диалога в dialogList
      userId: userID, // Id выбранного пользователя
      unreadMessages: Data1.unreadMessages ? Data1.unreadMessages + 1 : 1, // количество непрочитанных сообщений от выбранного пользователя
      userName: userName, // имя выбранного пользователя
      userPhoto: userPhoto, // фото выбранного пользователя
      followed: followed }// является ли пользователь моим другом, или нет
    ]
    console.log(Data2)
    localStorage.setItem(dialogListUserId1, JSON.stringify(Data2)); // отправить вреия изменения диалога в LocalStorage

  },

  getDialogListMyID: (myID, userID) => {
    return
  },

  postDialog: (formDataNewMessage, myID, userID, userName, userPhoto, followed ) => { //отправка сообщения в LocalStorage

    let Dialog_1 = apiDialogs.getDialog(myID, userID); // получить данные Dialog_25528_1079 с LocalStorage

    if (bedug_mode) {
      console.log("apiLocalStorage Dialog_1(getItem): ", Dialog_1)
    } // дебаг

    let Dialog_2 = [...Dialog_1, {// добавить новое сообщение в запрошенный диалог
      id: Dialog_1.length + 1,
      Date: GetDate(),
      userId: myID,
      message: formDataNewMessage
    }]
    let Dialog_3 = apiDialogs._setMessages2LS(Dialog_2, myID, userID)// отправить измененый массив на сервер (LocalStorage)

    apiDialogs.updateDialogListUserId(userID, userName, userPhoto, followed)
    // здесь буду обновлять updateDialogList при каждой отправке сообщений

    return Dialog_3 // вернуть обновленный массив из DAL в BLL

  }

}


