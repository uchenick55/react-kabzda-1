import Dropdown from 'react-bootstrap/Dropdown';
import classes from "./messages2Render.module.scss"
import React from "react";
type Msg2DropDownMenuType = {
    id: string
    Msg2DeleteMessage: (message2Id: string) => void // удаление сообщения по его id
}
const Msg2DropDownMenu: React.FC<Msg2DropDownMenuType> = ({Msg2DeleteMessage, id}) => {
    return (
        <>
            <div>

                <Dropdown >
                    <Dropdown.Toggle className={classes.Msg2DropDownMenuInt}></Dropdown.Toggle>
                    <Dropdown.Menu >
                        <Dropdown.Item eventKey="1" onClick={()=>{
                            Msg2DeleteMessage(id) // удалить сообщение по его id
                        }}>Удалить</Dropdown.Item>
                        <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                        <Dropdown.Item eventKey="3" >  Active Item </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>{' '}
            </div>
        </>
    );
}

export default Msg2DropDownMenu;
