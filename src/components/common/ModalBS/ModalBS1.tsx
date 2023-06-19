import React, {memo} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {modalBodyType, modalHeaderType} from "../types/commonTypes";

type ModalBS1Type = {
    show: boolean,// флаг показывать ли модальное окно
    buttonName: string // текст, отображаемый на кнопке
    modalHeader: modalHeaderType,// JSX элемент заголовка модального окна
    modalBody: modalBodyType, // JSX элемент тела модального окна
    setShow: (show: boolean)=>void, // изменение флага show (будет ли показано модальное окно)
    buttonOnClick: () => void, // событие при клике на кнопку модального окна
}
const ModalBS1:React.FC<ModalBS1Type> = memo ( ({show, setShow, modalHeader, modalBody, buttonOnClick, buttonName}) => {

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
})

export default ModalBS1
