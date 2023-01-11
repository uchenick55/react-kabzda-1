import React from "react";
import {useParams} from "react-router-dom";
import {connect} from "react-redux";

let withRouter2 = (Children) => {
    let WithRouter2withProps = (props) => {
        let aaa = {params: useParams()}
        let userId=Number(aaa.params['*']);
        return <Children {...props} userId={userId}/>
    }
    return connect(null, null)(WithRouter2withProps)
    // доп данные с connect пока нулевые, если понадобятся, сможем добавить
}
export default withRouter2
