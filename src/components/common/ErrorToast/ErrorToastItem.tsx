import React, {useEffect, useState} from "react";
import Toast from "react-bootstrap/Toast";
import classes from "./errorToast.module.css";
import {Error200Type} from "../types/commonTypes";

type ErrorToastItemType = {
    error200Item: Error200Type,
    moveError200ItemToArchive: (error200Item: number) => void
}
const ErrorToastItem:React.FC<ErrorToastItemType> = ({error200Item, moveError200ItemToArchive}) => {
    const [close, setClose] = useState<boolean>(false)
    const setCloseLocal = () => {// таймер исчезания окна после начала движения вверх
        setClose((close)=> true)
        setTimeout(() => {
            moveError200ItemToArchive(error200Item.timeUnix)
        }, 2000)

      //  clearTimeout(timerId)
    }
    useEffect(()=>{
       const clear = setInterval(() => { // таймер начала движения вверх после отображения окна
            setCloseLocal()
        }, 3000)
        return () => {
            clearInterval(clear)
        };
    },[])
    return <Toast
        className={close? classes.ErrorToastRemove: classes.ErrorToast }
        key={error200Item.timeUnix}
        onClose={() => setCloseLocal()}
    >
        <Toast.Header>
            <strong className="me-auto">Warning</strong>
        </Toast.Header>
        <Toast.Body>{error200Item.error}</Toast.Body>
    </Toast>
}
export default ErrorToastItem
