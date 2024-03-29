import {useField} from "formik"; //формик с компонентами и пользовательским хуком
import classes from "./formik1.module.css"
import "bootstrap/dist/css/bootstrap.min.css"
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

export const CommonInputTextArea = ({label, children, ...props}) => {
    const [meta] = useField(props.props)  // данные onBlur и meta для обработки ошибок
    return (
        <>
            {/*<label
                htmlFor={props.props.id || props.props.name}>{label}</label> лейб либо с props.id (которого пока нет), либо с props.name*/}
            {children} {/*input или textarea*/}
            {meta.touched && meta.error && // если поле тронутот и вышла ошибка поля
            <div className={classes.errorText}>{meta.error}</div>} {/*красным цветом текст*/}
        </>
    )
}
export const MyTextInput = ({label, autoFocus = false, type, leftLabelLength = "", isDisabled = false, ...props}) => {  // вынесенная общая часть для тесктового поля
    const [field, meta] = useField(props) // данные onBlur и meta для обработки ошибок

    return (
        <CommonInputTextArea label={label} props={props}> {/*композиция выод общей части InputTextArea*/}

            <InputGroup className="my-1" size="sm"> {/*Инпут, отступ 1 уе по вертикали, маленький*/}
                {leftLabelLength && // если параметр leftLabelLength не пустой, то рисуем лейбл сдева от input с label
                <InputGroup.Text id={label} className={classes.labelWidth} style={{width: leftLabelLength}}
                >{label}:</InputGroup.Text>}
                <Form.Control
                    disabled={isDisabled} // поле неактивно?
                    as={type==="textarea"?type:"input"}  // выбор input или textArea
                    type={type==="password"?type:undefined} // это поле типа password (скрытое)?
                    className={meta.touched && meta.error ? classes.errorInputTextArea : classes.inputTextArea} // стилизация
                    {...field} // данные onBlur и meta для обработки ошибок
                    {...props} // остальные пропсы передаем дальше
                    autoFocus={autoFocus} // автофокус
                />
            </InputGroup>
            <div className={classes.errorText}>{meta.touched && meta.error}</div>
        </CommonInputTextArea>
    )
}

export const MyCheckbox = ({children, ...props}) => {
    const [field, meta] = useField({...props, type: 'checkbox'}) // данные onBlur и meta для обработки ошибок
    return (
        <div>
            <label className='checkbox-input'>
                <input type='checkbox' {...field} {...props}/> {/*чекбокс */}
                {children}{/* текст I accept the terms and conditions*/}
            </label>
            {meta.touched && meta.error && // поле тронуто и есть ошибка
            <div className={classes.errorText}>{meta.error}</div>}
        </div>
    )
}

export const MySelect = ({label, ...props}) => {
    const [field, meta] = useField(props) // данные onBlur и meta для обработки ошибок
    return (
        <div>
            <label htmlFor={props.id || props.name}>{label}</label> {/*заголовок select*/}
            <select {...field} {...props}/>{/* вывод select с option*/}
            {meta.touched && meta.error && // поле тронуто и есть ошибка
            <div className={classes.errorText}>{meta.error}</div>} {/*вывод текста ошибки*/}
        </div>
    )
}
