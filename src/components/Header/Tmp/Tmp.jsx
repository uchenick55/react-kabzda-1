import {useState} from "react";
import classes from "./tmp.module.css";

let Tmp = () => {
    const [imgScale, setImgScale] = useState(null);

    const onMouseOverFn = (itemId) => {
        setImgScale(itemId);
    };
    return (
        <div>
            <span>
                <img className={imgScale === 1 ? classes.item1: classes.item2}
                     src="https://interactive-examples.mdn.mozilla.net/media/examples/firefox-logo.svg"
                     onMouseOver={() => {
                         onMouseOverFn(1)
                     }}
                     onMouseLeave={() => {
                         onMouseOverFn(null)
                     }}

                />
            </span>
            <span>
                <img className={imgScale === 2 ? classes.item1: classes.item2}
                     src="https://interactive-examples.mdn.mozilla.net/media/examples/firefox-logo.svg"
                     onMouseOver={() => {
                         onMouseOverFn(2)
                     }}
                     onMouseLeave={() => {
                         onMouseOverFn(null)
                     }}

                />
            </span>
        </div>
    );
};
export default Tmp;
