import React from "react";
import {connect} from "react-redux";
import {GlobalStateType} from "../../../redux/store-redux";

type DialogContainerType = {

}
const Dialog2Container:React.FC<DialogContainerType> = () => {
    return <div>
        123
    </div>
}
const mapStateToProps = (state:GlobalStateType) => {
    return {

    }
}
export default connect(mapStateToProps,{})(Dialog2Container)
