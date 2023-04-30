import React, {useEffect} from "react";
import {connect} from "react-redux";
import {GlobalStateType} from "../../../redux/store-redux";
import {putDialog2StartActionCreator} from "../../../redux/dialog2-reducer";

type DialogContainerType = {
    putDialog2StartActionCreator: (currentDialogId:number) => void
}
const Dialog2Container:React.FC<DialogContainerType> = ({putDialog2StartActionCreator}) => {
    useEffect(()=>{
        putDialog2StartActionCreator(27045)
    },[])
    return <div>
        123
    </div>
}
const mapStateToProps = (state:GlobalStateType) => {
    return {

    }
}
export default connect(mapStateToProps,{putDialog2StartActionCreator})(Dialog2Container)
