import React from "react";
import classes from "./Tasks.module.css"
import commonClasses from "../common/CommonClasses/common.module.css";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import {connect} from "react-redux";
import {tasksDataType} from "../../types/commonTypes";
import {GlobalStateType} from "../../redux/store-redux";

type TasksCommon = {
    TaskHeader: JSX.Element | string, // заголовок задачи
    imgSrc: string, // источник картинки
    taskLink: string, // ссылка на задачу
    altTitle: string, // альтернатива картинке
    description: JSX.Element[], // описание задачи
    repositoryHref: string // ссылка на репозиторий

}
const TasksCommon: React.FC<TasksCommon> = ({TaskHeader, imgSrc, altTitle, description, repositoryHref, taskLink}) => {
    return <div>
        <h4 className={'mt-5'}>{TaskHeader}</h4>
        <div><a href={taskLink}>
            <Image fluid={true} className={classes.imgTasks} src={imgSrc}
                   alt={altTitle} title={altTitle}
            /></a>
            {description.map((d, index) => {
                    return <div key={index}>{d}</div>
                }
            )}
        </div>
        <a href={repositoryHref}>Репозиторий</a>
    </div>
}

type TasksType = {
    tasksData: Array<tasksDataType>
}
let Tasks: React.FC<TasksType> = ({tasksData}) => {
    let tasksRender = <div>
        <Container className={classes.TasksContainer}>
            <h3 className={commonClasses.pageHeader}>Tasks</h3>
            <p>Здесь собраны небольшие работы, не касающиеся социальной сети</p>

            {tasksData.map((t, index) => { // проходим каждый элемент в исходном массиве
                return <TasksCommon
                    key={index} TaskHeader={t.TaskHeader} imgSrc={t.imgSrc} altTitle={t.altTitle}
                    description={t.description} repositoryHref={t.repositoryHref} taskLink={t.taskLink}
                />
            })}
        </Container>
    </div>
    return <div>
        {tasksRender} {/*отрисовка FriendList*/}
    </div>
}

const mapStateToProps = (state:GlobalStateType) => {
    return {
        tasksData: state.tasks.tasksData
    }
}
export default connect(mapStateToProps, null)(Tasks)

