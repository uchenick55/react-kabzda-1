import React, {useState} from "react";
import classes from "./dialog2Render.module.css"
import MagnifyingGlass from "../../../assets/images/swg/magnifying-glass.svg"

type Dialog2SearchRender = {
    SearchValue: string // поисковый запрос в списке диалогов
    setSearchValue: (SearchValue:string)=>void // функция обновления локального стейта поиска в списке диалогов
}
const Dialog2SearchRender: React.FC<Dialog2SearchRender> = ({SearchValue, setSearchValue})=>{
    return <div>
        <input
            placeholder={"Поиск"}
            value={SearchValue}
            onChange={(event => setSearchValue(event.target.value))}
            type="text"
            className={classes.Dialog2SearchInput} />
        <img src={MagnifyingGlass} className={classes.MagnifyingGlass} alt="Поиск"/>
    </div>
}
export default Dialog2SearchRender
