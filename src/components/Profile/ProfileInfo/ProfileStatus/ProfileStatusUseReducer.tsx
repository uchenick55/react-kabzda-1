import React, {ChangeEvent, memo, useReducer} from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';


type ProfileStatusUseReducerType = {
    myId:number, // мой id для модификации статуса
    userId: number, // id отображаемого пользователя
    status:string, // статус из BLL
    putStatusThunkCreator: (statusTmpInput:string)=>void, // санкреатор для обновления сатуса
}
const ProfileStatusUseReducer:React.FC<ProfileStatusUseReducerType> = memo( ({status, userId, myId, putStatusThunkCreator}) => {
    const initialState = {
        modifyStatus2: false,// локальная переменная-флаг модификации статуса
        statusTmpInput2: "" // локальный статус до отправки на сервер (поле input)
    }
    type InitialStateType = typeof initialState

    const SET_MODIFY_STATUS_TRUE = "SET_MODIFY_STATUS_TRUE"; // константа (modify true)
    const SET_MODIFY_STATUS_FALSE = "SET_MODIFY_STATUS_FALSE";// константа (modify false)
    const SET_STATUS_TMP_INPUT = "SET_STATUS_TMP_INPUT";// константа (временный статус input)

    type SetModifyStatusTrue = {type:typeof SET_MODIFY_STATUS_TRUE}
    type SetModifyStatusFalse = {type:typeof SET_MODIFY_STATUS_FALSE}
    type SetStatusTmpInput = {type:typeof SET_STATUS_TMP_INPUT, text: string}

    type ActionTypes = SetModifyStatusTrue | SetModifyStatusFalse | SetStatusTmpInput

    const localReducer = (localState:InitialStateType, action:ActionTypes):InitialStateType => {
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

    type CheckIfICanModifyStatusType = () => void
    const checkIfICanModifyStatus = () => {// проверка, что я могу менять статус (открыт мой профиль со статусом)
        if (userId === myId) { // если ID открытого пользователя равен моему
            dispatch({type: SET_MODIFY_STATUS_TRUE})// смена текстового отображения статуса на поле input
        }
    }
    const setMyStatus = () => { // действия после двойного клика по полю input статуса или вводу Enter
        dispatch({type: SET_MODIFY_STATUS_FALSE})// смена текстового отображения статуса на поле input

        putStatusThunkCreator(localState.statusTmpInput2)// санкреатор на обновление статуса на сервере
    }
    const onChangeStatus = (event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const text = event.target.value;// вынимаем значение введенное в поле ввода input
        dispatch({type: SET_STATUS_TMP_INPUT, text: text})// присваиваем переменной временного статуса из локального стейта введенное значение в поле
    }
    const checkEnterPressed = (e: React.KeyboardEvent) => { // проверка нажатия Enter
        if (e.charCode === 13) {
            setMyStatus()//задание статуса при нажатии Enter
        }
    }

    type CommonInputGroupType = {
        isDisabled: boolean,
        onClickMethod: CheckIfICanModifyStatusType,
        value:string
    }
    const CommonInputGroup:React.FC<CommonInputGroupType>  = ({isDisabled, onClickMethod, value}) => {
        if (!value) {
            value="";
        }
        // общий метод (компонента) редактирования и отображения статуса
        return <InputGroup className="my-3" onClick={onClickMethod}> {/*отступ и метод по клику*/}
            <InputGroup.Text id="basic-addon1">Статус:</InputGroup.Text> {/* текст слева от поля*/}
            <Form.Control
                title={value}
                onClick={onClickMethod}
                value={value} // жестко зафиксировали значение поля ввода на временное значение статуса в локальном стейте
                onChange={(e)=>onChangeStatus(e)} // задание временного локального статуса
                onBlur={setMyStatus}// задание стейта при потере фокуса input
                autoFocus // фокусировка на поле ввода текста
                placeholder={"задайте статус"}// текст при пустом поле ввода
                onKeyPress={(e)=>checkEnterPressed(e)} // проверка нажатия Enter
                disabled={isDisabled}
            />
        </InputGroup>
    }
    return (<div>
        {!localState.modifyStatus2 // отображение или модификация статуса
            ? <CommonInputGroup isDisabled={true} onClickMethod={checkIfICanModifyStatus} value={status}/>
            : <CommonInputGroup isDisabled={false} onClickMethod={setMyStatus} value={localState.statusTmpInput2}/>
        }
    </div>)
})
export default ProfileStatusUseReducer







