import React from 'react'
import classes from './Modal.module.css'

const Modal = (props) => {
    if (!props.show) {
        return null
    }
    return (
        <div className={classes.modal}>
            <div className={classes.modal_content}>
                <div className={classes.modal_header}>
                    <h4 className={classes.modal_title}>Modal Title</h4> {/*заголовок модального окна*/}
                </div>
                <div className={classes.modal_body}>This is modal content</div> {/*контент модального окна*/}
                <div className={classes.modal_footer}>
                    <button className={classes.button} onClick={props.onClose}>Close</button>
                    {/*закрыть модальное окно по клику*/}
                </div>
            </div>
        </div>
    )
}

export default Modal
