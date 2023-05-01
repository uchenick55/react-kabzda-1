import React, {useEffect} from "react";
import {connect} from "react-redux";
import {GlobalStateType} from "../../../redux/store-redux";
import {
    getDialog2MessageIdViewedThCr,
    getDialog2MessagesThCr, postDialog2MessageIdToSpamThCr,
    postDialog2MessageThCr,
    putDialog2StartThCr
} from "../../../redux/dialog2-reducer";

type DialogContainerType = {
    putDialog2StartThCr: (currentDialogId:number) => void,
    getDialog2MessagesThCr: (userId: number, page:number, count:number) => void,
    postDialog2MessageThCr: (userId: number, body:string) => void,
    getDialog2MessageIdViewedThCr: (messageId: string) => void,
    postDialog2MessageIdToSpamThCr: (messageId: string) => void,

}
const Dialog2Container:React.FC<DialogContainerType> = (
    {putDialog2StartThCr, getDialog2MessagesThCr, postDialog2MessageThCr,
        getDialog2MessageIdViewedThCr, postDialog2MessageIdToSpamThCr}
    ) => {
    //cde7821a-6981-4f49-8b12-faf681cb1621 от "555"
    // 84ac68ee-73d0-43c4-82bb-0fd0273d4808 (привет андрей)
    // 25528  | 27045
    useEffect(()=>{
       // putDialog2StartThCr(25528)
       // postDialog2MessageThCr(25528, "привет андрей")// отправить сообщение указав ID пользователя
        getDialog2MessagesThCr(9999999999, 1, 10) // получить инфо сколько непрочтенных сообщений указав ID пользователя
       // getDialog2MessageIdViewedThCr("84ac68ee-73d0-43c4-82bb-0fd0273d4808") // проверить прочитано ли сообщение по его ID
       // postDialog2MessageIdToSpamThCr("cde7821a-6981-4f49-8b12-faf681cb1621") // пометить как спам сообщение по его ID
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
    postDialog2MessageIdToSpamThCr: (messageId: string) => void,
}
export default connect<
    mapStateToPropsType,
    mapDispatchToPropsType,
    unknown,
    GlobalStateType
    >(mapStateToProps,{
    putDialog2StartThCr, getDialog2MessagesThCr, postDialog2MessageThCr,
    getDialog2MessageIdViewedThCr, postDialog2MessageIdToSpamThCr
})(Dialog2Container)
