import React, {useCallback, useEffect} from 'react'
import classes from './Modal.module.css'

const Modal = (props) => {
    const escFunction = useCallback((event)=>{
        if (event.key==="Escape") {
            // сделать что делает escape
            props.onClose()
        }
    },[props.onClose])

    useEffect(()=>{
        document.addEventListener("keydown", escFunction)
        return () => {

            document.addEventListener("keydown", escFunction)
        }
    }, [escFunction])

    if (!props.show) {
        return null
    }

    return (
        <div className={classes.modal} onClick={props.onClose}> {/*по клику вне окна закрыть модальное окно*/}
            <div className={classes.modal_content}
                 onClick={(e)=>{e.stopPropagation()}}>
                {/*при клике по самому окну, его не закрывать*/}
                <div className={classes.modal_header}>
                    <h4 className={classes.modal_title}>{props.modal_title}</h4> {/*заголовок модального окна*/}
                </div>
                <div className={classes.modal_body}>{props.modal_body}</div> {/*контент модального окна*/}
                <div className={classes.modal_footer}>
                    <button className={classes.button} onClick={props.onClose}>Close</button>
                    {/*закрыть модальное окно по клику*/}
                </div>
            </div>
        </div>
    )
}

export default Modal
