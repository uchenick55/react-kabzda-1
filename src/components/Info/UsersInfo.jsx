import {connect} from "react-redux";

let UsersInfo = ({myID, myLogin}) => {
    return (<div>
        <p>Страница поиска пользователей</p>
        <p>При нажатии в списке пользователей Add мы добавляем его в список друзей.
            Пользователь автоматически добавляется в "My Friendlist" навбара справа  </p>
        <p>Реализована пагинация и scroll колонки пользователей</p>
        <p>Пользователя можно искать. Попробуйте вбить free, перейти на вторую страницы пагинации и добавить пользователя с ID 1079 (тестовый аккаунт для проверки общения в диалогах) </p>
        <p>Так же вы можете зарегистрировать новый аккаунт на странице <a href="https://social-network.samuraijs.com/">https://social-network.samuraijs.com/</a>  и добавить его через поиск для диалогов</p>
        <p>Свой ID вы добавить в друзья не можете - Ваш ID: <b>{myID}</b> <br/>
        Попробуйте найти его при помощи пагинации. Или вбейте в поиск <b>{myLogin}</b>. Кнопка Add будет неактивной.
        </p>

    </div>)
}

let mapStateToProps = (state) => {
    return {
        myID: state.auth.myID,
        myLogin: state.auth.myLogin
    }
}

export default connect(mapStateToProps, null)(UsersInfo)
