import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React, {memo} from "react";
import classes from './Header.module.css';

const DropdownNavbarBS:React.FC = memo( () => {
    return  <div>
        <Navbar variant="dark" bg="dark" expand="lg">
            <NavDropdown title="Pages" className={classes.NavDropdown}>
                <NavDropdown.Item href="#/">Home</NavDropdown.Item>
                <NavDropdown.Item href="#/mystack">My Stack</NavDropdown.Item>
                <NavDropdown.Item href="#/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="#/users">Users</NavDropdown.Item>
                <NavDropdown.Item href="#/dialog2">Dialogs</NavDropdown.Item>
                <NavDropdown.Item href="#/feedback">FeedBack</NavDropdown.Item>
                <NavDropdown.Item href="#/tasks">Tasks</NavDropdown.Item>
                <NavDropdown.Item href="#/chat">Chat WS</NavDropdown.Item>
            </NavDropdown>
        </Navbar>
    </div>
})

export default DropdownNavbarBS;
