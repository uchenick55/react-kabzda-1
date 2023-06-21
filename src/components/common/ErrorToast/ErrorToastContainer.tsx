import ErrorToast from "./ErrorToast";
import React from "react";
import {ApiErrorMsgType} from "../../api/apiTypes";
import {useDispatch, useSelector} from "react-redux";
import {GlobalStateType} from "../../../redux/store-redux";
import {appActions} from "../../../redux/app-reducer";
import {Error200Type} from "../types/commonTypes";

const ErrorToastContainer: React.FC = () => {
    const dispatch = useDispatch()
    const error200: Array<Error200Type> = useSelector((state: GlobalStateType ) => state.app.error200 )
    const error200Archive: Array<Error200Type> = useSelector((state: GlobalStateType ) => state.app.error200Archive )

    const moveError200ItemToArchive = (error200ItemId: number) => {// перенести ошибку в архив (крестик)

        //Выделяем текущий Error200Type
        const error200Item: Error200Type = error200.filter((error200Item:Error200Type)=>error200Item.timeUnix===error200ItemId)[0]

        //удалили Error200Type из массива ошибок, который рендерится
        dispatch (appActions.setError200(error200.filter((error200Item:Error200Type)=>error200Item.timeUnix!==error200ItemId))) // запись данных ошибки в стейт
        // добавили Error200Type в архив
        dispatch (appActions.setErrorArchive([...error200Archive, error200Item]))
    }

    return <div>
        {<ErrorToast error200={error200} moveError200ItemToArchive={moveError200ItemToArchive}/>}  {/*error200.length > 0 &&*/}
    </div>
}
export default ErrorToastContainer
