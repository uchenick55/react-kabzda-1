import React, {useEffect} from "react";
import {connect} from "react-redux";
import {GlobalStateType} from "../../../redux/store-redux";
import {
    deleteDialog2MessageIdThCr,
    getDialog2MessageIdViewedThCr, getDialog2MessagesNewerThenThCr,
    getDialog2AllThCr, postDialog2MessageIdToSpamThCr,
    postDialog2MessageThCr, putDialog2MessageIdRestoreThCr,
    putDialog2StartThCr, getDailog2UnreadMessagesThCr
} from "../../../redux/dialog2-reducer";

type DialogContainerType = {
    putDialog2StartThCr: (currentDialogId:number) => void,
    getDialog2AllThCr: (userId: number, page:number, count:number) => void,
    postDialog2MessageThCr: (userId: number, body:string) => void,
    getDialog2MessageIdViewedThCr: (messageId: string) => void,
    postDialog2MessageIdToSpamThCr: (messageId: string) => void,
    deleteDialog2MessageIdThCr: (messageId: string) => void,
    putDialog2MessageIdRestoreThCr: (messageId: string) => void,
    getDialog2MessagesNewerThenThCr: (userId: number, date:string) => void,
    getDailog2UnreadMessagesThCr: () => void,

}
const Dialog2Container:React.FC<DialogContainerType> = (
    {putDialog2StartThCr, getDialog2AllThCr, postDialog2MessageThCr,
        getDialog2MessageIdViewedThCr, postDialog2MessageIdToSpamThCr, deleteDialog2MessageIdThCr,
        putDialog2MessageIdRestoreThCr, getDialog2MessagesNewerThenThCr, getDailog2UnreadMessagesThCr}
    ) => {
    //cde7821a-6981-4f49-8b12-faf681cb1621 от "555"
    // 84ac68ee-73d0-43c4-82bb-0fd0273d4808 (привет андрей)
    // 25528  | 27045 | 1079
    useEffect(()=>{
       //putDialog2StartThCr(1079)
        //postDialog2MessageThCr(25528, "to 25528_2")// отправить сообщение указав ID пользователя
        //  getDialog2AllThCr(9999999999, 1, 10) // получить список всех диалогов
        //  getDialog2MessageIdViewedThCr("84ac68ee-73d0-43c4-82bb-0fd0273d4808") // проверить прочитано ли сообщение по его ID
        // postDialog2MessageIdToSpamThCr("cde7821a-6981-4f49-8b12-faf681cb1621") // пометить как спам сообщение по его ID
        // deleteDialog2MessageIdThCr("cde7821a-6981-4f49-8b12-faf681cb1621") // - удалить сообщение (только у себя) по ID сообщения
        // putDialog2MessageIdRestoreThCr("cde7821a-6981-4f49-8b12-faf681cb1621") // - восстановить сообщение из спама и удаленных
         getDialog2MessagesNewerThenThCr(27045, "2023-04-30T19:10:31.843") // получить все сообщения от указанного ID пользователя новее чем указанная дата
        // getDailog2UnreadMessagesThCr() // - вернуть количество непрочтенных сообщений
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
    getDialog2AllThCr: (userId: number, page:number, count:number) => void,
    postDialog2MessageThCr: (userId: number, body:string) => void,
    getDialog2MessageIdViewedThCr: (messageId: string) => void,
    postDialog2MessageIdToSpamThCr: (messageId: string) => void,
    deleteDialog2MessageIdThCr: (messageId: string) => void,
    putDialog2MessageIdRestoreThCr: (messageId: string) => void,
    getDialog2MessagesNewerThenThCr: (userId: number, date:string) => void,
    getDailog2UnreadMessagesThCr: () => void,

}
export default connect<
    mapStateToPropsType,
    mapDispatchToPropsType,
    unknown,
    GlobalStateType
    >(mapStateToProps,{
    putDialog2StartThCr, getDialog2AllThCr, postDialog2MessageThCr,
    getDialog2MessageIdViewedThCr, postDialog2MessageIdToSpamThCr, deleteDialog2MessageIdThCr,
    putDialog2MessageIdRestoreThCr, getDialog2MessagesNewerThenThCr, getDailog2UnreadMessagesThCr
})(Dialog2Container)
