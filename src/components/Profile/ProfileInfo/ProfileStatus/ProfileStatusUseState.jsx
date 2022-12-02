import React, {useState} from "react";
import {bedug_mode, debugItem} from "../../../../redux/store-redux";

let ProfileStatusWithHoocs = ({userId, myId, status, putStatusThunkCreator }) => {
    const [modifyStatus, setModifyStatus] = useState(false) // локальная переменная-флаг модификации статуса
    const [statusTmpInput, setStatusTmpInput] = useState(null) // локальный статус до отправки на сервер (поле input)

    const checkIfICanModifyStatus = () => {// проверка, что я могу менять статус (открыт мой профиль со статусом)
        if (userId===myId) { // если ID открытого пользователя равен моему
            setModifyStatus(true)// смена текстового отображения статуса на поле input
            setStatusTmpInput(status)// временное значение статуса на время ввода поля input. Изначально берем из статуса BLL
        }
    }
    const setMyStatus = () => { // действия после двойного клика по полю input статуса или вводу Enter
        setModifyStatus(false) // переключение с поля ввода статуса на простой текст
        putStatusThunkCreator(statusTmpInput, myId)
    }
    const onChangeStatus = (event) => {
        const text = event.currentTarget.value;// вынимаем значение введенное в поле ввода input
        setStatusTmpInput(text);// присваиваем переменной временного статуса из локального стейта введенное значение в поле
    }

    const checkEnterPressed = (event) => { // проверка нажатия Enter
        if (event.charCode==13) {
            setMyStatus()//задание статуса при нажатии Enter
        }
    }

    return (<div>
        {!modifyStatus
            ?<div>
                <span onDoubleClick={checkIfICanModifyStatus}> {/*при двойном клике на статусе проверка могу ли я ввобще менять статус*/}
                    Статус: {!status // если статуса из стейта нет или он нулевой
                        ?"нет статуса" // отображение "нет статуса"
                        : status // если статус есть из BLL, он отображается
                    }
                </span>
            </div>
            :<div>
                <span onDoubleClick={setMyStatus}>
                    <input
                        value={statusTmpInput} // жестко зафиксировали значение поля ввода на временное значение статуса в локальном стейте
                        onChange={onChangeStatus} // задание временного локального статуса
                        onBlur={setMyStatus}// задание стейта при потере фокуса input
                        autoFocus={true} // фокусировка на поле ввода текста
                        placeholder={"задайте статус"}// текст при пустом поле ввода
                        onKeyPress={checkEnterPressed} // проверка нажатия Enter
                    />
                </span>
            </div>

        }
    </div>)
}

export default ProfileStatusWithHoocs
