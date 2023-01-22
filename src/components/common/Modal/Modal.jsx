import React from 'react'
import classes from './Modal.module.css'

const Modal = (props) => {
    return (
        <div className={classes.modal}>
            <div className={classes.modal_content}>
                <div className={classes.modal_header}>
                    <h4 className={classes.modal_title}>Modal Title</h4>
                </div>
                <div className={classes.modal_body}>This is modal content</div>
                <div className={classes.modal_footer}>
                    <button className={classes.button}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default Modal
