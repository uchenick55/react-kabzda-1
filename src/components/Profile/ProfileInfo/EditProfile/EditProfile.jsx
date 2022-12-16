import React from "react"; // импорт реакта
import {Field, reduxForm, reset} from "redux-form";// reduxForm для ввода новых постов
import classes from './EditProfile.module.css'
import styles from './../../../common/Validation/customFields.module.css'
import {Input} from "../../../common/Validation/customFields";
import {email, Required} from "../../../common/Validation/validationField";

const ProfileForm = ({handleSubmit, error}) => { // компонента формы
    return (
        <form onSubmit={handleSubmit}/*привязка сабмита формы к внутренней функции reduxForm - handleSubmit*/>
{/*
            FullName: "myFullName1",//required(string)
            AboutMe: "Обо Мне AboutMe222нннннннннннннннннн",
            LookingForAJob: false, //lookingForAJob: required(boolean)
            LookingForAJobDescription: "myLookingForAJobDescription", //  lookingForAJobDescription: required(string)
            contacts: {
            github: "https://github.com/uchenick55/react-kabzda-1", //  required(string)
            vk: "https://vk.com/vk", // required(string)
            facebook: "https://ru.wikipedia.org/wiki/Facebook", // required(string)
            instagram: "https://github.com/instagram", //required(string),
            twitter: "https://vk.com/twitter", //required(string),
            website: "https://ru.wikipedia.org", //required(string),
            youtube: "https://github.com/Alexrus-cyber", //required(string),
            mainLink: "https://github.com/Alexrus-cyber" //required(string)
*/}

            <div>
                <div>
                    <Field
                        name="FullName"// имя поля формы и возвращаемого свойства объекта после сабмита формы
                        component={Input}// компонент - кастомная строка с валидацией
                        placeholder="FullName"// текст подсказка при пустом поле
                        validate={[Required]}
                    />
                </div>
                <div>
                    <Field
                        name="AboutMe"// имя поля формы и возвращаемого свойства объекта после сабмита формы
                        component={Input}// компонент - кастомная строка с валидацией
                        placeholder="AboutMe"// текст подсказка при пустом поле
                        validate={[Required]}
                    />
                </div>
                <div>
                    <label>LookingForAJob:</label>
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
                        placeholder="LookingForAJobDescription"// текст подсказка при пустом поле
                        validate={[Required]}
                    />
                </div>
                <div>
                    <button type="submit">Submit</button>
                    {/*кнопка*/}
                </div>
                <div className={styles.commonError}>
                    {/*стилизация красным сообщение об общей ошибке с сервера при ошибках ввода*/}
                    {error} {/*вывод сообщения ошибки после диспатча stopSubmit из auth-reducer.jsx */}
                </div>
            </div>
        </form>
    )
}

// оберточная компонента формы, задает имя подстейта "EditProfileForm"
let EditProfileReduxForm = reduxForm({form: 'EditProfileForm'})(ProfileForm)

let EditProfile = ({putProfile, dispatch}) => {
    let onSubmit = (formData) => { // функция реакции на сабмит формы с данными от формы formData
        dispatch(reset('EditProfileForm'))
        const LookingForAJob = !formData.LookingForAJob ? false : formData.LookingForAJob // если галочка LookingForAJob не стоит, то false
        putProfile(
            formData.FullName,
            formData.AboutMe,
            LookingForAJob,
            formData.LookingForAJobDescription
        )//вызов putMyProfileThunkCreator выше из ProfileContainer
    }
    return (
        <div className={classes.EditProfileCommon}/*стиль*/ >
            <h3>Отредактируйте профиль</h3>{/*h3 заголовок*/}
            <div className={classes.EditProfile}>
                <div><EditProfileReduxForm
                    onSubmit={onSubmit}/>{/*вызов формы логина с отсылкой на локальный обработчик сабмита*/}
                </div>
            </div>

        </div>

    )
}

export default EditProfile
