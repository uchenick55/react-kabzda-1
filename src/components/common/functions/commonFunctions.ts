import {getDispatch, getState} from "../../../redux/store-redux";
import {appActions} from "../../../redux/app-reducer";
import {ErrorType} from "../types/commonTypes";

const getUnixTime = () => {
    return new Date().getTime() // создать и вернуть текущее время в миллисекундах по Unix
}

export const saveDataToNotify = (messageItem:string, style: string = "Warning" ) => {
    setTimeout(()=>{
        getDispatch()( appActions.setNotify( // запись данных ошибки в стейт
            [
                ...getState().app.notify, // берем все ошибки, что уже есть в массиве ошибок
                {
                    message: messageItem, // добавляем сообщение ошибки
                    timeUnix: getUnixTime(), // добавляем время (можно использовать как id)
                    style: style
                }
            ]
        ) )
    },30) // задержка для уникального времеени - ключей рендера
}

export const saveErrorGlobal = (errorGlobal: ErrorType) => {
    getDispatch()( appActions.setAppErrorAC( errorGlobal ) ) // запись данных ошибки в стейт
}

