import React from "react";
import {bedug_mode} from "../../../redux/store-redux";

export const Required = (value) => {
    if (value) {
        return undefined // возврет нет ошибки, если поле не пустое
    } else {
        return "Field is required" // предупреддение, поле требуется
    }
}

export const maxLengthCreator = (maxLength) => (value)=> {
    // делаем замыкание, передаем максимальную длину поля во внутреннюю функцию проверки макс длины
    if (value && value.length>maxLength) { // если что то ввели и количество символов
        return `MaxLength is ${maxLength}` // возврат ошибки превышено максимальная длина
    } else {
        return undefined // ошибки нет, поле в пределах заданной длины
    }
}

export const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
        'Invalid email address' : undefined















