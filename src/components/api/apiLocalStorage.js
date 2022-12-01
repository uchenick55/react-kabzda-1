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
  postDialogs: (formDataNewMessage) => { //formDataNewMessage
    localStorage.setItem("Dialog_25528_1079", JSON.stringify(Dialog_25528_1079));

    //   localStorage.removeItem('LocalStorageDialogs');
    let Dialog_25528_1079_fromServer = apiDialogs.getDialogs();
    console.log(Dialog_25528_1079_fromServer)

    let ModifiedLocalStorageDialogs = Dialog_25528_1079_fromServer.map(d => {
    return console.log(d)
  })

//    localStorage.setItem("Dialog_25528_1079", JSON.stringify(Dialog_25528_1079));
//    console.log(Dialog_25528_1079_fromServer)
    return Dialog_25528_1079_fromServer


    /*      stateCopy = {
            ...state,
            needUpdateFriends: action.needUpdateFriends
          }
        return stateCopy; // вернуть копию стейта*/

//    localStorage.setItem("LocalStorageDialogs", JSON.stringify(LocalStorageDialogs));
  }

}


/*    async (currentPage, pageSize, term, friend = undefined) => {// получить стек пользователей
    const response = await instance.get(`users?count=${pageSize}&page=${currentPage}&term=${term}&friend=${friend}`)
    return (response.data) //возврат данных из поля data
  },*/


//const themeFromLocalStorage = window.localStorage.getItem("theme");


//window.localStorage.setItem("newMessage", formDataNewMessage);
