import React, {useCallback, useEffect} from 'react'
import classes from './Modal.module.css'

const Modal = (props) => {
    const escFunction = useCallback((event)=>{
        if (event.key==="Escape") {
            // сделать что делает escape
            props.onClose()
        }
    },[])

    useEffect(()=>{
        document.addEventListener("keydown", escFunction, false)
        return () => {

            document.addEventListener("keydown", escFunction, false)
        }
    }, [])

    if (!props.show) {
        return null
    }

    return (
        <div className={classes.modal} onClick={props.onClose}> {/*по клику вне окна закрыть модальное окно*/}
            <div className={classes.modal_content}
                 onClick={(e)=>{e.stopPropagation()}}>
                {/*при клике по самому окну, его не закрывать*/}
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
