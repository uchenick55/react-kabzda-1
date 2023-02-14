import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import "bootstrap/dist/css/bootstrap.min.css"
import React from "react";

function HeaderBsOc() {
    return (
        <>
            {/*false, 'sm', 'md', 'lg', 'xl', 'xxl'*/}
            {['false'].map((expand) => (
                <Navbar key={expand} bg="dark" expand={expand} fixed="top">
                    <Container fluid>
                        <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    Offcanvas
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1 pe-3">
                                    <Nav.Link href="#/">Home</Nav.Link>


                                    <NavDropdown title="Dropdown">
                                        <NavDropdown.Item href="#/profile">Profile</NavDropdown.Item>
                                        <NavDropdown.Item href="#/users">Users</NavDropdown.Item>
                                        <NavDropdown.Item href="#/friends">My friends</NavDropdown.Item>
                                        <NavDropdown.Item href="#/dialogs">Dialogs</NavDropdown.Item>
                                        <NavDropdown.Item href="#/news">News</NavDropdown.Item>
                                        <NavDropdown.Item href="#/rest">Rest</NavDropdown.Item>
                                        <NavDropdown.Item href="#/feedback">FeedBack</NavDropdown.Item>
                                        <NavDropdown.Item href="#/tasks">Tasks</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
{/*                                <Form className="d-flex">
                                    <Form.Control
                                        type="search"
                                        placeholder="Search"
                                        className="me-2"
                                        aria-label="Search"
                                    />
                                    <Button variant="outline-success">Search</Button>
                                </Form>*/}
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </>
    );
}

export default HeaderBsOc;
