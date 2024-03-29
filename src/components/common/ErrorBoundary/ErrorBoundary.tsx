import React, {ReactNode} from "react";
import {NulableType} from "../types/commonTypes";
type ErrorBoundaryPropsType = {
    children: ReactNode
}

type ErrorType = Error
type ErrorInfoType = {
    componentStack: string
}

type ErrorBoundaryStateType = {
    error: NulableType<ErrorType>,
    errorInfo: NulableType<ErrorInfoType>
}
class ErrorBoundary extends React.Component <ErrorBoundaryPropsType, ErrorBoundaryStateType> {
    constructor(props:ErrorBoundaryPropsType) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }

    componentDidCatch(error: NulableType<ErrorType>, errorInfo: NulableType<ErrorInfoType>) {
        //Засетать в локал стейт ошибки из вложенных компонентах, если появятся при рендере
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
    }

    render() {
        if (this.state.errorInfo) {
            return (
                <div>
                    <h2>Something went wrong.</h2>
                    <details>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo.componentStack}
                    </details>
                </div>
            );
        }
        // При отсутствии ошибок рендерить тело children (дочернюю компоненту)
        return this.props.children;
    }
}

export default ErrorBoundary
