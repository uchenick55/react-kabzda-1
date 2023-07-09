import React from "react";
import Preloader from "../Preloader/Preloader";
import {useSelector} from "react-redux";
import {GlobalStateType} from "../../../redux/store-redux";

const IsFetchingPreloader: React.FC = () => {
  // console.log("IsFetchingPreloader")
    const isFetchingArray: Array<string> = useSelector((state:GlobalStateType) => state.app.isFetchingArray)

    return <>
        {isFetchingArray.length>0 && <Preloader/>} {/* общий прелоадер при загрузке*/}
    </>
}
export default IsFetchingPreloader
