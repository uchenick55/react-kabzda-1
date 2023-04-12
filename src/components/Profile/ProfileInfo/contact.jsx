import React from "react";

const contact = (key1, profile) => { /*простая функция вывода отдельного элемента contacts из profile*/
    return <div>
        <b>{key1}: </b>{profile.contacts[key1]}
    </div>
}
export default contact
