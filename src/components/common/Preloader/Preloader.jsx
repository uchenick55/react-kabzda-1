import preloader from "../../../assets/images/Spin-1s-64px.svg";
import React from "react";

let Preloader = (props) => {
   return <div style= { { backgroundColor: "black" } }>
           <img src={preloader}/>
       </div>
}
export default Preloader