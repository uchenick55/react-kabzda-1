export const apiCommon = { // объект с методами api для общих нужд
  putTheme1: (theme1) => { // задание theme1 в localStorage
    if (!theme1) {
      theme1="light" // задаем значение темы по умолчанию
    }
    localStorage.setItem("theme1", JSON.stringify(theme1)); // отправить theme1 в LocalStorage
     // запросить тему с localStorage после записи
    return apiCommon.getTheme1() //вернуть тему после записи
  },
  getTheme1: () => { // получение theme1 из localStorage
    let Data1 = JSON.parse(localStorage.getItem("theme1")); // получить theme1 из LocalStorage
    if (!Data1) {
      Data1="light" // задаем значение темы по умолчанию
      apiCommon.putTheme1(Data1) // записываем тему по умолчанию в localStorage если ее нет
    }
    return Data1 // вернуть тему после считывания
  },
}
