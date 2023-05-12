import Dropdown from 'react-bootstrap/Dropdown';
import classes from "./messages2Render.module.scss"
import React from "react";
import dustBin from "../../../assets/images/swg/dust-bin2.svg"
import spam from "../../../assets/images/swg/spam2.svg"

type Msg2DropDownMenuType = {
    id: string
    isMyMessage: boolean // индикатор, мое ли это сообщение
    Msg2DeleteMessage: (message2Id: string) => void // удаление сообщения по его id
    Msg2MarkAsSpam: (message2Id: string)=> void // пометить сообщение как спам

}
const Msg2DropDownMenu: React.FC<Msg2DropDownMenuType> = ({Msg2DeleteMessage, id, isMyMessage, Msg2MarkAsSpam}) => {
    return (
        <>
            <div>

                <Dropdown>
                    <Dropdown.Toggle className={
                        `${isMyMessage ? classes.Msg2DropDownMenuIntMy : classes.Msg2DropDownMenuIntNotMy} 
                         ${classes.Msg2DropDownMenuIntCommon}`}>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className={classes.Msg2DropDownItems}>
                        <Dropdown.Item className={classes.positionRelative} eventKey="1" onClick={() => {
                            Msg2DeleteMessage( id ) // удалить сообщение по его id
                        }}>
                            <div className={classes.DropdownItem}>Удалить у меня</div>
                            <img src={dustBin} className={classes.imgDelete} alt="Удалить у меня"/>
                        </Dropdown.Item>
                        <Dropdown.Item className={classes.positionRelative} eventKey="2" onClick={() => {
                            Msg2MarkAsSpam( id ) // пометить сообщение как спам по его id
                        }}>
                            <div className={classes.DropdownItem}>В спам</div>
                            <img src={spam} className={classes.imgSpam} alt="В спам"/>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </>
    );
}

export default Msg2DropDownMenu;
