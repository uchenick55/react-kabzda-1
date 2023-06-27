import Dropdown from 'react-bootstrap/Dropdown';
import classes from "../msg2.module.css"
import React, {memo} from "react";
import dustBin from "../../../../assets/images/swg/dust-bin2.svg"
import Spam from "../../../../assets/images/swg/spam1.svg"
import Restore from "../../../../assets/images/swg/restore1.svg"
import {
    deleteDialog2MessageIdThCr,
    postDialog2MessageIdToSpamThCr,
    putDialog2MessageIdRestoreThCr
} from "../../../../redux/dialog2-reducer";
import {useDispatch} from "react-redux";

type Msg2DropDownMenuType = {
    id: string
    isMyMessage: boolean // индикатор, мое ли это сообщение
    deletedBySender: boolean // помечено, удалено отправителем
    isSpam: boolean // помечено как спам

}
const Msg2DropDownMenu: React.FC<Msg2DropDownMenuType> = memo( (
    { id, isMyMessage, deletedBySender, isSpam}) => {
   // console.log("Msg2DropDownMenu")

    const dispatch = useDispatch()

    return (
        <>
            <div>
                <Dropdown>
                    <Dropdown.Toggle className={
                        `${isMyMessage ? classes.Msg2DropDownMenuIntMy : classes.Msg2DropDownMenuIntNotMy} 
                         ${classes.Msg2DropDownMenuIntCommon}`}>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className={classes.Msg2DropDownItems}>
                        {!deletedBySender && <Dropdown.Item className={classes.positionRelative} eventKey="1" onClick={() => {
                            dispatch (deleteDialog2MessageIdThCr(id))// удалить сообщение по его id
                        }}>
                            <div className={classes.DropdownItem}>Удалить у меня</div>
                            <img src={dustBin} className={classes.imgDelete} alt="Удалить у меня"/>
                        </Dropdown.Item>}
                        {(!isMyMessage && !isSpam) && <Dropdown.Item className={classes.positionRelative} eventKey="2" onClick={() => {
                            dispatch( postDialog2MessageIdToSpamThCr(id))// пометить сообщение как спам по его id
                        }}>
                            <div className={classes.DropdownItem}>В спам</div>
                            <img src={Spam} className={classes.imgSpam} alt="В спам"/>
                        </Dropdown.Item>}
                        {(deletedBySender || isSpam ) && <Dropdown.Item className={classes.positionRelative} eventKey="3" onClick={() => {
                           dispatch( putDialog2MessageIdRestoreThCr(id)) // восстановить сообщение из спама и удаленных
                        }}>
                            <div className={classes.DropdownItem}>Восстановить</div>
                            <img src={Restore} className={classes.imgRestore} alt="Восстановить"/>
                        </Dropdown.Item>}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </>
    );
})

export default Msg2DropDownMenu;
