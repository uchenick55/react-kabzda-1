import React from "react";
import {bedug_mode} from "../../redux/store-redux";
import GetDate from "./GetDate";
import {useState} from "react";

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

    return Dialog_3 // вернуть измененный диалог
  },
  getDialog: (myID, userID) => {
    let dialogNameLocal = myID > userID ? "Dialog_" + myID + "_" + userID : "Dialog_" + userID + "_" + myID; // задать имя диалога для запроса
    let LocalStorageDialogs1 = JSON.parse(localStorage.getItem(dialogNameLocal)); // запросить диалог из LocalStorage по текущему имени
    if (!LocalStorageDialogs1) { // если диалога с таким именем нет (undefined)
      LocalStorageDialogs1 = []; // то присвоить пустой массив
    }
    return LocalStorageDialogs1 // вернуть диалог вида  Dialog_25528_1079
  },
  getUpdateTime: (myID, userID) => {
    let dialogUpdateTimeLocal = myID > userID ? "Dialog_" + myID + "_" + userID + "_UpdateTime" : "Dialog_" + userID + "_" + myID + "_UpdateTime"; // задать имя времени обновления диалога для запроса
    let LocalStoragedialogUpdateTime1 = JSON.parse(localStorage.getItem(dialogUpdateTimeLocal)); // запросить время обновления диалога по сформированному времени
    if (!LocalStoragedialogUpdateTime1) { // если времени обновления с таким именем нет (undefined)
      LocalStoragedialogUpdateTime1 = null; // то задать нулевое значение
    }
    return LocalStoragedialogUpdateTime1 // вернуть время обновления текущего диалога
  },

  deleteMessage: (messageID, myID, userID) => {
    let Dialog_1 = apiDialogs.getDialog(myID, userID); // получить данные Dialog_25528_1079 с LocalStorage
    let Dialog_2 = Dialog_1.filter(message => message.id !== messageID) // отфильтровали массив, удалив сообщение с нужным ШВ

    let Dialog_3 = apiDialogs._setMessages2LS(Dialog_2, myID, userID)// отправить измененый массив на сервер (LocalStorage)


    if (Dialog_3.length===0) { // если после удаления сообщений их в диалоге не осталось

      // Убираем пользователя из диалогЛиста пользователя с LocalStorage
      let dialogListUserId1 = "DialogList_" + userID // задать имя DialogList
      let Data1 = JSON.parse(localStorage.getItem(dialogListUserId1)); // запросить диалоглист с сервера по заданному имени
      if (!Data1) { // на всякий случай подстраховка проверка
        Data1 = [] // если такого диалога на сервере нет, занулить его
      }
      let Data2 = Data1.filter(d=>d.userId!==myID) // оставить в диалогЛисте пользователя все диалоги, ктоме того,в котором 0 сообщений, кроме
      localStorage.setItem(dialogListUserId1, JSON.stringify(Data2)); // записать в LocalStorage обновленный диалоглист

      // удаляем время последнего обновления диалога с LocalStorage
      let dialogUpdateTimeLocal = myID > userID ? "Dialog_" + myID + "_" + userID + "_UpdateTime" : "Dialog_" + userID + "_" + myID + "_UpdateTime"; // задать имя времени обновления диалога для запроса
      localStorage.removeItem(dialogUpdateTimeLocal); // удалить время обновления последнего сообщения, после удаления всех сообщений в диалоге

      // удаляем диалог вида Dialog_25528_1079 с LocalStorage
      let dialogNameLocal = myID > userID ? "Dialog_" + myID + "_" + userID : "Dialog_" + userID + "_" + myID;  // задать имя диалога для запроса
      localStorage.removeItem(dialogNameLocal); // удалить диалог вида Dialog_25528_1079 с LocalStorage, после удаления всех сообщений в диалоге
    }

    return Dialog_3 // вернуть диалог с удаленным сообщением
  },

  updateDialogListUserId: (userId1, userId2, Name2, Photo2) => { // запись в сервер данные о том, что у конкретного пользователя есть диалоги
    let dialogListUserId1 = "DialogList_" + userId1 // задать имя DialogList
    let Data1 = JSON.parse(localStorage.getItem(dialogListUserId1)); // запросить диалоглист с сервера по заданному имени
    if (!Data1) {
      Data1 = [] // если такого диалога на сервере нет, занулить его
    }
    let newDialogLocal = { // новый диалог в диалогЛисте
      dialogId: Data1.length + 1, // id диалога в dialogList
      userId: userId2, // Id пользователя кого добавляем в DialogList
      userName: Name2, // имя пользователя кого добавляем в DialogList
      userPhoto: Photo2 // фото пользователя кого добавляем в DialogList
    }

    let shouldDataUpdate = true; //

    Data1.map((d1) => { // просматриваем весь диалоглист и ставим флаг, если такой диалог в диалогЛисте уже есть, то заново не добавляем
      if (d1.userId === userId2) {
        shouldDataUpdate = false;
        return
      }
    })

    if (shouldDataUpdate) { // если флаг обновления диалоглиста true, то добавляем диалог в диалогЛист
      let Data2 = [...Data1, newDialogLocal];
      localStorage.setItem(dialogListUserId1, JSON.stringify(Data2)); // отправить обновленный диалогЛист LocalStorage
    }
  },

  getDialogListMyID: (myID) => { // получить мой диалогЛист с сервера, сформированный другими пользователями
    let dialogListUserId1 = "DialogList_" + myID // задать имя моего DialogList
    let Data1 = JSON.parse(localStorage.getItem(dialogListUserId1)); // запросить мой диалоглист с сервера
    if (!Data1) {
      Data1 = [] // если такого диалога на сервере нет, занулить его
    }
    return Data1 // вернуть мой диалоглист
  },

  postDialog: (formDataNewMessage, myID, MyName, MyPhoto, userID) => { //отправка сообщения в LocalStorage

    let Dialog_1 = apiDialogs.getDialog(myID, userID); // получить данные Dialog_25528_1079 с LocalStorage

    if (bedug_mode) {
      console.log("apiLocalStorage Dialog_1(getItem): ", Dialog_1)
    } // дебаг

    let Dialog_2 = [...Dialog_1, {// добавить новое сообщение в запрошенный диалог
      id: Dialog_1.length + 1, // задать id сообщения
      Date: GetDate(), // задать время сообщения
      userId: myID, // задать кто написал сообщение
      message: formDataNewMessage // записать сам текст сообщения
    }]
    let Dialog_3 = apiDialogs._setMessages2LS(Dialog_2, myID, userID)// отправить измененый массив на сервер (LocalStorage)

    apiDialogs.updateDialogListUserId(userID, myID, MyName, MyPhoto)
    // формирую DialogList пользователя, кому пишу. У него появятся диалоги, как зайдет в сеть

    // здесь сформирую свой DialogList, чтобы отображалось у меня срузу же после начала диалога.

    return Dialog_3 // вернуть обновленный массив из DAL в BLL

  },

  deleteDialog: (dialogId, userId1, userId2) => { // удаления диалога из диалоглиста по его ID
    let Data1 = apiDialogs.getDialogListMyID(userId1)
    console.log(Data1)
    let Data2 = Data1.filter(d=>d.dialogId!==dialogId)
    console.log(Data2)
    localStorage.setItem("DialogList_" + userId1, JSON.stringify(Data2)); // отправить обновленный диалогЛист LocalStorage

  },

  /*
        // Убираем пользователя из диалогЛиста пользователя с LocalStorage
      let dialogListUserId1 = "DialogList_" + userID // задать имя DialogList
      let Data1 = JSON.parse(localStorage.getItem(dialogListUserId1)); // запросить диалоглист с сервера по заданному имени
      if (!Data1) { // на всякий случай подстраховка проверка
        Data1 = [] // если такого диалога на сервере нет, занулить его
      }
      let Data2 = Data1.filter(d=>d.userId!==myID) // оставить в диалогЛисте пользователя все диалоги, ктоме того,в котором 0 сообщений, кроме
      localStorage.setItem(dialogListUserId1, JSON.stringify(Data2)); // записать в LocalStorage обновленный диалоглист

      // удаляем время последнего обновления диалога с LocalStorage
      let dialogUpdateTimeLocal = myID > userID ? "Dialog_" + myID + "_" + userID + "_UpdateTime" : "Dialog_" + userID + "_" + myID + "_UpdateTime"; // задать имя времени обновления диалога для запроса
      localStorage.removeItem(dialogUpdateTimeLocal); // удалить время обновления последнего сообщения, после удаления всех сообщений в диалоге

      // удаляем диалог вида Dialog_25528_1079 с LocalStorage
      let dialogNameLocal = myID > userID ? "Dialog_" + myID + "_" + userID : "Dialog_" + userID + "_" + myID;  // задать имя диалога для запроса
      localStorage.removeItem(dialogNameLocal); // удалить диалог вида Dialog_25528_1079 с LocalStorage, после удаления всех сообщений в диалоге

  */


}


