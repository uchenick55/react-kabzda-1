import store from "../../../redux/store-redux";
import {appActions} from "../../../redux/app-reducer";

const getUnixTime = () => {
    return new Date().getTime() // создать и вернуть текущее время в миллисекундах по Unix
}

export const saveDataToNotify = (messageItem:string) => {
    setTimeout(()=>{
        store.dispatch( appActions.setNotify( // запись данных ошибки в стейт
            [
                ...store.getState().app.notify, // берем все ошибки, что уже есть в массиве ошибок
                {
                    error: messageItem, // добавляем сообщение ошибки
                    timeUnix: getUnixTime() // добавляем время (можно использовать как id)
                }
            ]
        ) )
    },30) // задержка для уникального времеени - ключей рендера
}
