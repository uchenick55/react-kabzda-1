import React, {ChangeEvent, memo} from "react";
import Stack from "react-bootstrap/Stack";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import InputGroup from 'react-bootstrap/InputGroup'
import Image from "react-bootstrap/Image";
import favImage from "../../assets/images/swg/star+.svg"
import classes from './Users.module.css'
import {useDispatch} from "react-redux";

type InputButtonUsersRenderType = {
    onChangeTerm:string,
    onlyFriends: boolean, // селектор получить только моих рузей
    onChangeTermFunction:(event: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) =>void,
    SetTermFunction:()=>void,
    handleClick:(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    setOnlyFriends:(onlyFriends: boolean)=>void,
}
const InputButtonUsersRender:React.FC<InputButtonUsersRenderType> = memo( ({onChangeTerm, onChangeTermFunction, SetTermFunction, handleClick, setOnlyFriends, onlyFriends}) => {
    console.log("InputButtonUsersRender")
    const dispatch = useDispatch()
    const InputGroupMemo = memo(InputGroup)
    const ButtonMemo = memo(Button)
    return <div>
        <Form>
            <Stack direction="horizontal" gap={3} className="mx-1">
                <InputGroupMemo>
                    <InputGroup.Text><Image fluid={true} src={favImage} className={classes.favImage}/></InputGroup.Text>
                    <InputGroup.Checkbox
                        checked={onlyFriends}
                        onChange={(event:MouseEvent)=>{
                            // @ts-ignore
                            event && event.target && dispatch( setOnlyFriends(event.target.checked))}}
                    />

                    <Form.Control
                        type="text"
                        value={onChangeTerm}// значение поля поиска захардкодили
                        onChange={(event) => {// по изменению поля получить значение
                            onChangeTermFunction(event)
                        }}
                        //onBlur={SetTermFunction}// задать в локальный стейт значение поиска при потере фокуса
                        placeholder={"find users..."} // пояснение поля ввода
                        autoFocus
                    /> {/*сразу фокусировка на поле ввода */}
                </InputGroupMemo>

                <div className="vr"/> {/*разделитель поля поиска и кнопки поиска*/}
                <ButtonMemo
                    onClick={handleClick} type="submit">Find</ButtonMemo>
                {/* кнопка с обработчиком клика. type="submit" дает нажатие на Enter*/}
            </Stack>
        </Form>
    </div>
})
export default InputButtonUsersRender
