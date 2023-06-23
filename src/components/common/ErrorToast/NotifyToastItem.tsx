import React, {useEffect, useState} from "react";
import Toast from "react-bootstrap/Toast";
import {NotifyType} from "../types/commonTypes";
import classes from "./notifyToast.module.css";

type NotifyToastItemType = {
    notifyItem: NotifyType,
    closeToast: (notifyItem: NotifyType ) => void
    theme: string
}
const NotifyToastItem:React.FC<NotifyToastItemType> = ({notifyItem, closeToast, theme}) => {
    const [fadeError, setFadeError] = useState<boolean>(false)
    useEffect(()=>{ // разово при загрузке запускаем обратный отсчет
        const intervalId = setTimeout(()=>{ //
           closeToast(notifyItem) // по истечению закрыть ошибку
        }, 9000)
        return ()=>{
            clearInterval(intervalId)
        }
    },[])// не ставлю зависимостей, поскольку развово при запуске
    useEffect(()=>{
        const intervalId = setTimeout(()=>{
            setFadeError(true)
        }, 5000)
        return ()=>{
            clearInterval(intervalId)
        }
    },[])
    return <div key={notifyItem.timeUnix}
                className={fadeError? classes.NotifyToastItemRemove: ""}
    >
        <Toast
               key={notifyItem.timeUnix}
               onClose={() => closeToast(notifyItem)}
               bg={theme}
               className='my-2'
        >
            <Toast.Header className="text-bg-warning ">
                <strong className="me-auto">Warning</strong>
            </Toast.Header>
            <Toast.Body>{notifyItem.error}</Toast.Body>
        </Toast>
    </div>
}
export default NotifyToastItem
