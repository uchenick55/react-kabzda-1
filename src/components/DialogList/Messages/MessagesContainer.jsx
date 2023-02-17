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

    scrollBottom = () => {
        const scrollHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        );
        window.scrollTo(0, scrollHeight)
    }

    render() {
        return <div>
            <MessagesRender
                messages2 ={this.props.messages2}// массив сообщений текущего диалога
                myId={this.props.myId} // мой ID
                deleteMessage = {this.deleteMessage} // удалить сообщение
                sendMessage={this.sendMessage} // проброс местного метода отправки сообщений
                scrollBottom={this.scrollBottom}
                profilePage={this.props.profilePage}
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
    }
}

export default compose(
    connect(mapStateToProps,
        {
            sendDialogsThunkCreator,//санкреатор отправки нового сообщения в диалог
            deleteMessageThunkCreator,//санкреатор удаления сообщения из далога
            updateDialogListThunkCreator,//санкреатор обновления диалогЛиста (моего когда я пишу кому то сообщение) - запись в localStorage.
        }
    ),
    withRouter2,// получить данные ID из URL браузера и добавить в пропсы
)
(MessagesContainer);






















