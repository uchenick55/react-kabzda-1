import React from "react";
import {Formik, Form} from "formik"; //формик с компонентами и пользовательским хуком
import * as Yup from 'yup' // валидация форм с помошью сторонней библиотеки Yup
import classes from './EditProfile.module.css'
//import DisplayFormikState from "../../../common/formikCommon/DisplayFormikState"
import {MyCheckbox, MyTextInput} from "../../../common/formikCommon/MyFieldsBS"
import Button from "react-bootstrap/Button";
import {ProfileType} from "../../../../types/commonTypes";
import {getProfileType} from "../../../api/apiTypes";

let myValidationSchema = Yup.object({ // валидация форм на required, длину и заполнение полей
})

type EditProfileFormikType = {
    putProfile: (putProfile2: ProfileType) =>void,
    setEditMode: (editMode: boolean)=> void
    profile: getProfileType,
    editProfileStatus:Array<string>,
    setEditProfileStatus: (editProfileStatus: Array<string>)=> void

}
const EditProfileFormik:React.FC<EditProfileFormikType> = (
    {putProfile, setEditMode, profile, editProfileStatus, setEditProfileStatus}
    ) => { // основная компонента с входным колбэком, чтобы забрать данные с форм

    const myInitialValues = { // начальные зачения форм
        FullName: profile.fullName,
        AboutMe: profile.aboutMe,
        LookingForAJob: profile.lookingForAJob,
        LookingForAJobDescription: profile.lookingForAJobDescription,
        contacts: profile.contacts, // остальные данные с контактов профиля
    }

    const myOnSubmit = (values:ProfileType, {resetForm}:any) => { // действия по сабмиту
        putProfile(values) // колбек, который принимает результат ввода формы
        resetForm()// сбросить значение формы после ввода

    }

    return (
        React.createElement(Formik, {
            initialValues: myInitialValues, // начальные значения форм
            validationSchema: myValidationSchema, // схема валидации
            // @ts-ignore
            onSubmit: myOnSubmit // действия по сабмиту
        }, ({
                // @ts-ignore
                handleReset,// обнуление полей
            }) => ( // обертка для вывода значений ввода в любом месте формы паралельно (или в итоге)
        React.createElement(Form, {className: classes.MyPosts},

            React.createElement('div', {},
                React.createElement('div', //Редактирование профиля
                        {className: classes.HeaderEditProfileForm},
                        'Редактирование профиля'
                    ),
                React.createElement(MyTextInput, //Полное имя:
                        {
                            label: "Имя",
                            autoFocus: false,
                            name: 'FullName',
                            type: 'text',
                            placeholder: 'Имя',
                            leftLabelLength: "5rem" // слева в input появляется label указанной длины
                        }
                    ),

                React.createElement(MyTextInput,//Обо мне
                        {label: "Обо мне", autoFocus: false, name: 'AboutMe', type: 'text', placeholder: 'Обо мне', leftLabelLength: "5rem"}, // слева в input появляется label указанной длины
                    ),

                // @ts-ignore
                React.createElement(MyCheckbox, {name: 'LookingForAJob'}, //чекбокс ищу работу
                        "в поисках работы"
                    ),

                React.createElement(MyTextInput, { //Описание поиска работы
                            label: "Описание", autoFocus: false, name: 'LookingForAJobDescription',
                            type: 'textarea', placeholder: 'Описание', leftLabelLength: "5rem" // слева в input появляется label указанной длины
                        }
                    ),

                React.createElement('h4', {},// вывод всех полей подобъекта контакты
                        "Контакты:"
                    ),

                React.createElement('div', {className: classes.EditProfileContactsFields},
                    Object.keys(profile.contacts).map((c) => { // вывод списка контактов, мапим
                            return React.createElement('div', {key: c},
                                React.createElement(
                                    MyTextInput,
                                    {
                                        label: c,
                                        autoFocus: false,
                                        name: 'contacts[' + c + ']',
                                        type: 'text',
                                        placeholder: c,
                                        leftLabelLength: "5rem" // слева в input появляется label указанной длины
                                    },
                                ),
                                React.createElement('div', {}, //ошибки редактирования профиля с сервера
                                    editProfileStatus.map(err => {// прогоняем весь массив ошибок с сервера на обновление профиля
                                        if (err.toLowerCase().includes(c.toLowerCase())) { // если имя отрисовываемого поля "с" соджержится в сообщении об ошибке
                                            return React.createElement('div', {key: err, className: classes.errorText}, err )// выводим сообщение об ошибке рядом с полем
                                        }
                                        return null
                                    })
                                ),
                            )
                        })
                    ),
                React.createElement('br'), //перенос строки

                    //кнопка сброса к значениям по умолчанию
                React.createElement(Button, {
                        type: 'button',
                        variant: "warning",
                        onClick: () => { // при клике по кнопке сброс
                            handleReset();// занулить поля ввода по умолчанию
                            setEditProfileStatus([]); // сбросить сообщение об ошибке с сервера
                        }
                    }, 'Сброс'),

                    " ", //отступ между кнопками

                    //кнопка отправить форму
                React.createElement(Button, {type: 'submit'}, 'Применить'),

                    " ", //отступ между кнопками

                    //отмена
                React.createElement(Button, {
                        variant: "secondary",
                        onClick: () => { // при клике по кнопке отмена
                            setEditMode(false)// переключиться с режима редактирования профиля на просмотр
                            setEditProfileStatus([]) // сбросить сообщение об ошибке с сервера
                        }
                    }, 'Отмена'),
                )
            )
        ))
    )
}

export default EditProfileFormik

