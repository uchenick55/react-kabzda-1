import React from "react";
import {useParams} from "react-router-dom";

let withRouter2 = (Children) => {
    return (props) => {
        let aaa = {params: useParams()}
        let userId=Number(aaa.params['*']);
        return <Children {...props} userId={userId}/>
    }
}
export default withRouter2
