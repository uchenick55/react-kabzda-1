import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import "bootstrap/dist/css/bootstrap.min.css"
import React from "react";



function FooterBS () {
    return (
        <Navbar variant="dark" bg="dark" expand="sm" fixed={"bottom"}>
            <Container fluid> {/*контейнер, текст большими буквами */}
{/*                <-Navbar.Collapse> выпадающее меню со ссылкам нва страницы
                    <Nav>
                        <NavDropdown title="Pages" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#/">Info</NavDropdown.Item>
                            <NavDropdown.Item href="#/profile">Profile</NavDropdown.Item>
                            <NavDropdown.Item href="#/users">UsersBS</NavDropdown.Item>
                            <NavDropdown.Item href="#/friends">My friends</NavDropdown.Item>
                            <NavDropdown.Item href="#/dialogs">Dialogs</NavDropdown.Item>
                            <NavDropdown.Item href="#/news">News</NavDropdown.Item>
                            <NavDropdown.Item href="#/rest">Rest</NavDropdown.Item>
                            <NavDropdown.Item href="#/feedback">FeedBack</NavDropdown.Item>
                            <NavDropdown.Item href="#/tasks">Tasks</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </-Navbar.Collapse>*/}
            </Container>
        </Navbar>
    );
}

export default FooterBS;
