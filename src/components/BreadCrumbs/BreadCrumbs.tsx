import React from "react";
import { useLocation } from "react-router-dom";
import "./BreadCrumbs.scss"

export interface IBreadCrumbsLocationState {
    id:string;
    path:string;
    title: string;
    url: string;
}

export const BreadCrumbs:React.FC = () => {
    // @ts-ignore
    const {state} = useLocation<Array<IBreadCrumbsLocationState>>()
    return <nav className="Breadcrumb">

    </nav>
}
