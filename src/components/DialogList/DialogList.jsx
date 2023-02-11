import React, {useEffect} from 'react'; // импорт реакта
import classes from './DialogList.module.css';// css обработка
import DialogItem from "./DialogItem/DialogItem";// подкомпонента отрисовки диалогов через map
import ScrollContainer from "../common/Scroll/ScrollContainer";
import userPhotoAva from "../../assets/images/no-image3.png";
import DialogContainer from "../Messages/MessagesContainer";

const DialogList = ({deleteDialog, dialogUserID, getDialogList, dialogs2,
                     getDialogLastUpdateTime}) => { // основная компонента отрисовки диалогов

    let dialogElements = dialogs2.map((d) => // подкомпонента отрисовки всех диалогов через map
        {
            let userPhoto = d.userPhoto ? d.userPhoto : userPhotoAva; // если аватарки с сервера нет, подставить заглушку
            return <DialogItem key={d.userId} userName={d.userName} userId={d.userId}
                               userPhoto={userPhoto} dialogUserID={dialogUserID}
                               deleteDialog={deleteDialog} dialogId={d.dialogId}
            />
        }
    );

    useEffect(() => { // при очередном ререндере
        const id = setInterval(() => { // задать цикл с интервалом в 1 сек
            getDialogLastUpdateTime() // получить время обновления текущего диалога
            getDialogList()// получить диалогЛист (мне кто то написал, или я начал диалог)
        }, 1000)
        return (() => {
            clearInterval(id)
        }) // для сброса цикла при очередном рендере
    }, [getDialogLastUpdateTime, getDialogList]) // useEffect без зависимостей



    return (
        <div className={classes.dialogs} /*стиль всех диалогов*/>
            <div>
                <h3 className={classes.dialogListHeader}>dialogList</h3>
                <div className={classes.dialogContainer}>
                    <ScrollContainer // обернуть сообщения скролом
                        child={dialogElements}
                        height={window.screen.availHeight - 277} // высота поля скрола
                        firstInsideContainer={"DialogsUp"}
                        secondInsideContainer={"DialogsDown"}
                        containerElement={"DialogsContainer123"}
                    /> {/*отрисовка диалогов в скрол контейнере*/}</div>

            </div>
            <div>
                <DialogContainer/> {/*отрисовка диалога независомо от диалогЛиста*/}
            </div>
        </div>
    )
}
export default DialogList;

