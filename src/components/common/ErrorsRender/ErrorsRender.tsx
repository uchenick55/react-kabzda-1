import React from "react";
import {ErrorType} from "../types/commonTypes";

type ErrorsRenderType = {
    error: ErrorType
}
const ErrorsRender: React.FC<ErrorsRenderType> = ({error}) => {
    return <div className="d-flex justify-content-center my-5 py-5">
        <h3>{error.message}</h3>
    </div>
}
export default ErrorsRender
