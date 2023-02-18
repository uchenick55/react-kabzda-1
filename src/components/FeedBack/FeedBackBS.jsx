import React, {useState} from "react";
import classes from "./FeedBack.module.css";
import FeedBackFormik from "./FeedBackFormik/FeedBackFormik";
import commonClasses from "../common/CommonClasses/common.module.css";
import Container from "react-bootstrap/Container";
import ModalBS1 from "./ModalBS/ModalBS1";
import FeedBackInfoShort from "../Info/FeedBackInfoShort";

const FeedBack = ({sendFeedBack, feedBackStatus, setFeedBackStatus}) => {

    const [show, setShow] = useState(!!setFeedBackStatus); // хук задания флага показать ли модальное окно

    let SendMessageBoard = (props) => {
        return <div className={classes.sendMessageBoard}>{/*стилизация отправки данных на сервер*/}
            {props.children}
        </div>
    }

    if (feedBackStatus) { // если статус feedback из BLL не пустой
        const modalHeader = <div>Спасибо!</div>
        const modalBody = <div>{feedBackStatus}</div>
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
