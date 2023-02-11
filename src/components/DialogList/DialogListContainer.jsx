import React from 'react';
import DialogList from "./DialogList";
import {
    deleteDialogThunkCreator,
    deleteMessageThunkCreator,
    getDialogLastUpdateTimeTnkCrt,
    getDialogsThunkCreator, getFollowThunkCreator, getMyDialogListThunkCreator,
    sendDialogsThunkCreator,
    setdialogUserID,
    setMessages, updateDialogListThunkCreator
} from "../../redux/dialogs-reducer";
import {connect} from "react-redux";
import {compose} from "redux";
import {getProfileThunkCreator} from "../../redux/profile-reducer";
import NavigateToLoginHoc2 from "../hoc/NavigateToLoginHoc2";
import withRouter2 from "../hoc/withRouter2";

class DialogListContainer extends React.Component {
    commonPartMountUpdate = () => {// общая часть для componentDidMount и componentDidUpdate
        if (!this.props.userId) { // если перешли на вкладку DialogList с нулевым userId
            if (this.props.messages2.length>0) { // если массив сообщений непустой
                this.props.setMessages([]); // занулить массив сообщений (очистить список сообщений)
                this.props.setdialogUserID(null) // занулить userId (убрать выделение диалога)
            }
            return
        }
        if ( this.props.dialogUserID!==this.props.userId) { // если считаный из URL userId не равен тому, что в BLL
            this.props.setdialogUserID(this.props.userId) // задать в BLL считаный из URL ID
            //здесь запросить профиль выбранного userId через getProfileThunkCreator
            this.props.getProfileThunkCreator(this.props.userId, true, this.props.myId)// при переходе в диалог любого пользователя считать его данные профиля с сервера
        }

    }
    componentDidMount() {
        this.getDialogList()
        //      console.log("DialogListContainer -> componentDidMount")
        this.commonPartMountUpdate();// общая часть для componentDidMount и componentDidUpdate
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //       console.log("DialogListContainer -> componentDidUpdate")
        this.commonPartMountUpdate(); // общая часть для componentDidMount и componentDidUpdate
        if  (this.props.dialogLastUpdateTime!==prevProps.dialogLastUpdateTime) { // если время обновления диалога изменилось
            this.getDialogs()// запросить новые сообщения по диалогу
        }
    }

    getDialogs = () => {
        if (this.props.userId === "") {return}// при клике просто по вкладке DialogList
        this.props.getDialogsThunkCreator(this.props.myId, this.props.userId);// получить диалоги
    }

    getDialogLastUpdateTime = () => {
        if (this.props.userId === "") {return}// при клике просто по вкладке DialogList
        this.props.getDialogLastUpdateTimeTnkCrt(this.props.myId, this.props.userId); // получить время последенего обновления диалога
    }

    getDialogList = () => {
        this.props.getMyDialogListThunkCreator(this.props.myId)
    }

/*
    sendMessage = (NewMessage) => { // отправка сообщения
        if (!this.props.userId) { // при клике просто по вкладке DialogList
            alert("Выберите диалог") // предупреждение если диалог не выбран
            return
        }
        if (!NewMessage) { // при клике просто по вкладке DialogList
            return // не реагировать на пустые сообщения
        }

        let profilePage = this.props.profilePage // локальный стейт страницы пользователя
        let userName = 0 // задаем переменную имени пользователя
        let userPhoto = 0 // и его фото для отображения в диалоглисте
        if (profilePage!==null) { // если профиль пользователя уже загружен
            userName = this.props.profilePage.profile.fullName; // переопределить имя пользователя
            userPhoto = this.props.profilePage.profile.photos.small; // и его фото и стейта
        }

        this.props.sendDialogsThunkCreator( // отправить сообщение
            NewMessage,
            this.props.auth.myId, // мой ID для формирования DialogList собеседника
            this.props.auth.myLogin, // мой логин  для формирования DialogList собеседника
            this.props.auth.myProfile.photos.small, // мое фото  для формирования DialogList собеседника
            this.props.userId, // ID собеседника для формирования моего DialogList
        ); // отправить сообщение

        this.props.updateDialogListThunkCreator( // обновление диалогЛиста
            this.props.auth.myId, // мой ID
            this.props.userId, // ID с кем веду диалог
            userName, // его имя
            userPhoto // и фото
        )
        //userId1, userId2, Name2, Photo2
    }
*/

/*    deleteMessage = (messageID) => { // удалить сообщение по его ID в списке
        this.props.deleteMessageThunkCreator(messageID, this.props.myId, this.props.userId);
    }*/

    deleteDialog = (dialogId, userId2) => {
        this.props.deleteDialogThunkCreator(dialogId, this.props.myId, userId2)
        // здесь сменить URL без ID
    }

    render () {
        return <div>
            <DialogList
                messages2 ={this.props.messages2}// массив сообщений текущего диалога
                dialogs ={this.props.dialogs} // список диалогов
                dialogs2 ={this.props.dialogs2} // список диалогов с LocalStorage
                {...this.props} // все входящие пропсы пробросили дальше
             //   sendMessage={this.sendMessage} // проброс местного метода отправки сообщений
                getDialogs={this.getDialogs}  // проброс местного метода получить диалоги
                getDialogLastUpdateTime={this.getDialogLastUpdateTime} // проброс метода - получить время обновления текущего диалога
                myId={this.props.myId} // мой ID
             //   deleteMessage = {this.deleteMessage} // удалить сообщение
                getDialogList={this.getDialogList} // периодическая проверка написал ли кто мне, или я с кем диалог начал
                dialogUserID = {this.props.dialogUserID}
                deleteDialog = {this.deleteDialog}
            />
        </div>
    }
}


let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth, // флаг, авторизован ли я сейчас,
        myId: state.auth.myId, // мой ID (авторизованного пользователя)
        dialogUserID: state.dialogsPage.dialogUserID, // ID пользователя, с кем сейчас идет диалог
        messages2: state.dialogsPage.messages2, // массив сообщений текущего диалога
  //      dialogs: state.dialogsPage.dialogs, // список диалогов
        dialogLastUpdateTime: state.dialogsPage.dialogLastUpdateTime,// время последнего времени обновления текущего диалога
        dialogs2: state.dialogsPage.dialogs2, // список диалогов с LocalStorage
        profilePage:state.profilePage, // страница профиля пользователя для создания dialogList
        auth: state.auth,// страница моего профиля для создания dialogList
     //   editProfileStatus: state.auth.editProfileStatus // ошибка правки формы профиля
    }
}

export default compose(
    connect(mapStateToProps,
        {
        //    sendDialogsThunkCreator,//санкреатор отправки нового сообщения в диалог
            getDialogsThunkCreator,//санкреатор получения диалогов с данными
            setdialogUserID, // экшнкреатор задания списка сообщений в стейт messages2
            setMessages,// экшнкреатор задания списка сообщений в стейт messages2
            getDialogLastUpdateTimeTnkCrt,//санкреатор получения диалогов с данными
         //   deleteMessageThunkCreator,//санкреатор удаления сообщения из далога
            getProfileThunkCreator,// санкреатор на получение профиля выбранного пользователя
            getFollowThunkCreator,//санкреатор проверки follow/unfollow выбранного юзера для составления списка диалогов
            getMyDialogListThunkCreator,//санкреатор получения моего диалогЛиста
          //  updateDialogListThunkCreator,//санкреатор обновления диалогЛиста (моего когда я пишу кому то сообщение) - запись в localStorage.
            deleteDialogThunkCreator, //санкреатор удаления диалога из диалогЛиста
        }
    ),
    withRouter2,// получить данные ID из URL браузера и добавить в пропсы
    NavigateToLoginHoc2 // проверка, залогинен ли я
)
(DialogListContainer);






















