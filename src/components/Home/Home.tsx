import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import Container from "react-bootstrap/Container";
import commonClasses from "../common/CommonClasses/common.module.css";
import IndexInfo from "./IndexInfo";

type HomeTypes = {

}
const Home: React.FC<HomeTypes> = () => {
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

