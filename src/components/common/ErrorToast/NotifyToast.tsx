import React from "react";
import classes from "./notifyToast.module.css";
import {NotifyType} from "../types/commonTypes";
import NotifyToastItem from "./NotifyToastItem";

type NotifyToastType = {
    notify: Array<NotifyType>,
    closeToast: (notifyItem: NotifyType ) => void
    theme: string
}
const NotifyToast: React.FC<NotifyToastType> = ({notify, closeToast, theme}) => {

    return <div className={classes.NotifyToast}>
        {notify.map((notifyItem:NotifyType)=>{ // пробегаем по всем элементам массива ошибок
            return <NotifyToastItem // компонента отрисовки одной ошибки
                key={notifyItem.timeUnix}
                closeToast={closeToast}
                notifyItem={notifyItem}
                theme={theme}
            />
        })}
    </div>
}

export default NotifyToast;
