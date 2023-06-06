import Navbar from 'react-bootstrap/Navbar';
import React from "react";
import classes from "./footer.module.css"

const FooterBS:React.FC = ()=> {
    return (
        <Navbar variant="dark" bg="dark" expand="sm"
                fixed={"bottom"} className={classes.myFoorer}/>
    );
}

export default FooterBS;
