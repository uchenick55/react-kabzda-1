import React from "react";
import classes from "./customFields.module.css"
import {bedug_mode} from "../../../redux/store-redux"; // стили красная граница для textarea и красный цвет текста если ошибка

export const Textarea = ({input, meta, ...restProps}) => {
    const isError = meta.touched && meta.error; // объединение наличия ошибки в meta и поле уже трогали
    return (
        <div>
            <div >
                <textarea {...input} // формат задан в redux field validation
                          placeholder={restProps.placeholder} // проброс пропсов с плейсхолдером
                          className={isError?classes.textAreaError:null}
                    //границу textarea подсветить красным если ошибка в meta
                />
            </div>
            <div >
                {isError?<span className={classes.textError}>{meta.error}</span>:null}
{/*                если ошибка в meta и поле тронули, то отобразить текс ошибки*/}
            </div>
        </div>
    )
}
export const Input = ({input, meta, ...restProps}) => {
    const isError = meta.touched && meta.error; // объединение наличия ошибки в meta и поле уже трогали
    return (
        <div>
            <div >
                <input {...input} // формат задан в redux field validation
                          placeholder={restProps.placeholder} // проброс пропсов с плейсхолдером
                          className={isError?classes.InputError:null}
                    //границу login подсветить красным если ошибка в meta
                />
            </div>
            <div >
                {isError?<span className={classes.textError}>{meta.error}</span>:null}
{/*                если ошибка в meta и поле тронули, то отобразить текс ошибки*/}
            </div>
        </div>
    )
}






