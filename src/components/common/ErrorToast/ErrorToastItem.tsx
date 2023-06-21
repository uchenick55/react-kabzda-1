import React, {useEffect} from "react";
import Toast from "react-bootstrap/Toast";
import {Error200Type} from "../types/commonTypes";
import classes from "./errorToast.module.css";

type ErrorToastItemType = {
    error200Item: Error200Type,
    closeToast: (error200Item: Error200Type ) => void

}
const ErrorToastItem:React.FC<ErrorToastItemType> = ({error200Item, closeToast}) => {
    useEffect(()=>{ // разово при загрузке запускаем обратный отсчет
        setTimeout(()=>{ //
            closeToast(error200Item) // по истечению закрыть ошибку
        }, 10000)
    },[])
    return <div key={error200Item.timeUnix}>
        <Toast
               key={error200Item.timeUnix}
               onClose={() => closeToast(error200Item)}
        >
            <Toast.Header>
                <strong className="me-auto">Warning</strong>
            </Toast.Header>
            <Toast.Body>{error200Item.error}</Toast.Body>
        </Toast>
    </div>
}
export default ErrorToastItem
