import React from "react";
import {errType} from "../types/commonTypes";

type errorsRenderType = {
    error: errType
}
const ErrorsRender: React.FC<errorsRenderType> = ({error}) => {
    return <div className="d-flex justify-content-center my-5 py-5">
        <h3>{error.message}</h3>
    </div>
}
export default ErrorsRender
