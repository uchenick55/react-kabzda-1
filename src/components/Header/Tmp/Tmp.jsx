import {useState} from "react";
import classes from "./tmp.module.css";

let Tmp = () => {
    const [imgScale, setImgScale] = useState();

    const onMouseOverFn = () => {
        setImgScale("fox");
    };
    return (
        <div className={classes.basicWidts} style={{width: "100px"}}>
            <div style={{transform: "scale(1.1)"}}>
                <img
                    src="https://interactive-examples.mdn.mozilla.net/media/examples/firefox-logo.svg"
                    alt=""
                    // onMouseOver = {onMouseOverFn}
                />
            </div>
            <div style={{width: "100px"}}>
                <img
                    src="https://interactive-examples.mdn.mozilla.net/media/examples/firefox-logo.svg"
                    alt=""
                    // onMouseOver = {onMouseOverFn}
                />
            </div>
        </div>
    );
};
export default Tmp;
