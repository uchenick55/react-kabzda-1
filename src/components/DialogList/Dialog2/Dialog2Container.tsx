import React, {useEffect} from "react";
import {connect} from "react-redux";
import {GlobalStateType} from "../../../redux/store-redux";
import {getDialog2MessagesActionCreator, putDialog2StartActionCreator} from "../../../redux/dialog2-reducer";

type DialogContainerType = {
    putDialog2StartActionCreator: (currentDialogId:number) => void,
    getDialog2MessagesActionCreator: (userId: number, page:number, count:number) => void,

}
const Dialog2Container:React.FC<DialogContainerType> = (
    {putDialog2StartActionCreator, getDialog2MessagesActionCreator}
    ) => {
    useEffect(()=>{
       // putDialog2StartActionCreator(27045)
        getDialog2MessagesActionCreator(27045, 1, 10)
    },[])
    return <div>
        123
    </div>
}
const mapStateToProps = (state:GlobalStateType) => {
    return {

    }
}
type mapStateToPropsType = {

}
type mapDispatchToPropsType = {
    putDialog2StartActionCreator: (currentDialogId:number) => void,
    getDialog2MessagesActionCreator: (userId: number, page:number, count:number) => void,
}
export default connect<
    mapStateToPropsType,
    mapDispatchToPropsType,
    unknown,
    GlobalStateType
    >(mapStateToProps,{
    putDialog2StartActionCreator, getDialog2MessagesActionCreator
})(Dialog2Container)
