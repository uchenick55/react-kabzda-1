import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React from "react";

function NavbarDarkExample() {
    return (
        <Navbar variant="dark" bg="dark" expand="lg">
            <NavDropdown title="Pages" drop='start' >
                <NavDropdown.Item href="#/">Home</NavDropdown.Item>
                <NavDropdown.Item href="#/mystack">My Stack</NavDropdown.Item>
                <NavDropdown.Item href="#/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="#/users">Users</NavDropdown.Item>
                <NavDropdown.Item href="#/feedback">FeedBack</NavDropdown.Item>
                <NavDropdown.Item href="#/tasks">Tasks</NavDropdown.Item>
            </NavDropdown>
        </Navbar>
    );
}

export default NavbarDarkExample;
