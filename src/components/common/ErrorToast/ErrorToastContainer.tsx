import React from "react";
import ErrorToast from "./ErrorToast";
import {useDispatch, useSelector} from "react-redux";
import {GlobalStateType} from "../../../redux/store-redux";
import {appActions} from "../../../redux/app-reducer";
import {Error200Type} from "../types/commonTypes";

const ErrorToastContainer: React.FC = () => {
    console.log("ErrorToastContainer")
    const error200 = useSelector(((state:GlobalStateType) => state.app.error200)) // массив ошибок 200
    const theme = useSelector(((state:GlobalStateType) => state.theme.themeBLL)) // тема для ошибок

    const {setErrorArchive} = appActions // извлекаем колбэк архивации ошибки
    const dispatch = useDispatch()

    const closeToast = (error200Item: Error200Type ) => { // колбэк закрытия ошибки
        dispatch(setErrorArchive(error200Item))
    }
    return <div>
        <ErrorToast error200={error200} closeToast={closeToast} theme={theme}/>
    </div>
}
export default ErrorToastContainer
