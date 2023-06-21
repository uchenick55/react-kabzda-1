import React, {useState} from 'react';
import Toast from 'react-bootstrap/Toast';
import {Error200Type} from "../types/commonTypes";
import classes from "./errorToast.module.css"
import ErrorToastItem from "./ErrorToastItem";

type ErrorToastType = {
    error200: Array<Error200Type>,
    moveError200ItemToArchive: (error200Item: number) => void
}
const ErrorToast: React.FC<ErrorToastType> = ({error200, moveError200ItemToArchive}) => {
    return <div>

        {error200.map((error200Item: Error200Type )=> {
            return <ErrorToastItem
                key={error200Item.timeUnix}
                error200Item={error200Item}
                moveError200ItemToArchive={moveError200ItemToArchive}
            />
        })}
    </div>
}

export default ErrorToast;
