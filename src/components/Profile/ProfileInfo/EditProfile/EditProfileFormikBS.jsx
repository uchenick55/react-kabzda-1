import React from "react";
import {Formik, Form} from "formik"; //формик с компонентами и пользовательским хуком
import * as Yup from 'yup' // валидация форм с помошью сторонней библиотеки Yup
import classes from './EditProfile.module.css'
//import DisplayFormikState from "../../../common/formikCommon/DisplayFormikState"
import {MyCheckbox, MyTextArea, MyTextInput} from "../../../common/formikCommon/MyFieldsBS"
import Button from "react-bootstrap/Button";

let myValidationSchema = Yup.object({ // валидация форм на required, длину и заполнение полей
})

const EditProfileFormik = ({putProfile, setEditMode, profile, editProfileStatus, setEditProfileStatus}) => { // основная компонента с входным колбэком, чтобы забрать данные с форм

    let e = React.createElement
    let myInitialValues = { // начальные зачения форм
        FullName: profile.fullName,
        AboutMe: profile.aboutMe,
        LookingForAJob: profile.lookingForAJob,
        LookingForAJobDescription: profile.lookingForAJobDescription,
        contacts: profile.contacts, // остальные данные с контактов профиля
    }

    const myOnSubmit = (values, {resetForm}) => { // действия по сабмиту
        putProfile(values) // колбек, который принмает результат ввода формы
        resetForm()// сбросить значение формы после ввода
        //  setEditMode(false) // снятие режима редактирования комменты когда закончу форму

    }

    return (
        e(Formik, {
            initialValues: myInitialValues, // начальные значения форм
            validationSchema: myValidationSchema, // схема валидации
            onSubmit: myOnSubmit // действия по сабмиту
        }, ({
                handleReset,// обнуление полей
            }) => ( // обертка для вывода значений ввода в любом месте формы паралельно (или в итоге)
            e(Form, {className: classes.MyPosts},

                e('div', {},
                    e('div', //Редактирование профиля
                        {className: classes.HeaderEditProfileForm},
                        'Редактирование профиля'
                    ),

                    e(MyTextInput, //Полное имя:
                        {
                            label: "Имя",
                            name: 'FullName',
                            type: 'text',
                            placeholder: 'Имя',
                            leftLabelLength: "5rem" // слева в input появляется label указанной длины
                        }
                    ),

                    e(MyTextInput,//Обо мне
                        {label: "Обо мне", name: 'AboutMe', type: 'text', placeholder: 'Обо мне', leftLabelLength: "5rem"}, // слева в input появляется label указанной длины
                    ),

                    e(MyCheckbox, {name: 'LookingForAJob'}, //чекбокс ищу работу
                        "в поисках работы"
                    ),

                    e(MyTextInput, { //Описание поиска работы
                            label: "Описание", name: 'LookingForAJobDescription',
                            type: 'textarea', placeholder: 'Описание', leftLabelLength: "5rem" // слева в input появляется label указанной длины
                        }
                    ),

                    e('h4', {},// вывод всех полей подобъекта контакты
                        "Контакты:"
                    ),

                    e('div', {className: classes.EditProfileContactsFields},
                        Object.keys(profile.contacts).map((c) => { // вывод списка контактов, мапим
                            return e('div', {key: c},
                                e(
                                    MyTextInput,
                                    {
                                        label: c,
                                        name: 'contacts[' + c + ']',
                                        type: 'text',
                                        placeholder: c,
                                        leftLabelLength: "5rem" // слева в input появляется label указанной длины
                                    },
                                ),
                                e('div', {}, //ошибки редактирования профиля с сервера
                                    editProfileStatus.map(err => {// прогоняем весь массив ошибок с сервера на обновление профиля
                                        if (err.toLowerCase().includes(c.toLowerCase())) { // если имя отрисовываемого поля "с" соджержится в сообщении об ошибке
                                            return e('div', {key: err, className: classes.errorText}, err )// выводим сообщение об ошибке рядом с полем
                                        }
                                        return null
                                    })
                                ),
                            )
                        })
                    ),
                    e('br'), //перенос строки

                    //кнопка сброса к значениям по умолчанию
                    e(Button, {
                        type: 'button',
                        variant: "warning",
                        onClick: () => { // при клике по кнопке сброс
                            handleReset()// занулить поля вводла по умолчанию
                            setEditProfileStatus([]) // сбросить сообщение об ошибке с сервера
                        }
                    }, 'Сброс'),

                    " ", //отступ между кнопками

                    //кнопка отправить форму
                    e(Button, {type: 'submit'}, 'Применить'),

                    " ", //отступ между кнопками

                    //отмена
                    e(Button, {
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

