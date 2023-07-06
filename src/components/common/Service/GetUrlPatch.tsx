import React, {memo, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {GlobalStateType} from "../../../redux/store-redux";
import {useLocation} from "react-router";
import {getPatch} from "../functions/commonFunctions";
import {appActions} from "../../../redux/app-reducer";


const GetUrlPatch: React.FC = ( () => {
    console.log("GetUrlPatch")

    const {setPatch} = appActions

    const dispatch = useDispatch();

    const patch: string = useSelector((state:GlobalStateType) => state.app.patch)

    const locationPathname = useLocation().pathname

    useEffect( () => { // определение и запись в стор пути из адресной строки бораузера

        const UpdatedPatch = getPatch(locationPathname)

        if (patch!== UpdatedPatch) { // если прошла авторизация и
            dispatch( setPatch( UpdatedPatch ))
            // обновить данные пути patch в app-reducer
        }

    }, [locationPathname, setPatch, patch] )

    return <>
    </>
})
export default GetUrlPatch
