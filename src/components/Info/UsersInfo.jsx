import {connect} from "react-redux";
import React from "react";

let UsersInfo = ({myId, myLogin}) => {
    return (<div>
        <p>Пользователей можно искать по имени;</p>
        <p>Вы можете добавить пользователей в избранное, нажав звездочку. Аналогично их можно удалять;</p>
        <p>Если нажать звездочку в поле поиска, отобразятся только избранные пользователи;</p>
        <p>Реализована пагинация;</p>
        <p>Так же вы можете зарегистрировать новый аккаунт на странице <a
            href="https://social-network.samuraijs.com/">https://social-network.samuraijs.com/</a> и добавить его через
            поиск в избранное;</p>
        <p>Свой ID вы добавить в друзья не можете - Ваш ID: <b>{myId}</b> <br/>
            Попробуйте найти его при помощи пагинации. Или вбейте в поиск <b>{myLogin}</b>. Кнопка добавления не будет
            реагировать;
        </p>
        <p>В карточке пользователя при клике по аватару можно перейти в профиль;</p>
        <p>Так же можно перейти на страницу диалога с выбранным пользователем, нажав соответствующую пиктограмму в
            карточе. </p>

    </div>)
}

let mapStateToProps = (state) => {
    return {
        myId: state.auth.myId,
        myLogin: state.auth.myLogin
    }
}

export default connect(mapStateToProps, null)(UsersInfo)
