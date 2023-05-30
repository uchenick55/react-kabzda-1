import React from "react";
import { useLocation } from "react-router-dom";

import "./Crumb.scss"

export interface ICrumbProps {
    className?:string;
    path:string;
    title: string;
    url: string;
}
export const Crumb: React.FC<ICrumbProps> = ({className, path, title, url}) => {
    return <div>

    </div>
}
