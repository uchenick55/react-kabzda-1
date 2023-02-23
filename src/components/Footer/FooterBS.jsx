import Navbar from 'react-bootstrap/Navbar';
import React from "react";
import classes from "./footer.module.css"


function FooterBS() {
    return (
        <Navbar variant="dark" bg="dark" expand="sm" fixed={"bottom"} className={classes.myFoorer}>
        </Navbar>
    );
}

export default FooterBS;
