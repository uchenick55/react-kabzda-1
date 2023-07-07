import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {GlobalStateType} from "../../../redux/store-redux";
import {useLocation} from "react-router";
import {appActions} from "../../../redux/app-reducer";

const GetUrlPatch: React.FC = (() => {
    console.log( "GetUrlPatch" )

    const {setPatch} = appActions

    const dispatch = useDispatch();

    const patch: string = useSelector( (state: GlobalStateType) => state.app.patch )

    const location = useLocation()

    useEffect( () => { // определение и запись в стор пути из адресной строки бораузера

        if (!(patch !== "" && location.pathname.includes( patch ))) {
            const patchArray = location.pathname // путь из URL вида /profile
                .split( "" ) // разделить все на массив ['/', 'd', 'i', 'a', 'l', 'o', 'g', 's', '/', '2', '8', '8', '3', '1',]
            const tempPath: Array<String> = [] // задать пустой массив
            for (let i: number = 1; i < patchArray.length; i++) { // начиная со второго элемента, первый элемент всегда '/'
                if (patchArray[i] === '/') {
                    break // прервать цикл, если встречаем /
                }
                tempPath.push( patchArray[i] ) // добавляем элементы в массив
            }
            const UpdatedPatch: string = tempPath.join( "" ) // итоговый путь
            console.log("dispatch UpdatedPatch:", UpdatedPatch)
            dispatch( setPatch( UpdatedPatch ) )// обновить данные пути patch в app-reducer

        }


    }, [location, setPatch, patch] )

    return <>
    </>
})
export default GetUrlPatch
