import React from "react";

type ContactType = {
    key1:string,
    Value:string
}
const Contact:React.FC<ContactType> = ({key1, Value}) => { /*простая функция вывода отдельного элемента contacts из profile*/
    return <div>
        <b>{key1}: </b > {Value}
    </div>
}
export default Contact
