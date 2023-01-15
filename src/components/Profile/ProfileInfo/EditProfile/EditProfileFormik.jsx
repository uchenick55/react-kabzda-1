import React from "react";
import {Formik, Form} from "formik"; //формик с компонентами и пользовательским хуком
import * as Yup from 'yup' // валидация форм с помошью сторонней библиотеки Yup
import classes from './EditProfile.module.css'
//import DisplayFormikState from "../../../common/formikCommon/DisplayFormikState"
import {MyCheckbox, MyTextArea, MyTextInput} from "../../../common/formikCommon/MyFields"

let myValidationSchema = Yup.object({ // валидация форм на required, длину и заполнение полей
})

const EditProfileFormik = ({putProfile, setEditMode, profile, userId}) => { // основная компонента с входным колбэком, чтобы забрать данные с форм

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
        <>
            <Formik
                initialValues={myInitialValues} // начальные значения форм
                validationSchema={myValidationSchema} // схема валидации
                onSubmit={myOnSubmit} // действия по сабмиту
            >

                {({
                      handleReset,// обнуление полей
                  }) => ( // обертка для вывода значений ввода в любом месте формы паралельно (или в итоге)
                    <Form className={classes.MyPosts}>
                        <div>
                            <div className={classes.HeaderEditProfileForm}>Редактирование профиля</div>
                            <MyTextInput // Полное имя
                                label="Полное имя:" name='FullName' type='text' placeholder='Полное имя'
                            />

                            <MyTextInput //Обо мне
                                label="Обо мне:" name='AboutMe' type='text' placeholder='Обо мне'
                            />

                            <MyCheckbox name='LookingForAJob'>  {/*чекбокс ищу работу*/}
                                в поисках работы
                            </MyCheckbox>

                            <MyTextArea //Описание поиска работы
                                label="Описание поиска работы:" name='LookingForAJobDescription'
                                type='textarea' placeholder='Описание поиска работы'
                            />

                            <h4>Контакты:</h4> {/*вывод всех полей подобъекта контакты*/}
                            <div className={classes.EditProfileContactsFields}>
                                {Object.keys(profile.contacts).map((c) => { // мапим по контактам
                                    return <div>
                                        <MyTextInput  key={c} //поля с ключами
                                            label={c} name={`contacts[`+c+']'} type='text' placeholder={c}
                                        />
                                    </div>
                                })}
                            </div>
                            <br/>
                            <button type='button' onClick={handleReset}>Сброс</button>
                            {/*кнопка сброса к значениям по умолчанию*/}
                            {" "}
                            <button type="submit">Применить</button> {/*кнопка отправить форму*/}

                             <button type="button" onClick={() => {setEditMode(false)}}>Отмена</button>  {/*отмена*/}

                        </div>
                        {/*   <DisplayFormikState/> {/*отображение всего стейта формика*/}
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default EditProfileFormik

