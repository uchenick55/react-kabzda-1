import Dropdown from 'react-bootstrap/Dropdown';
import classes from "./messages2Render.module.scss"
import React, {memo} from "react";
import dustBin from "../../../assets/images/swg/dust-bin2.svg"
import Spam from "../../../assets/images/swg/spam1.svg"
import Restore from "../../../assets/images/swg/restore1.svg"

type Msg2DropDownMenuType = {
    id: string
    isMyMessage: boolean // индикатор, мое ли это сообщение
    deletedBySender: boolean // помечено, удалено отправителем
    isSpam: boolean // помечено как спам
    Msg2DeleteMessage: (message2Id: string) => void // удаление сообщения по его id
    Msg2MarkAsSpam: (message2Id: string)=> void // пометить сообщение как спам
    Msg2Restore:  (message2Id: string)=> void // восстановить сообщение из спама и удаленных

}
const Msg2DropDownMenu: React.FC<Msg2DropDownMenuType> = memo( (
    {Msg2DeleteMessage, id, isMyMessage, Msg2MarkAsSpam, Msg2Restore, deletedBySender, isSpam}) => {
    console.log("Msg2DropDownMenu")
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
                            Msg2DeleteMessage( id ) // удалить сообщение по его id
                        }}>
                            <div className={classes.DropdownItem}>Удалить у меня</div>
                            <img src={dustBin} className={classes.imgDelete} alt="Удалить у меня"/>
                        </Dropdown.Item>}
                        {(!isMyMessage && !isSpam) && <Dropdown.Item className={classes.positionRelative} eventKey="2" onClick={() => {
                            Msg2MarkAsSpam( id ) // пометить сообщение как спам по его id
                        }}>
                            <div className={classes.DropdownItem}>В спам</div>
                            <img src={Spam} className={classes.imgSpam} alt="В спам"/>
                        </Dropdown.Item>}
                        {(deletedBySender || isSpam ) && <Dropdown.Item className={classes.positionRelative} eventKey="3" onClick={() => {
                            Msg2Restore( id ) // восстановить сообщение из спама и удаленных
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
