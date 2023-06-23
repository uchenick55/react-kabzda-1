import React, {ChangeEvent, useState} from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

type ProfileStatusUseStateType = {
    myId: number, // мой id для модификации статуса
    userId: number | undefined, // id отображаемого пользователя
    status: string, // статус из BLL
    putStatusThunkCreator: (statusTmpInput: string) => void, // санкреатор для обновления сатуса
}

const ProfileStatusUseState: React.FC<ProfileStatusUseStateType> = ({userId, myId, status, putStatusThunkCreator}) => {
    const [modifyStatus, setModifyStatus] = useState<boolean>( false ) // локальная переменная-флаг модификации статуса
    const [statusTmpInput, setStatusTmpInput] = useState<string>( "" ) // локальный статус до отправки на сервер (поле input)

    const checkIfICanModifyStatus = () => {// проверка, что я могу менять статус (открыт мой профиль со статусом)
        if (userId === myId) { // если ID открытого пользователя равен моему
            setModifyStatus( true )// смена текстового отображения статуса на поле input
            setStatusTmpInput( status )// временное значение статуса на время ввода поля input. Изначально берем из статуса BLL
        }
    }
    const setMyStatus = () => { // действия после двойного клика по полю input статуса или вводу Enter
        setModifyStatus( false ) // переключение с поля ввода статуса на простой текст
        putStatusThunkCreator( statusTmpInput )
    }
    const onChangeStatus = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const text = event.currentTarget.value;// вынимаем значение введенное в поле ввода input
        setStatusTmpInput( text );// присваиваем переменной временного статуса из локального стейта введенное значение в поле
    }

    const checkEnterPressed = (event: React.KeyboardEvent) => { // проверка нажатия Enter
        if (event.charCode == 13) {
            setMyStatus()//задание статуса при нажатии Enter
        }
    }

    return <InputGroup className="my-3" onDoubleClick={checkIfICanModifyStatus}>
        <InputGroup.Text id="basic-addon1">Статус:</InputGroup.Text> {/* текст слева от поля*/}
        <Form.Control
            value={!modifyStatus ? status : statusTmpInput} // жестко зафиксировали значение поля ввода на временное значение статуса в локальном стейте
            title={!modifyStatus ? "Двойной клик для - правки" : "Двойной клик/смена фокуса/enter - для сохранения"}
            onChange={onChangeStatus} // задание временного локального статуса
            onBlur={setMyStatus}// задание стейта при потере фокуса input
            placeholder={!modifyStatus ? "нет статуса" : "задайте статус"}// текст при пустом поле ввода
            onKeyPress={checkEnterPressed} // проверка нажатия Enter
            disabled={!modifyStatus ? true : false}
        />
    </InputGroup>
}

export default ProfileStatusUseState
