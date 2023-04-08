import React, {useCallback, useEffect} from 'react'
import classes from './Modal.module.css'

const Modal = ({show,onClose,modal_title, modal_body}) => {
    const escFunction = useCallback((event)=>{
        if (event.key==="Escape") {
            // сделать что делает escape
            onClose()
        }
    },[onClose])

    useEffect(()=>{
        document.addEventListener("keydown", escFunction)
        return () => {

            document.addEventListener("keydown", escFunction)
        }
    }, [escFunction])

    if (!show) {
        return null
    }

    return (
        <div className={classes.modal} onClick={onClose}> {/*по клику вне окна закрыть модальное окно*/}
            <div className={classes.modal_content}
                 onClick={(e)=>{e.stopPropagation()}}>
                {/*при клике по самому окну, его не закрывать*/}
                <div className={classes.modal_header}>
                    <h4 className={classes.modal_title}>{modal_title}</h4> {/*заголовок модального окна*/}
                </div>
                <div className={classes.modal_body}>{modal_body}</div> {/*контент модального окна*/}
                <div className={classes.modal_footer}>
                    <button className={classes.button} onClick={onClose}>Close</button>
                    {/*закрыть модальное окно по клику*/}
                </div>
            </div>
        </div>
    )
}

export default Modal
