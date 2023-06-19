import React from "react";
import classes from "./Preloader.module.css"

const Preloader: React.FC<unknown> = () => {
    return <div className={classes.spinner}/>
}
export default Preloader
