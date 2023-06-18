import React, {ChangeEvent, useCallback, useState} from "react";
import InputButtonUsersRender from "./InputButtonRender";
import {useDispatch, useSelector} from "react-redux";
import {usersSelectorsSimple} from "../users-selectors";
import {UsersActions} from "../../../redux/users-reducer";
import {GlobalStateType} from "../../../redux/store-redux";

const InputButtonContainer: React.FC = () => {

    const dispatch = useDispatch()

    const {setOnlyFriends, setTerm} = UsersActions // деструктуризация методов ActionCreator

    const onlyFriends: boolean = useSelector( usersSelectorsSimple.getOnlyFriends )// селектор получить только моих друзей

    const term: string = useSelector( (state: GlobalStateType) => state.usersPage.term )// поисковый запрос среди users

    const [onChangeTerm, setOnChangeTerm] = useState<string>( term ) // локальный стейт значения поля ввода input Users

    const SetTermFunction = () => {
        dispatch( setTerm( onChangeTerm ) ) // задание в стейт поискового запроса
    }

    return <InputButtonUsersRender //вывод инпута и кнопки для поиска юзеров {/*использование фрагмента вместо div/span*/}
        onChangeTerm={onChangeTerm}
        onlyFriends={onlyFriends}
        setOnChangeTerm={setOnChangeTerm}
        SetTermFunction={SetTermFunction}
        setOnlyFriends={setOnlyFriends}
    />
}

export default InputButtonContainer

