import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React, {memo} from "react";
import classes from './Header.module.css';
import keySrc from "../../assets/images/swg/key.svg"

const DropdownNavbarBS:React.FC = memo( () => {
    const keyImg = <img src = {keySrc} className={classes.keyImg} alt={"после авторизации"} title={"после авторизации"} />
    return  <div>
        <Navbar variant="dark" bg="dark" expand="lg">
            <NavDropdown title="Pages" className={classes.NavDropdown}>
                <NavDropdown.Item href="#/">Home </NavDropdown.Item>
                <NavDropdown.Item href="#/mystack">My Stack</NavDropdown.Item>
                <NavDropdown.Item href="#/users">Users</NavDropdown.Item>
                <NavDropdown.Item href="#/profile">Profile {keyImg} </NavDropdown.Item>
                <NavDropdown.Item href="#/dialog2">Dialogs {keyImg} </NavDropdown.Item>
                <NavDropdown.Item href="#/chat">Chat {keyImg} </NavDropdown.Item>
                <NavDropdown.Item href="#/feedback">FeedBack</NavDropdown.Item>
                <NavDropdown.Item href="#/tasks">Tasks</NavDropdown.Item>
            </NavDropdown>
        </Navbar>
    </div>
})

export default DropdownNavbarBS;
