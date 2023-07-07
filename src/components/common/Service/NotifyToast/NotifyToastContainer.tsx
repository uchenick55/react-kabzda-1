import React from "react";
import NotifyToast from "./NotifyToast";
import {useDispatch, useSelector} from "react-redux";
import {GlobalStateType} from "../../../../redux/store-redux";
import {appActions} from "../../../../redux/app-reducer";
import {NotifyType} from "../../types/commonTypes";

const NotifyToastContainer: React.FC = () => {
    console.log("NotifyToastContainer")
    const notify = useSelector(((state:GlobalStateType) => state.app.notify)) // массив ошибок 200
    const theme = useSelector(((state:GlobalStateType) => state.theme.themeBLL)) // тема для ошибок

    const {setNotifyArchive} = appActions // извлекаем колбэк архивации ошибки
    const dispatch = useDispatch()

    const closeToast = (notifyItem: NotifyType ) => { // колбэк закрытия ошибки
        dispatch(setNotifyArchive(notifyItem))
    }
    return <div>
        {notify.length>0 && <NotifyToast notify={notify} closeToast={closeToast} theme={theme}/>}
    </div>
}
export default NotifyToastContainer
