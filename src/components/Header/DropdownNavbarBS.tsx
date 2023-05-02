import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React from "react";
import classes from './Header.module.css';

type DropdownNavbarBSType = {

}
const DropdownNavbarBS:React.FC<DropdownNavbarBSType> = () => {
    return (
        <Navbar variant="dark" bg="dark" expand="lg">
            <NavDropdown title="Pages" className={classes.NavDropdown}>
                <NavDropdown.Item href="#/">Home</NavDropdown.Item>
                <NavDropdown.Item href="#/mystack">My Stack</NavDropdown.Item>
                <NavDropdown.Item href="#/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="#/users">Users</NavDropdown.Item>
                <NavDropdown.Item href="#/dialog">Dialog</NavDropdown.Item>
                <NavDropdown.Item href="#/feedback">FeedBack</NavDropdown.Item>
                <NavDropdown.Item href="#/tasks">Tasks</NavDropdown.Item>
            </NavDropdown>
        </Navbar>
    );
}

export default DropdownNavbarBS;
