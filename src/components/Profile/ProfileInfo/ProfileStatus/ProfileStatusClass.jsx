import React from "react";

class ProfileStatusClass extends React.Component {

    localStatus = { // локальный стейт для статуса
        modifyStatus: false, // можно ли модифицировать статус и переключить на поле ввода?
        statusTmpInput: null // временное значение статуса на время ввода поля input. Изначально берем из статуса BLL
    }
    checkIfICanModifyStatus = () => { // проверка, что я могу менять статус (открыт мой профиль со статусом)
        const {userId, myId, status} = this.props;
        if (userId === myId) { // если ID открытого пользователя равен моему
            this.localStatus.modifyStatus = true; // смена текстового отображения статуса на поле input
            this.setState({modifyStatus: true}) // принудительная переотрисовка после смены локального статуса
            this.localStatus.statusTmpInput = status// временное значение статуса на время ввода поля input. Изначально берем из статуса BLL
        }
    }
    onChangeStatus = (event) => {
        let text = event.target.value; // вынимаем значение введенное в поле ввода input
        this.localStatus.statusTmpInput = text;// присваиваем переменной временного статуса из локального стейта введенное значение в поле
        this.setState({statusTmpInput: text}) // принудительная переотрисовка после смены локального статуса
    }
    setMyStatus = () => { // действия после двойного клика по полю input статуса или вводу Enter
        const {putStatusThunkCreator, myId} = this.props;
        this.localStatus.modifyStatus = false // переключение с поля ввода статуса на простой текст
        putStatusThunkCreator(this.localStatus.statusTmpInput, myId) // санкреатор на обновление статуса на сервере
        this.setState({modifyStatus: false}) // принудительная переотрисовка после смены локального статуса
    }
    checkEnterPressed = (event) => { // проверка нажатия Enter
        if (event.charCode === 13) {
            this.setMyStatus(); //задание статуса при нажатии Enter
        }
    }

    render() {
        const {status} = this.props;
        return (
            <div>
                {!this.localStatus.modifyStatus
                    ? <span
                        onDoubleClick={this.checkIfICanModifyStatus} /*при двойном клике на статусе проверка могу ли я ввобще менять статус*/>
                        Статус: {!status // если статуса из стейта нет или он нулевой
                        ? "нет статуса" // отображение "нет статуса"
                        : status // если статус есть из BLL, он отображается
                    }
                </span>
                    : <span onDoubleClick={this.setMyStatus}><input
                        onBlur={this.setMyStatus}// задание статуса при потере фокуса input
                        onChange={this.onChangeStatus} // задание временного локального статуса
                        value={this.localStatus.statusTmpInput} // жестко зафиксировали значение поля ввода на временное значение статуса в локальном стейте
                        // autoFocus  фокусировка на поле ввода текста
                        placeholder={"задайте статус"}// текст при пустом поле ввода
                        onKeyPress={this.checkEnterPressed} // проверка нажатия Enter
                    />
                </span>
                }
            </div>
        )
    }
}

export default ProfileStatusClass
