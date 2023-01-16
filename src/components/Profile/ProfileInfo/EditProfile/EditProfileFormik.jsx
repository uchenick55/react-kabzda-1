import React from "react";
import {Formik, Form} from "formik"; //формик с компонентами и пользовательским хуком
import * as Yup from 'yup' // валидация форм с помошью сторонней библиотеки Yup
import classes from './EditProfile.module.css'
//import DisplayFormikState from "../../../common/formikCommon/DisplayFormikState"
import {MyCheckbox, MyTextArea, MyTextInput} from "../../../common/formikCommon/MyFields"

let myValidationSchema = Yup.object({ // валидация форм на required, длину и заполнение полей
})

const EditProfileFormik = ({putProfile, setEditMode, profile, userId}) => { // основная компонента с входным колбэком, чтобы забрать данные с форм

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
        setEditMode(false) // снятие режима редактирования комменты когда закончу форму

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
                        {label: "Полное имя:", name: 'FullName', type: 'text', placeholder: 'Полное имя'}
                    ),

                    e(MyTextInput,//Обо мне
                        {label: "Обо мне:", name: 'AboutMe', type: 'text', placeholder: 'Обо мне'},
                    ),

                    e(MyCheckbox, {name: 'LookingForAJob'}, //чекбокс ищу работу
                        "в поисках работы"
                    ),

                    e(MyTextArea, { //Описание поиска работы
                            label: "Описание поиска работы:", name: 'LookingForAJobDescription',
                            type: 'textarea', placeholder: 'Описание поиска работы'
                        }
                    ),

                    e('h4', {},// вывод всех полей подобъекта контакты
                        "Контакты:"
                    ),

                    /* <div className={classes.EditProfileContactsFields}>
                    {Object.keys(profile.contacts).map((c) => { // мапим по контактам
                        return <div key={c}>
                            <MyTextInput  //поля с ключами
                                label={c} name={`contacts[` + c + ']'} type='text' placeholder={c}
                            />
                        </div>
                    })}
                </div>*/
                    e('div', {className: classes.EditProfileContactsFields},
                        Object.keys(profile.contacts).map((c) => { // вывод списка контактов, мапим
                            return e('div', {key: c},
                                e(
                                    MyTextInput,
                                    {
                                        label: c,
                                        name: 'contacts[' + c + ']',
                                        type: 'text',
                                        placeholder: c
                                    },
                                )
                            )
                        })
                    ),
                    e('br'), //перенос строки

                    //кнопка сброса к значениям по умолчанию
                    e('button', {type: 'button', onClick: handleReset}, 'Сброс'),

                    " ", //отступ между кнопками

                    //кнопка отправить форму
                    e('button', {type: 'submit'}, 'Применить'),

                    " ", //отступ между кнопками

                    //отмена
                    e('button', {
                        onClick: () => { // по клику
                            setEditMode(false)// переключиться с режима редактирования профиля на просмотр
                        }
                    }, 'Отмена')
                )
            )
        ))
    )
}

export default EditProfileFormik

