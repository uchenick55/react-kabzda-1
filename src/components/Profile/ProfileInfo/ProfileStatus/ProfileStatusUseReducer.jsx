import React, {useReducer} from "react";
import {bedug_mode} from "../../../../redux/store-redux";

let ProfileStatusUseReducer = ({status, userId, myId, putStatusThunkCreator}) => {
    const initialState = {
        modifyStatus2: false,// локальная переменная-флаг модификации статуса
        statusTmpInput2: null // локальный статус до отправки на сервер (поле input)
    }

    const SET_MODIFY_STATUS_TRUE = "SET_MODIFY_STATUS_TRUE"; // константа чтобы не ошибиться при диспатче (modify true)
    const SET_MODIFY_STATUS_FALSE = "SET_MODIFY_STATUS_FALSE";// константа чтобы не ошибиться при диспатче (modify false)
    const SET_STATUS_TMP_INPUT = "SET_STATUS_TMP_INPUT";// константа чтобы не ошибиться при диспатче (временный статус input)

    const localReducer = (localState, action) => {
        let stateCopy; // копия стейта для дебага
        switch (action.type) {
            case SET_MODIFY_STATUS_TRUE: // если мы открываем поле input (модификацию стьатуса)
                stateCopy = {
                    ...localState,
                    modifyStatus2: true, // флаг модификации в true
                    statusTmpInput2: status// локальный статус для input берем из стейта
                };
                return stateCopy; // проверяем что все вернулось как нужно
            case SET_MODIFY_STATUS_FALSE: // если мы закрываем модификацию стьатуса
                stateCopy = {
                    ...localState,
                    modifyStatus2: false // флаг модификации в false
                };
                return stateCopy; // проверяем что все вернулось как нужно
            case 'SET_STATUS_TMP_INPUT':
                stateCopy = {
                    ...localState,
                    statusTmpInput2: action.text // задаем локальный статус из value input
                };
                return stateCopy; // проверяем что все вернулось как нужно
            default:
                throw new Error(); // заглушка обработчика ошибок
        }
    }

    const [localState, dispatch] = useReducer(localReducer, initialState)// меняем отдельные useState на useReducer

    const checkIfICanModifyStatus = () => {// проверка, что я могу менять статус (открыт мой профиль со статусом)
        if (userId === myId) { // если ID открытого пользователя равен моему
            dispatch({type: SET_MODIFY_STATUS_TRUE})// смена текстового отображения статуса на поле input
        }
    }
    const setMyStatus = () => { // действия после двойного клика по полю input статуса или вводу Enter
        dispatch({type: SET_MODIFY_STATUS_FALSE})// смена текстового отображения статуса на поле input

        if (bedug_mode) {console.log("ProfileStatusUseReducer.jsx, setMyStatus putStatusThunkCreator() ->SET_USER_PROFILE" )} // дебаг

        /////////  ProfileInfo.jsx

        putStatusThunkCreator(localState.statusTmpInput2, myId)// санкреатор на обновление статуса на сервере
    }
    const onChangeStatus = (event) => {
        const text = event.currentTarget.value;// вынимаем значение введенное в поле ввода input
        dispatch({type: SET_STATUS_TMP_INPUT, text: text})// присваиваем переменной временного статуса из локального стейта введенное значение в поле
    }
    const checkEnterPressed = (event) => { // проверка нажатия Enter
        if (event.charCode === 13) {
            setMyStatus()//задание статуса при нажатии Enter
        }
    }

    return (<div>
        {!localState.modifyStatus2
            ? <div>
                <h3
                    onDoubleClick={checkIfICanModifyStatus}> {/*при двойном клике на статусе проверка могу ли я ввобще менять статус*/}
                    Статус: {!status // если статуса из стейта нет или он нулевой
                        ? "нет статуса" // отображение "нет статуса"
                        : status // если статус есть из BLL, он отображается
                    }
                </h3>
            </div>
            : <h3>
                <span onDoubleClick={setMyStatus}>
                    <input
                        value={localState.statusTmpInput2} // жестко зафиксировали значение поля ввода на временное значение статуса в локальном стейте
                        onChange={onChangeStatus} // задание временного локального статуса
                        onBlur={setMyStatus}// задание стейта при потере фокуса input
                        autoFocus // фокусировка на поле ввода текста
                        placeholder={"задайте статус"}// текст при пустом поле ввода
                        onKeyPress={checkEnterPressed} // проверка нажатия Enter
                    />
                </span>
            </h3>
        }
    </div>)
}
export default ProfileStatusUseReducer







