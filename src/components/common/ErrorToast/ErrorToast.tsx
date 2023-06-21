import React, {useEffect} from "react";
import Toast from "react-bootstrap/Toast";
import classes from "./errorToast.module.css";
import {Error200Type} from "../types/commonTypes";
import ErrorToastItem from "./ErrorToastItem";

type ErrorToastType = {
    error200: Array<Error200Type>,
    closeToast: (error200Item: Error200Type ) => void
}
const ErrorToast: React.FC<ErrorToastType> = ({error200, closeToast}) => {

    return <div className={classes.ErrorToast}>
        {error200.map((error200Item:Error200Type)=>{ // пробегаем по всем элементам массива ошибок
            return <ErrorToastItem // компонента отрисовки одной ошибки
                key={error200Item.timeUnix}
                closeToast={closeToast}
                error200Item={error200Item}
            />
        })}
    </div>
}

export default ErrorToast;
