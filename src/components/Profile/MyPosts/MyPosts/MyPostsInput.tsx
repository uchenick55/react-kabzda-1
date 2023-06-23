import React, {useState} from "react";
import {InputGroup, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";

type MyPostsInputType = {
    addPost: any
}
const MyPostsInput:React.FC<MyPostsInputType> = ({addPost}) => {
    const [inputOnChange, setInputOnchange] = useState<string>("")
    return <div>
        <InputGroup>
            <Form.Control
                value={inputOnChange}
                onChange={(e)=>setInputOnchange(e.target.value)}
                placeholder={"введите сообщение..."}
            />
            <Button
                disabled={!inputOnChange}
                onClick={()=>{
                    inputOnChange && addPost(inputOnChange)
                    setInputOnchange("")
                }}
            > {/*кнопка отправить форму*/}
                Submit
            </Button>
            <Button
                disabled={!inputOnChange}
                variant="warning"
                type='button'
                onClick={()=>setInputOnchange("")}

            >Reset
            </Button>
        </InputGroup>
    </div>
}
export default MyPostsInput
