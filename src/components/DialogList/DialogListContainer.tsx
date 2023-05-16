import React from 'react';
import DialogList from "./DialogList";
import {
    deleteDialogThunkCreator,
    getDialogLastUpdateTimeTnkCrt,
    getDialogsThunkCreator, getMyDialogListThunkCreator,//getFollowThunkCreator,
    DialogsActions,
} from "../../redux/dialogs-reducer";
import {connect} from "react-redux";
import {compose} from "redux";
import {getProfileThunkCreator} from "../../redux/profile-reducer";
import NavigateToLoginHoc2 from "../hoc/NavigateToLoginHoc2";
import withRouter2 from "../hoc/withRouter2";
import {messages2Type, NulableType} from "../../types/commonTypes";
import {GlobalStateType} from "../../redux/store-redux";

const {setdialogUserID, setMessages} = DialogsActions

type DialogListContainerPropsType = {
    myId: number, // мой ID (авторизованного пользователя)
    dialogUserID: number, // ID пользователя, с кем сейчас идет диалог
    messages2: NulableType<Array<messages2Type>>, // массив сообщений текущего диалога
    dialogLastUpdateTime: string,// время последнего времени обновления текущего диалога
    userId: number,
    getDialogsThunkCreator: (myId: number, userId: number) => void,
    setMessages: (updatedMessages: Array<messages2Type>) => void,
    setdialogUserID: (dialogUserID: number) => void,
    getProfileThunkCreator: (userId: number, shouldUpdateDialogList: boolean, myId: number) => void,
    getDialogLastUpdateTimeTnkCrt: (myId: number, userId: number) => void,
    getMyDialogListThunkCreator: (myId: number) => void,
    deleteDialogThunkCreator: (dialogId: number, userId1: number, userId2: number) => void
}

class DialogListContainer extends React.Component<DialogListContainerPropsType> {
    commonPartMountUpdate = () => {// общая часть для componentDidMount и componentDidUpdate
        if (!this.props.userId) { // если перешли на вкладку DialogList с нулевым userId
            if (this.props.messages2 && this.props.messages2.length > 0) { // если массив сообщений непустой
                this.props.setMessages( [] ); // занулить массив сообщений (очистить список сообщений)
                this.props.setdialogUserID( 0 ) // занулить userId (убрать выделение диалога)
            }
            return
        }
        if (this.props.dialogUserID !== this.props.userId) { // если считаный из URL userId не равен тому, что в BLL
            this.props.setdialogUserID( this.props.userId ) // задать в BLL считаный из URL ID
            //здесь запросить профиль выбранного userId через getProfileThunkCreator
            this.props.getProfileThunkCreator( this.props.userId, true, this.props.myId )// при переходе в диалог любого пользователя считать его данные профиля с сервера
        }

    }

    componentDidMount() {
        this.getDialogList()
        this.commonPartMountUpdate();// общая часть для componentDidMount и componentDidUpdate
    }

    componentDidUpdate(prevProps: DialogListContainerPropsType) {
        //       console.log("DialogListContainer -> componentDidUpdate")
        this.commonPartMountUpdate(); // общая часть для componentDidMount и componentDidUpdate
        if (this.props.dialogLastUpdateTime !== prevProps.dialogLastUpdateTime) { // если время обновления диалога изменилось
            this.getDialogs()// запросить новые сообщения по диалогу
        }
    }

    getDialogs = () => {
        if (this.props.userId === 0) {
            return
        }// при клике просто по вкладке DialogList
        this.props.getDialogsThunkCreator( this.props.myId, this.props.userId );// получить диалоги
    }

    getDialogLastUpdateTime = () => {
        if (this.props.userId === 0) {
            return
        }// при клике просто по вкладке DialogList
        this.props.getDialogLastUpdateTimeTnkCrt( this.props.myId, this.props.userId ); // получить время последенего обновления диалога
    }

    getDialogList = () => {
        this.props.getMyDialogListThunkCreator( this.props.myId )
    }

    deleteDialog = (dialogId: number, userId2: number) => {
        this.props.deleteDialogThunkCreator( dialogId, this.props.myId, userId2 )
    }

    render() {
        return <div>
            <DialogList
                getDialogLastUpdateTime={this.getDialogLastUpdateTime} // проброс метода - получить время обновления текущего диалога
                getDialogList={this.getDialogList} // периодическая проверка написал ли кто мне, или я с кем диалог начал
            />
        </div>
    }
}

let mapStateToProps = (state: GlobalStateType) => {
    return {
        myId: state.auth.myId, // мой ID (авторизованного пользователя)
        dialogUserID: state.dialogsPage.dialogUserID, // ID пользователя, с кем сейчас идет диалог
        messages2: state.dialogsPage.messages2, // массив сообщений текущего диалога
        dialogLastUpdateTime: state.dialogsPage.dialogLastUpdateTime,// время последнего времени обновления текущего диалога
    }
}

type mapStateToPropsType = {
    myId: number, // мой ID (авторизованного пользователя)
    dialogUserID: number, // ID пользователя, с кем сейчас идет диалог
    messages2: NulableType<Array<messages2Type>>, // массив сообщений текущего диалога
    dialogLastUpdateTime: string,// время последнего времени обновления текущего диалога
}

type mapDispatchToPropsType = {
    getDialogsThunkCreator: (myId: number, userId: number) => void
    setMessages: (updatedMessages: Array<messages2Type>) => void,
    setdialogUserID: (dialogUserID: number) => void,
    getProfileThunkCreator: (userId: number, shouldUpdateDialogList: boolean, myId: number) => void,
    getDialogLastUpdateTimeTnkCrt: (myId: number, userId: number) => void,
    getMyDialogListThunkCreator: (myId: number) => void,
    deleteDialogThunkCreator: (dialogId: number, userId1: number, userId2: number) => void
}
export default compose<React.ComponentType>(
    connect<
        mapStateToPropsType,
        mapDispatchToPropsType,
        unknown,
        GlobalStateType
        >( mapStateToProps,
        {
            getDialogsThunkCreator,//санкреатор получения диалогов с данными
            setdialogUserID, // экшнкреатор задания списка сообщений в стейт messages2
            setMessages,// экшнкреатор задания списка сообщений в стейт messages2
            getDialogLastUpdateTimeTnkCrt,//санкреатор получения диалогов с данными
            getProfileThunkCreator,// санкреатор на получение профиля выбранного пользователя
            getMyDialogListThunkCreator,//санкреатор получения моего диалогЛиста
            deleteDialogThunkCreator, //санкреатор удаления диалога из диалогЛиста
        }
    ),
    withRouter2,// получить данные ID из URL браузера и добавить в пропсы
    NavigateToLoginHoc2 // проверка, залогинен ли я
)
( DialogListContainer );






















