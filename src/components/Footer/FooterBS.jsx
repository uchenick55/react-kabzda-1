import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import "bootstrap/dist/css/bootstrap.min.css"
import React from "react";


function FooterBS() {
    return (
        <Navbar variant="dark" bg="dark" expand="sm" fixed={"bottom"}>
            <Container fluid> {/*контейнер, текст большими буквами */}
            </Container>
        </Navbar>
    );
}

export default FooterBS;
