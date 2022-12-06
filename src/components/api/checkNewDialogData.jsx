import React, {useEffect, useState} from "react";
import {connect} from "react-redux";

let CheckNewDialogData = () => {

    return 123
}
let mapStateToProps = (state) => {
    return {
        myID: state.auth.myID,
        dialogUserID: state.dialogsPage.dialogUserID,
    }
}

export default connect()(CheckNewDialogData)
