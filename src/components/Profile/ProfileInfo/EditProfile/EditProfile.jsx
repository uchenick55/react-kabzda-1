import React from "react"; // импорт реакта
import {Field, reduxForm, reset} from "redux-form";// reduxForm для ввода новых постов
import classes from './EditProfile.module.css'
import styles from './../../../common/Validation/customFields.module.css'
import {Input, CreateField} from "../../../common/Validation/customFields";
import {email, Required} from "../../../common/Validation/validationField";

const ProfileForm = ({error, handleSubmit, load, pristine, reset, submitting}) => { // компонента формы
    return (
        <form onSubmit={handleSubmit}/*привязка сабмита формы к внутренней функции reduxForm - handleSubmit*/>
            <span>
                <div>
                    {CreateField("FullName", Input, "Полное имя1", [] )} {/*name, component, placeholder, validate*/}
                </div>
                <div>
                    {CreateField("AboutMe", Input, "Обо мне1", [] )} {/*name, component, placeholder, validate*/}
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
                    {CreateField("LookingForAJobDescription", Input, "Описание поиска работы1", [] )} {/*name, component, placeholder, validate*/}
                </div>
                <label>Контакты</label>
                <div className={classes.EditProfileContactsFields}>
                    <div>
                        {CreateField("github", Input, "github1", [] )} {/*name, component, placeholder, validate*/}
                    </div>
                    <div>
                        {CreateField("vk", Input, "vk1", [] )} {/*name, component, placeholder, validate*/}
                    </div>
                    <div>
                        {CreateField("facebook", Input, "facebook1", [] )} {/*name, component, placeholder, validate*/}
                    </div>
                    <div>
                        {CreateField("instagram", Input, "instagram1", [] )} {/*name, component, placeholder, validate*/}
                    </div>
                    <div>
                        {CreateField("twitter", Input, "twitter1", [] )} {/*name, component, placeholder, validate*/}
                    </div>
                    <div>
                        {CreateField("website", Input, "website1", [] )} {/*name, component, placeholder, validate*/}
                    </div>
                    <div>
                        {CreateField("youtube", Input, "youtube1", [] )} {/*name, component, placeholder, validate*/}
                    </div>
                    <div>
                        {CreateField("mainLink", Input, "mainLink1", [] )} {/*name, component, placeholder, validate*/}
                    </div>
                </div>
                <button type="button" onClick={reset}> Сброс полей формы </button>

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
    let resetFormFields = () => { // альтернативный вариант сброса формы, можно подключить к сабмиту
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
                </div>
            </div>

        </div>

    )
}

export default EditProfile
