import React from 'react';
import {
    deleteMessageThunkCreator,
    sendDialogsThunkCreator,
    updateDialogListThunkCreator
} from "../../../redux/dialogs-reducer";
import {connect} from "react-redux";
import {compose} from "redux";
import withRouter2 from "../../hoc/withRouter2";
import MessagesRender from "./MessagesRender";

class MessagesContainer extends React.Component {
/*    commonPartMountUpdate = () => {// общая часть для componentDidMount и componentDidUpdate
        if (!this.props.userId) { // если перешли на вкладку DialogList с нулевым userId
            if (this.props.messages2.length > 0) { // если массив сообщений непустой
                this.props.setMessages([]); // занулить массив сообщений (очистить список сообщений)
                this.props.setdialogUserID(null) // занулить userId (убрать выделение диалога)
            }
            return
        }
        if (this.props.dialogUserID !== this.props.userId) { // если считаный из URL userId не равен тому, что в BLL
            this.props.setdialogUserID(this.props.userId) // задать в BLL считаный из URL ID
            //здесь запросить профиль выбранного userId через getProfileThunkCreator
            this.props.getProfileThunkCreator(this.props.userId, true, this.props.myId)// при переходе в диалог любого пользователя считать его данные профиля с сервера
        }

    }

    componentDidMount() {
        this.getDialogList()
        this.commonPartMountUpdate();// общая часть для componentDidMount и componentDidUpdate
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        this.commonPartMountUpdate(); // общая часть для componentDidMount и componentDidUpdate
        if (this.props.dialogLastUpdateTime !== prevProps.dialogLastUpdateTime) { // если время обновления диалога изменилось
            this.getDialogs()// запросить новые сообщения по диалогу
        }
    }
    getDialogs = () => {
        if (this.props.userId === "") {
            return
        }// при клике просто по вкладке DialogList
        this.props.getDialogsThunkCreator(this.props.myId, this.props.userId);// получить диалоги
    }
    getDialogLastUpdateTime = () => {
        if (this.props.userId === "") {
            return
        }// при клике просто по вкладке DialogList
        this.props.getDialogLastUpdateTimeTnkCrt(this.props.myId, this.props.userId); // получить время последенего обновления диалога
    }
    getDialogList = () => {
        this.props.getMyDialogListThunkCreator(this.props.myId)
    }
    deleteDialog = (dialogId, userId2) => {
            this.props.deleteDialogThunkCreator(dialogId, this.props.myId, userId2)
            // здесь сменить URL без ID
        }*/
    
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
        if (profilePage !== null) { // если профиль пользователя уже загружен
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
    }

    deleteMessage = (messageID) => { // удалить сообщение по его ID в списке
        this.props.deleteMessageThunkCreator(messageID, this.props.myId, this.props.userId);
    }

    render() {
        return <div>
            <MessagesRender
                messages2 ={this.props.messages2}// массив сообщений текущего диалога
                myId={this.props.myId} // мой ID
                deleteMessage = {this.deleteMessage} // удалить сообщение
                sendMessage={this.sendMessage} // проброс местного метода отправки сообщений
        />
        </div>
    }
}

let mapStateToProps = (state) => {
    return {
        myId: state.auth.myId, // мой ID (авторизованного пользователя)
        dialogUserID: state.dialogsPage.dialogUserID, // ID пользователя, с кем сейчас идет диалог
        messages2: state.dialogsPage.messages2, // массив сообщений текущего диалога
        profilePage: state.profilePage, // страница профиля пользователя для создания dialogList
        auth: state.auth,// страница моего профиля для создания dialogList
        //    isAuth: state.auth.isAuth, // флаг, авторизован ли я сейчас,
      //  editProfileStatus: state.auth.editProfileStatus, // ошибка правки формы профиля
        //   dialogs: state.dialogsPage.dialogs, // список диалогов
        //   dialogLastUpdateTime: state.dialogsPage.dialogLastUpdateTime,// время последнего времени обновления текущего диалога
        //    dialogs2: state.dialogsPage.dialogs2, // список диалогов с LocalStorage
    }
}

export default compose(
    connect(mapStateToProps,
        {
            sendDialogsThunkCreator,//санкреатор отправки нового сообщения в диалог
            deleteMessageThunkCreator,//санкреатор удаления сообщения из далога
            updateDialogListThunkCreator,//санкреатор обновления диалогЛиста (моего когда я пишу кому то сообщение) - запись в localStorage.
         //   getDialogsThunkCreator,//санкреатор получения диалогов с данными
          //  setdialogUserID, // экшнкреатор задания списка сообщений в стейт messages2
          //  setMessages,// экшнкреатор задания списка сообщений в стейт messages2
         //   getDialogLastUpdateTimeTnkCrt,//санкреатор получения диалогов с данными
        //    getProfileThunkCreator,// санкреатор на получение профиля выбранного пользователя
        //    getFollowThunkCreator,//санкреатор проверки follow/unfollow выбранного юзера для составления списка диалогов
        //    getMyDialogListThunkCreator,//санкреатор получения моего диалогЛиста
         //   deleteDialogThunkCreator, //санкреатор удаления диалога из диалогЛиста
        }
    ),
    withRouter2,// получить данные ID из URL браузера и добавить в пропсы
)
(MessagesContainer);





















