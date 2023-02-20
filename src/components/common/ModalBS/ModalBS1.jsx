import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalBS1 ({show, setShow, modalHeader, modalBody, buttonOnClick, buttonName}) {

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
