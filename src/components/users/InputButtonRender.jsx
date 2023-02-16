import React from "react";
import Stack from "react-bootstrap/Stack";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import classes from "./Users.module.css"
import InputGroup from 'react-bootstrap/InputGroup'

const InputButtonUsersRender = ({onChangeTerm, onChangeTermFunction, SetTermFunction, handleClick, setOnlyFriends}) => {
    return <div>
        <Form>
            <Stack direction="horizontal" gap={3} className="mx-1">
                <InputGroup>
                    <InputGroup.Text>Only favorite:</InputGroup.Text>
                    <InputGroup.Checkbox onClick={(event)=>{setOnlyFriends(event.currentTarget.checked)}} />

                    <Form.Control
                        type="text"
                        value={onChangeTerm}// значение поля поиска захардкодили
                        onChange={(event) => {// по изменению поля получить значение
                            onChangeTermFunction(event)
                        }}
                        onBlur={SetTermFunction}// задать в локальный стейт значение поиска при потере фокуса
                        placeholder={"find users..."} // пояснение поля ввода
                        autoFocus
                    /> {/*сразу фокусировка на поле ввода */}
                </InputGroup>

                <div className="vr"/> {/*разделитель поля поиска и кнопки поиска*/}
                <Button onClick={handleClick} type="submit">Find</Button>
                {/* кнопка с обработчиком клика. type="submit" дает нажатие на Enter*/}
            </Stack>
        </Form>
    </div>
}
export default InputButtonUsersRender
