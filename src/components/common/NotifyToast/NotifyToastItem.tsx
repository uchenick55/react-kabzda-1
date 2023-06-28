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
    console.log("NotifyToastItem")
    const [fadeError, setFadeError] = useState<boolean>(false)
    useEffect(()=>{ // разово при загрузке запускаем обратный отсчет
        const intervalId = setTimeout(()=>{ //
           closeToast(notifyItem) // по истечению закрыть ошибку
        }, 9000)
        return ()=>{
            clearInterval(intervalId)
        }
    },[])// не ставлю зависимостей closeToast' and 'notifyItem', поскольку разово при запуске
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
            <Toast.Header className={`text-bg-${notifyItem.style.toLowerCase()}`}>
                <strong className="me-auto">{notifyItem.style}</strong>
            </Toast.Header>
            <Toast.Body>{
                notifyItem.message === "You are not authorized"
                    ? <a href='#/login'
                         className={classes.liginLink}
                         onClick={()=>closeToast(notifyItem)}
                    >{notifyItem.message}</a>
                    : notifyItem.message
            }</Toast.Body>
        </Toast>
    </div>
}
export default NotifyToastItem
