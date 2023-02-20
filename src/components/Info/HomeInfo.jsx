import swgInfoPic from "../../assets/images/swg/info-home-black.svg"
import Image from "react-bootstrap/Image";
import classes from "../Header/Header.module.css";

let HomeInfo = () => {

    return <div>
        <p>Приветствую!
            На каждой странице в меню находится контекстно-зависимая кнопка Info {" "}
            <Image src={swgInfoPic} className={classes.myHeaderWH1}/>
        </p>
        <p> Во всплывающем окно вы можете ознакомиться с заложеной функциональностью.</p>
        <p>На данной странице приведено общее описание проекта, и его отличия от базового из курса.</p>
        <p> Приятного просмотра! </p>
    </div>

}
export default HomeInfo
