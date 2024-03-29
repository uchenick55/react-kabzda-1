import React, {useState} from "react";
import FeedBackFormik from "./FeedBackFormik/FeedBackFormik";
import commonClasses from "../common/CommonClasses/common.module.css";
import Container from "react-bootstrap/Container";
import ModalBS1 from "../common/ModalBS/ModalBS1";
import FeedBackInfoShort from "../Info/FeedBackInfoShort";
import {ApiFeedBackDataType} from "../common/types/commonTypes";

type FeedBackType = {
    feedBackStatus: string
    sendFeedBack: (data:ApiFeedBackDataType) => void,
    setFeedBackStatus:(feedBackStatus:string)=>void

}
const FeedBack:React.FC<FeedBackType> = ({sendFeedBack, feedBackStatus, setFeedBackStatus}) => {

    const [show, setShow] = useState(true); // хук задания флага показать ли модальное окно

    if (feedBackStatus) { // если статус feedback из BLL не пустой
        const modalHeader: JSX.Element = <div>Спасибо!</div>
        const modalBody: JSX.Element = <div>{feedBackStatus}</div>
        const buttonOnClick = () => {
            setFeedBackStatus("")
        }

        return <div>
            <ModalBS1
                show={show} // флаг показать ли модальное окно
                setShow={setShow} // колбек смены флага показать модальное окно

                modalHeader={modalHeader} // заголовок модального окна
                modalBody={modalBody} // тело модального окна
                buttonOnClick={buttonOnClick} // действие по кнопке модального окна
                buttonName={"Закрыть"} // текст кнопки
            />
        </div>
    }

    return <div>
        <h2 className={commonClasses.pageHeader}>FeedBack</h2>
        <Container fluid>
            <FeedBackFormik sendFeedBack={sendFeedBack}/>
            <div className='my-3'><FeedBackInfoShort/></div>

        </Container>
    </div>

};

export default FeedBack;
