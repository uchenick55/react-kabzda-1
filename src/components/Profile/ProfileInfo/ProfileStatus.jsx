import React from "react";

class ProfileStatus extends React.Component {
    localStatus = { // локальный стейт для статуса
        modifyStatus: false, // можно ли модифицировать статус и переключить на поле ввода?
        statusTmpInput: this.props.status // временное значение статуса на время ввода поля input. Изначально берем из статуса BLL
    }
    checkIfICanModifyStatus = () => { // проверка, что я могу менять статус (открыт мой профиль со статусом)
        if (this.props.userId===this.props.myId) { // если ID открытого пользователя равен моему
            this.localStatus.modifyStatus=true; // смена текстового отображения статуса на поле input
            this.setState({modifyStatus: true}) // принудительная переотрисовка после смены локального статуса
        }
    }
    onChangeStatus = (event) => {
        let text = event.target.value; // вынимаем значение введенное в поле ввода input
        this.localStatus.statusTmpInput = text;// присваиваем переменной временного статуса из локального стейта введенное значение в поле
        this.setState({statusTmpInput: text}) // принудительная переотрисовка после смены локального статуса
    }
    setMyStatus = () => { // действия после двойного клика по полю input статуса
        this.localStatus.modifyStatus = false // переключение с поля ввода статуса на простой текст
        this.props.putStatusThunkCreator(this.localStatus.statusTmpInput, this.props.myId)
        this.setState({modifyStatus: false}) // принудительная переотрисовка после смены локального статуса
    }

    render () {
        return (
            <div>
                {!this.localStatus.modifyStatus
                ?<span onDoubleClick={this.checkIfICanModifyStatus} /*при двойном клике на статусе проверка могу ли я ввобще менять статус*/>
                        Статус: {!this.props.status // если статуса из стейта нет или он нулевой
                        ? "нет статуса" // отображение "нет статуса"
                        :this.props.status // если статус есть из BLL, он отображается
                }
                </span>
                :<span onDoubleClick={this.setMyStatus}><input onChange={this.onChangeStatus}
                                                               value={this.localStatus.statusTmpInput} // жестко зафиксировали значение поля ввода на временное значение статуса в локальном стейте
                                                               autoFocus={true} // фокусировка на поле ввода текста
                                                               placeholder={"задайте статус"}// текст при пустом поле ввода
                    />
                </span>
                }
            </div>
        )
    }
}

export default ProfileStatus