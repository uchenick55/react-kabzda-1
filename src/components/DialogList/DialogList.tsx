import React, {useEffect} from 'react'; // импорт реакта
import MessagesContainer from "./Messages/MessagesContainer";

type DialogListType = {
    getDialogList: () => void,
    getDialogLastUpdateTime: () => void
}
const DialogList: React.FC<DialogListType> = ({getDialogList, getDialogLastUpdateTime}) => { // основная компонента отрисовки диалогов

    useEffect( () => { // при очередном ререндере
        const id = setInterval( () => { // задать цикл с интервалом в 1 сек
            getDialogLastUpdateTime() // получить время обновления текущего диалога
            getDialogList()// получить диалогЛист (мне кто то написал, или я начал диалог)
        }, 1000 )
        return (() => {
            clearInterval( id )
        }) // для сброса цикла при очередном рендере
    }, [getDialogLastUpdateTime, getDialogList] ) // useEffect без зависимостей

    return <MessagesContainer/>
    //отрисовка сообщений

}
export default DialogList;

