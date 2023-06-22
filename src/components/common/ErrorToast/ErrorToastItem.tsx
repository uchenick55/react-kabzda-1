import React, {useEffect, useState} from "react";
import Toast from "react-bootstrap/Toast";
import {Error200Type} from "../types/commonTypes";
import classes from "./errorToast.module.css";

type ErrorToastItemType = {
    error200Item: Error200Type,
    closeToast: (error200Item: Error200Type ) => void
    theme: string
}
const ErrorToastItem:React.FC<ErrorToastItemType> = ({error200Item, closeToast, theme}) => {
    const [fadeError, setFadeError] = useState<boolean>(false)
    useEffect(()=>{ // разово при загрузке запускаем обратный отсчет
        const intervalId = setTimeout(()=>{ //
           closeToast(error200Item) // по истечению закрыть ошибку
        }, 9000)
        return ()=>{
            clearInterval(intervalId)
        }
    },[])
    useEffect(()=>{
        const intervalId = setTimeout(()=>{
            setFadeError(true)
        }, 5000)
        return ()=>{
            clearInterval(intervalId)
        }
    },[])
    return <div key={error200Item.timeUnix}
                className={fadeError? classes.ErrorToastItemRemove: classes.ErrorToastItem}
    >
        <Toast
               key={error200Item.timeUnix}
               onClose={() => closeToast(error200Item)}
               bg={theme}
               className='my-2'
        >
            <Toast.Header className="text-bg-warning ">
                <strong className="me-auto">Warning</strong>
            </Toast.Header>
            <Toast.Body>{error200Item.error}</Toast.Body>
        </Toast>
    </div>
}
export default ErrorToastItem
