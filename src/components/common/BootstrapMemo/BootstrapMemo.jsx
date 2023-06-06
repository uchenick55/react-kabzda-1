import {memo} from "react";

import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import {Form} from "formik"; //формик с компонентами и пользовательским хуком
import {MyTextInput} from "../../common/formikCommon/MyFieldsBS"

export const ButtonMemo = memo(Button)
export const ImageMemo = memo(Image)
export const MyTextInputMemo = memo(MyTextInput)

