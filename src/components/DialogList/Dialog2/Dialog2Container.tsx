import React, {useEffect} from "react";
import {connect} from "react-redux";
import {GlobalStateType} from "../../../redux/store-redux";
import {
    getDialog2MessageIdViewedThCr,
    getDialog2MessagesThCr,
    postDialog2MessageThCr,
    putDialog2StartThCr
} from "../../../redux/dialog2-reducer";

type DialogContainerType = {
    putDialog2StartThCr: (currentDialogId:number) => void,
    getDialog2MessagesThCr: (userId: number, page:number, count:number) => void,
    postDialog2MessageThCr: (userId: number, body:string) => void,
    getDialog2MessageIdViewedThCr: (messageId: string) => void,

}
const Dialog2Container:React.FC<DialogContainerType> = (
    {putDialog2StartThCr, getDialog2MessagesThCr, postDialog2MessageThCr,
        getDialog2MessageIdViewedThCr}
    ) => {
    useEffect(()=>{
       // putDialog2StartThCr(27045)
        //postDialog2MessageThCr(27045, "555")
        //getDialog2MessagesThCr(25528, 1, 10)
        getDialog2MessageIdViewedThCr("cde7821a-6981-4f49-8b12-faf681cb1621")
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
    putDialog2StartThCr: (currentDialogId:number) => void,
    getDialog2MessagesThCr: (userId: number, page:number, count:number) => void,
    postDialog2MessageThCr: (userId: number, body:string) => void,
    getDialog2MessageIdViewedThCr: (messageId: string) => void,
}
export default connect<
    mapStateToPropsType,
    mapDispatchToPropsType,
    unknown,
    GlobalStateType
    >(mapStateToProps,{
    putDialog2StartThCr, getDialog2MessagesThCr, postDialog2MessageThCr,
    getDialog2MessageIdViewedThCr
})(Dialog2Container)
