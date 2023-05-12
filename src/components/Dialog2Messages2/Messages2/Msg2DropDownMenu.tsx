import Dropdown from 'react-bootstrap/Dropdown';
import classes from "./messages2Render.module.scss"
import React from "react";
import dustBin from "../../../assets/images/swg/dust-bin1.svg"

type Msg2DropDownMenuType = {
    id: string
    isMyMessage: boolean // индикатор, мое ли это сообщение
    Msg2DeleteMessage: (message2Id: string) => void // удаление сообщения по его id
}
const Msg2DropDownMenu: React.FC<Msg2DropDownMenuType> = ({Msg2DeleteMessage, id, isMyMessage}) => {
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
                            <img src={dustBin} className={classes.dustBin} alt="Удалить у меня"/>
                        </Dropdown.Item>
                        <Dropdown.Item  className={classes.positionRelative} eventKey="2">

                            Another action</Dropdown.Item>
                        <Dropdown.Item  className={classes.positionRelative} eventKey="3"> Active Item </Dropdown.Item>
                        <Dropdown.Divider/>
                        <Dropdown.Item  className={classes.positionRelative} eventKey="4">Separated link</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </>
    );
}

export default Msg2DropDownMenu;
