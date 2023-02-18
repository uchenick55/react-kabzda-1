import ScrollContainer from "../common/Scroll/ScrollContainer";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import Container from "react-bootstrap/Container";
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import MyBreadCrumb from "../common/MyBreadCrumb/MyBreadCrumb";
import commonClasses from "../common/CommonClasses/common.module.css";
import IndexInfo from "../Info/IndexInfo";

let Home = () => {
    const home = <div>
        <Container>
            <h2 className={commonClasses.pageHeader}>Home</h2>
            <IndexInfo/>
        </Container>
    </div>

    return (<div>
        {home}
    </div>)
}
export default Home

