import React from "react"; // импорт реакта
import {Field, reduxForm, reset} from "redux-form";// reduxForm для ввода новых постов
import classes from './EditProfile.module.css'
import styles from './../../../common/Validation/customFields.module.css'
import {Input} from "../../../common/Validation/customFields";
import {email, Required} from "../../../common/Validation/validationField";

const ProfileForm = ({handleSubmit, error}) => { // компонента формы
    return (
        <form onSubmit={handleSubmit}/*привязка сабмита формы к внутренней функции reduxForm - handleSubmit*/>
            <span>
                <div>
                    <Field
                        name="FullName"// имя поля формы и возвращаемого свойства объекта после сабмита формы
                        component={Input}// компонент - кастомная строка с валидацией
                        placeholder="Полное имя"// текст подсказка при пустом поле
                        validate={[]}
                    />
                </div>
                <div>
                    <Field
                        name="AboutMe"// имя поля формы и возвращаемого свойства объекта после сабмита формы
                        component={Input}// компонент - кастомная строка с валидацией
                        placeholder="Обо мне"// текст подсказка при пустом поле
                        validate={[]}
                    />
                </div>
                <div>
                    <label>В поисках работы:</label>
                    <Field
                        name="LookingForAJob"// имя поля формы и возвращаемого свойства объекта после сабмита формы
                        component="input"// компонент - ввод
                        type="checkbox"// тип - чекбокс В поиске работы? (true/false)
                        validate={[]}
                    />
                </div>
                <div>
                    <Field
                        name="LookingForAJobDescription"// имя поля формы и возвращаемого свойства объекта после сабмита формы
                        component={Input}// компонент - строка
                        placeholder="Описание поиска работы"// текст подсказка при пустом поле
                        validate={[]}
                    />
                </div>
                <label>Контакты</label>
                <div className={classes.EditProfileContactsFields}>
                    <div>
                        <Field
                            name="github"// имя поля формы и возвращаемого свойства объекта после сабмита формы
                            component={Input}// компонент - строка
                            placeholder="github"// текст подсказка при пустом поле
                            validate={[]}
                        />
                    </div>
                    <div>
                        <Field
                            name="vk"// имя поля формы и возвращаемого свойства объекта после сабмита формы
                            component={Input}// компонент - строка
                            placeholder="vk"// текст подсказка при пустом поле
                            validate={[]}
                        />
                    </div>
                    <div>
                        <Field
                            name="facebook"// имя поля формы и возвращаемого свойства объекта после сабмита формы
                            component={Input}// компонент - строка
                            placeholder="facebook"// текст подсказка при пустом поле
                            validate={[]}
                        />
                    </div>
                    <div>
                        <Field
                            name="instagram"// имя поля формы и возвращаемого свойства объекта после сабмита формы
                            component={Input}// компонент - строка
                            placeholder="instagram"// текст подсказка при пустом поле
                            validate={[]}
                        />
                    </div>
                    <div>
                        <Field
                            name="twitter"// имя поля формы и возвращаемого свойства объекта после сабмита формы
                            component={Input}// компонент - строка
                            placeholder="twitter"// текст подсказка при пустом поле
                            validate={[]}
                        />
                    </div>
                    <div>
                        <Field
                            name="website"// имя поля формы и возвращаемого свойства объекта после сабмита формы
                            component={Input}// компонент - строка
                            placeholder="website"// текст подсказка при пустом поле
                            validate={[]}
                        />
                    </div>
                    <div>
                        <Field
                            name="youtube"// имя поля формы и возвращаемого свойства объекта после сабмита формы
                            component={Input}// компонент - строка
                            placeholder="youtube"// текст подсказка при пустом поле
                            validate={[]}
                        />
                    </div>
                    <div>
                        <Field
                            name="mainLink"// имя поля формы и возвращаемого свойства объекта после сабмита формы
                            component={Input}// компонент - строка
                            placeholder="mainLink"// текст подсказка при пустом поле
                            validate={[]}
                        />
                    </div>
                </div>
                <span>
                    <button type="submit">Применить и закрыть</button>
                    {/*кнопка*/}
                </span>
                <span className={styles.commonError}>
                    {/*стилизация красным сообщение об общей ошибке с сервера при ошибках ввода*/}
                    {error} {/*вывод сообщения ошибки после диспатча stopSubmit из auth-reducer.jsx */}
                </span>
            </span>
        </form>
    )
}

// оберточная компонента формы, задает имя подстейта "EditProfileForm"
let EditProfileReduxForm = reduxForm({form: 'EditProfileForm'})(ProfileForm)

let EditProfile = ({putProfile, dispatch, setEditMode}) => {
    let onSubmit = (formData) => { // функция реакции на сабмит формы с данными от формы formData
                                   //      dispatch(reset('EditProfileForm')) // сброс полей формы после ввода
        const LookingForAJob = !formData.LookingForAJob ? false : formData.LookingForAJob // если галочка LookingForAJob не стоит, то false
        putProfile(
            formData.FullName,
            formData.AboutMe,
            LookingForAJob,
            formData.LookingForAJobDescription,
            formData.github,
            formData.vk,
            formData.facebook,
            formData.instagram,
            formData.twitter,
            formData.website,
            formData.youtube,
            formData.mainLink,
        )//вызов putMyProfileThunkCreator выше из ProfileContainer
        setEditMode(false)
    }
    let resetFormFields = () => {
        dispatch(reset('EditProfileForm')) // сброс полей формы после ввода
    }
    return (
        <div>
            <div className={classes.HeaderEditProfileForm}>Отредактируйте профиль</div>
            {/*h3 заголовок*/}
            <div>(можно отдельные поля)</div>
            <div className={classes.EditProfile}>
                <div>
                    <EditProfileReduxForm
                        onSubmit={onSubmit}/>{/*вызов формы логина с отсылкой на локальный обработчик сабмита*/}
                    <button onClick={resetFormFields}>Сброс полей формы</button>
                </div>
            </div>

        </div>

    )
}

export default EditProfile
