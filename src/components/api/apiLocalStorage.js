let Dialog_25528_1079, Dialog_25000_1000;

let LocalStorageDialogs = [
  Dialog_25528_1079 = [
    {"id": 1, "userId": "25528", "message": "Привет, как дела?"},
    {id: 2, userId: 1079, message: "Нормально, только погода на улице не очень"},
    {id: 3, userId: 25528, message: "Чем думаешь заняться сегодня?"},
    {id: 4, userId: 1079, message: "Нужно картошки в магазине купить"},
  ]
  , Dialog_25000_1000 = [
    {"id": 1, "userId": "25528", "message": "Привет, как дела2?"},
    {id: 2, userId: 1079, message: "Нормально, только погода на улице не очень2"},
    {id: 3, userId: 25528, message: "Чем думаешь заняться сегодня?2"},
    {id: 4, userId: 1079, message: "Нужно картошки в магазине купить2"},
  ]
]

export let apiDialogs = { // объект с методами api для Dialogs
  getDialogs: () => {
    LocalStorageDialogs = JSON.parse(localStorage.getItem("LocalStorageDialogs"));
    return LocalStorageDialogs
  },
  postDialogs: (formDataNewMessage) => { //formDataNewMessage
    //console.log(apiDialogs.getDialogs())
    localStorage.setItem("LocalStorageDialogs", JSON.stringify(LocalStorageDialogs));
  }

}


/*    async (currentPage, pageSize, term, friend = undefined) => {// получить стек пользователей
    const response = await instance.get(`users?count=${pageSize}&page=${currentPage}&term=${term}&friend=${friend}`)
    return (response.data) //возврат данных из поля data
  },*/


//const themeFromLocalStorage = window.localStorage.getItem("theme");


//window.localStorage.setItem("newMessage", formDataNewMessage);
