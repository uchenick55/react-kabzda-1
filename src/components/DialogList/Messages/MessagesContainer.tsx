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
import ScrollBottom from "../../common/CommonClasses/ScrollBottom";
import {messages2Type, NulableType} from "../../../types/commonTypes";
import {getProfileType} from "../../api/apiTypes";
import {GlobalStateType} from "../../../redux/store-redux";

type MessagesContainerPropsType = {
    myId: number, // мой ID (авторизованного пользователя)
    myLogin: string
    myProfile: NulableType<getProfileType>
    dialogUserID: number, // ID пользователя, с кем сейчас идет диалог
    messages2: NulableType<Array<messages2Type>>, // массив сообщений текущего диалога
    profile: NulableType<getProfileType> , // профиль просматриваемого пользователя по умолчанию
    userId:number,
    patch: string,
    PageWidth: number
    sendDialogsThunkCreator: (formDataNewMessage:string, myId:number, MyName:string, MyPhoto:string, userId:number)=>void,
    deleteMessageThunkCreator: (messageID:number, myId:number, userId:number) => void,
    updateDialogListThunkCreator:(userId1:number, userId2:number, Name2:string, Photo2:string)=>void
}
class MessagesContainer extends React.Component<MessagesContainerPropsType> {

    sendMessage = (NewMessage: string) => { // отправка сообщения
        if (!this.props.userId) { // при клике просто по вкладке DialogList
            alert("Выберите диалог") // предупреждение если диалог не выбран
            return
        }
        if (!NewMessage) { // при клике просто по вкладке DialogList
            return // не реагировать на пустые сообщения
        }

        const userName:string = this.props.profile ? this.props.profile.fullName: ""; // получить имя пользователя
        const userPhoto:string = this.props.profile ? this.props.profile.photos.small: ""; // и его фото из стейта
        const myPhoto: string = this.props.myProfile? this.props.myProfile.photos.small:"" // мое фото

        this.props.sendDialogsThunkCreator( // отправить сообщение
            NewMessage,
            this.props.myId, // мой ID для формирования DialogList собеседника
            this.props.myLogin, // мой логин  для формирования DialogList собеседника
            myPhoto, // мое фото  для формирования DialogList собеседника
            this.props.userId, // ID собеседника для формирования моего DialogList
        ); // отправить сообщение

        this.props.updateDialogListThunkCreator( // обновление диалогЛиста
            this.props.myId, // мой ID
            this.props.userId, // ID с кем веду диалог
            userName, // его имя
            userPhoto // и фото
        )
    }

    deleteMessage = (messageID:number) => { // удалить сообщение по его ID в списке
        this.props.deleteMessageThunkCreator(messageID, this.props.myId, this.props.userId);
    }

    scrollBottom = () => {
        ScrollBottom()
    }

    render() {
        return <div>
            <MessagesRender
                messages2 ={this.props.messages2}// массив сообщений текущего диалога
                myId={this.props.myId} // мой ID
                deleteMessage = {this.deleteMessage} // удалить сообщение
                sendMessage={this.sendMessage} // проброс местного метода отправки сообщений
                scrollBottom={this.scrollBottom}
                profile={this.props.profile}
                patch = {this.props.patch}
                PageWidth = {this.props.PageWidth}
        />
        </div>
    }
}

let mapStateToProps = (state:GlobalStateType) => {
    return {
        myId: state.auth.myId, // мой ID (авторизованного пользователя)
        myLogin: state.auth.myLogin,
        myProfile: state.auth.myProfile,
        dialogUserID: state.dialogsPage.dialogUserID, // ID пользователя, с кем сейчас идет диалог
        messages2: state.dialogsPage.messages2, // массив сообщений текущего диалога
        profile: state.profilePage.profile, // профиль пользователя для создания dialogList
        profilePage: state.profilePage, // страница профиля пользователя для создания dialogList
        patch: state.app.patch,
        PageWidth: state.app.PageWidth
    }
}
type mapStateToPropsType = {
    myId: number, // мой ID (авторизованного пользователя)
    myLogin: string
    dialogUserID: number, // ID пользователя, с кем сейчас идет диалог
    messages2: NulableType<Array<messages2Type>>, // массив сообщений текущего диалога
    profile: NulableType<getProfileType>, // профиль просматриваемого пользователя по умолчанию
    myProfile: NulableType<getProfileType>,
    patch: string,
    PageWidth: number
}
type mapDispatchToPropsType = {
    sendDialogsThunkCreator: (formDataNewMessage:string, myId:number, MyName:string, MyPhoto:string, userId:number)=>void,
    deleteMessageThunkCreator: (messageID:number, myId:number, userId:number) => void
    updateDialogListThunkCreator:(userId1:number, userId2:number, Name2:string, Photo2:string)=>void
}
export default compose<any>(
    connect<
        mapStateToPropsType,
        mapDispatchToPropsType,
        unknown,
        GlobalStateType
        >(mapStateToProps,
        {
            sendDialogsThunkCreator,//санкреатор отправки нового сообщения в диалог
            deleteMessageThunkCreator,//санкреатор удаления сообщения из далога
            updateDialogListThunkCreator,//санкреатор обновления диалогЛиста (моего когда я пишу кому то сообщение) - запись в localStorage.
        }
    ),
    withRouter2,// получить данные ID из URL браузера и добавить в пропсы
)
(MessagesContainer);






















