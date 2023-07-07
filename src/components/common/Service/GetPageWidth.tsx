import React, {useEffect} from "react";
import {appActions} from "../../../redux/app-reducer";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../redux/store-redux";

const GetPageWidth: React.FC = () => {
    console.log("GetPageWidth")

    const {setPageWidth} = appActions

    const dispatch = useDispatch<AppDispatch>();

    const setPageWidthLocal  = () => { //записываем ширину окна в стор
        const pageWidth1 = document.documentElement.scrollWidth// изменяем ширину окна сразу
        setTimeout( () => { // делаем задержку
            const pageWidth2 = document.documentElement.scrollWidth // и повторно измеряем ширину окна
            if (pageWidth1 === pageWidth2) { // если дина не меняется больше чем время задержки,
                dispatch(setPageWidth( pageWidth1 )) //пушим длину в стор (защита от частого обновления стора)
            }
        }, 300 ) // время задержки между измерениями ширины окна
    }

    useEffect(()=>{
        window.addEventListener('resize', setPageWidthLocal) // открыть слушатель размеров окна
        return ()=>{ // в случае демонтирования компоненты
            window.removeEventListener('resize', setPageWidthLocal)// закрыть слушатель размера окна
        }
    },[])

    return <>
    </>
}
export default GetPageWidth
