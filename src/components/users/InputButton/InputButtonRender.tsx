import React, {memo} from "react";
import Stack from "react-bootstrap/Stack";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import InputGroup from 'react-bootstrap/InputGroup'
import Image from "react-bootstrap/Image";
import favImage from "../../../assets/images/swg/star+.svg"
import classes from '../Users.module.css'
import {useDispatch} from "react-redux";

type InputButtonUsersRenderType = {
    onChangeTerm:string,
    onlyFriends: boolean, // селектор получить только моих рузей
    setOnChangeTerm:(term: string) =>void,
    SetTermFunction:()=>void,
    setOnlyFriends:(onlyFriends: boolean)=>void,
}
const InputButtonUsersRender:React.FC<InputButtonUsersRenderType> =
    ({onChangeTerm, setOnlyFriends, onlyFriends, SetTermFunction, setOnChangeTerm}) => {
    console.log("InputButtonUsersRender")
    const dispatch = useDispatch()
    const InputGroupMemo = memo(InputGroup)
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
                            setOnChangeTerm(event.currentTarget.value)
                        }}
                        placeholder={"find users..."} // пояснение поля ввода
                        autoFocus
                    /> {/*сразу фокусировка на поле ввода */}
                </InputGroupMemo>

                <div className="vr"/> {/*разделитель поля поиска и кнопки поиска*/}
                <Button
                    onClick={SetTermFunction} type="submit">Find</Button>
                {/* кнопка с обработчиком клика. type="submit" дает нажатие на Enter*/}
            </Stack>
        </Form>
    </div>
}
export default InputButtonUsersRender
