import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {modalBodyType, modalHeaderType} from "../../../types/commonTypes";

type ModalBS1Type = {
    show: boolean,// флаг показывать ли модальное окно
    setShow: (show: boolean)=>void, // изменение флага show (будет ли показано модальное окно)
    modalHeader: modalHeaderType,// JSX элемент заголовка модального окна
    modalBody: modalBodyType, // JSX элемент тела модального окна
    buttonOnClick: () => void, // событие при клике на кнопку модального окна
    buttonName: string // текст, отображаемый на кнопке
}
const ModalBS1:React.FC<ModalBS1Type> = ({show, setShow, modalHeader, modalBody, buttonOnClick, buttonName}) => {

    const localAction = () => {
        setShow(false)
        buttonOnClick()
    }

    return (
        <>
            <Modal show={show} onHide={()=>{setShow(false)}}  size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{modalHeader}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalBody}</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={localAction}>
                        {buttonName}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalBS1
