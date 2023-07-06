import store from "../../../redux/store-redux";
import {appActions} from "../../../redux/app-reducer";

const getUnixTime = () => {
    return new Date().getTime() // создать и вернуть текущее время в миллисекундах по Unix
}

export const saveDataToNotify = (messageItem:string, style: string = "Warning" ) => {
    setTimeout(()=>{
        store.dispatch( appActions.setNotify( // запись данных ошибки в стейт
            [
                ...store.getState().app.notify, // берем все ошибки, что уже есть в массиве ошибок
                {
                    message: messageItem, // добавляем сообщение ошибки
                    timeUnix: getUnixTime(), // добавляем время (можно использовать как id)
                    style: style
                }
            ]
        ) )
    },30) // задержка для уникального времеени - ключей рендера
}

export const getPatch = (locationPathname:string) => {
    const patch = locationPathname // путь из URL вида /profile
        .split( "" ) // разделить все на массив ['/', 'd', 'i', 'a', 'l', 'o', 'g', 's', '/', '2', '8', '8', '3', '1',]
    const tempPath: Array<String> = [] // задать пустой массив
    for (let i: number = 1; i < patch.length; i++) { // начиная со второго элемента, первый элемент всегда '/'
        if (patch[i] === '/') {
            break // прервать цикл, если встречаем /
        }
        tempPath.push( patch[i] ) // добавляем элементы в массив
    }
    const UpdatedPatch: string = tempPath.join( "" ) // итоговый путь

    return UpdatedPatch

}
