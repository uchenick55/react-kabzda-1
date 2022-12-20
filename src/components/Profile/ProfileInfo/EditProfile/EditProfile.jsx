import React, {useEffect} from "react"; // импорт реакта
import {Field, initialize, reduxForm, reset} from "redux-form";// reduxForm для ввода новых постов
import classes from './EditProfile.module.css'
import styles from './../../../common/Validation/customFields.module.css'
import {Input, CreateField} from "../../../common/Validation/customFields";
import {email, Required} from "../../../common/Validation/validationField";

const ProfileForm = ({setEditMode, error, handleSubmit, load, pristine, reset, submitting, profile}) => { // компонента формы
    let ContactCreateField = (key1) => {
        return <div>
            {CreateField(key1, Input, key1, [] )} {/*name, component, placeholder, validate*/}
        </div>
    }
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
                        {Object.keys(profile.contacts).map((key1, index)=>{
                            return <span key={index}>{ContactCreateField(key1)}</span>
                        })}
                    </div>
                </div>
                <button type="button" onClick={reset}> Сброс </button>

                <span>
                    <button type="submit">Применить</button>
                    {/*кнопка*/}
                </span>
                <span>
                    <button type="button" onClick={()=>{setEditMode(false)}}>Отмена</button>
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

let EditProfile = ({putProfile, dispatch, setEditMode, profile, userId, myId}) => {
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

    let initialProfile = {
        FullName: profile.fullName,
        AboutMe: profile.aboutMe,
        LookingForAJob: profile.lookingForAJob,
        LookingForAJobDescription: profile.lookingForAJobDescription,
        github: profile.contacts.github,
        vk: profile.contacts.vk,
        facebook: profile.contacts.facebook,
        instagram: profile.contacts.instagram,
        twitter: profile.contacts.twitter,
        website: profile.contacts.website,
        youtube: profile.contacts.youtube,
        mainLink: profile.contacts.mainLink,
    }

    useEffect(()=>{
        dispatch(initialize("EditProfileForm", initialProfile)); // подгрузка значений формы по умолчанию
        if (userId !== 0) {setEditMode(false)} // если при правке формы переключаемся на другого пользователя, отключаем editMode
    })
    return (
        <div>
            <div className={classes.HeaderEditProfileForm}>Отредактируйте профиль</div>
            {/*h3 заголовок*/}
            <div>(можно отдельные поля)</div>
            <div className={classes.EditProfile}>
                <div>
                    <EditProfileReduxForm
                        onSubmit={onSubmit}
                        setEditMode = {setEditMode}
                        profile = {profile}
                    />{/*вызов формы логина с отсылкой на локальный обработчик сабмита*/}
                </div>
            </div>
        </div>

    )
}

export default EditProfile
