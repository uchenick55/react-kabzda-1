import ScrollContainer from "../common/Scroll/ScrollContainer";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import Container from "react-bootstrap/Container";
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import MyBreadCrumb from "../common/MyBreadCrumb/MyBreadCrumb";

let Home = () => {
    const home = <div>
        <Container>
            <h2 className="d-flex justify-content-center text-uppercase">Home</h2>
            <p>Привет всем. Эта PET проект социальной сети</p>
            <p>Данная страница служит домашней для BreadCrumbs</p>
        </Container>
    </div>

    return (<div>
        {home}
    </div>)
}
export default Home

