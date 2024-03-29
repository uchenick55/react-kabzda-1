import {useFormikContext} from "formik";
import React from "react";

type DisplayFormikStateType = {}

const DisplayFormikState: React.FC<DisplayFormikStateType> = () => { // отображение всех пропсов формика
    const formikState = useFormikContext(); // берем все пропсы из контекста
    return <div style={{margin: '1rem 0'}}>  {/*вывод пропсов (стейта) формика*/}

        <h3 style={{fontFamily: 'monospace'}}/>
        <pre // вывести в таком виде, как представлено в оригинале
            style={{
                fontSize: '.65rem',
                padding: '.5rem',
            }}
        >
            <strong>props</strong> ={' '}
            {JSON.stringify({formikState}, null, 4)}
        </pre>

    </div>;
}
export default DisplayFormikState
