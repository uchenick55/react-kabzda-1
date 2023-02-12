import classes from "./Users.module.css";
import React from "react";

const InputButtonUsersRender = ({onChangeTerm, onChangeTermFunction, SetTermFunction, handleClick}) => {
    return <div>
        <form className={classes.inputFindUsers}>  {/* объединение инпута и кнопки*/}
            <input
                value={onChangeTerm} // значение поля поиска захардкодили
                onChange={(event) => {
                    onChangeTermFunction(event)
                }} // по изменению поля получить значение
                onBlur={SetTermFunction}// задать в локальный стейт значение поиска при потере фокуса
                placeholder={"find users"} // пояснение поля ввода
                autoFocus // сразу фокусировка на поле ввода
            />
            <button onClick={handleClick}>Find</button>
            {/* кнопка с обработчиком клика*/}
        </form>
    </div>
}
export default InputButtonUsersRender
