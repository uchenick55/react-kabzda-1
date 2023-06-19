import React from "react";
import classes from "./Tasks.module.css"
import commonClasses from "../common/CommonClasses/common.module.css";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import {useSelector} from "react-redux";
import {tasksDataType} from "../common/types/commonTypes";
import {GlobalStateType} from "../../redux/store-redux";
import Accordion from "react-bootstrap/Accordion";

type TasksCommon2Type = {
    TaskHeader: JSX.Element | string, // заголовок задачи
    imgSrc: string, // источник картинки
    taskLink: string, // ссылка на задачу
    altTitle: string, // альтернатива картинке
    description: JSX.Element[], // описание задачи
    repositoryHref: string // ссылка на репозиторий
    usedTech: string // список использованных технологий
}
const TasksCommon2: React.FC<TasksCommon2Type> = (
    {TaskHeader, imgSrc, altTitle, description, repositoryHref, taskLink, usedTech}) => {
    return <div>
        <h4 className={'mt-5'}>{TaskHeader}</h4>
        <div><a href={taskLink}>
            <Image fluid={true} className={classes.imgTasks} src={imgSrc}
                   alt={altTitle} title={altTitle}
            /></a>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Задание для работы</Accordion.Header>
                    <Accordion.Body>

                        {description.map( (d, index) => {
                                return <div key={index}>{d}</div>
                            }
                        )}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
        <div className="mx-3">
            <h5>Использованные технологии:</h5>
            <div>{usedTech}</div>
            <div><a href={taskLink}>Ссылка на работу</a></div>
            <div><a href={repositoryHref}>Репозиторий</a></div>
        </div>
    </div>
}

const Tasks: React.FC = () => {
    // получаем данные из стейта вместо mapStateToProps
    const tasksData1: Array<tasksDataType> = useSelector((state: GlobalStateType) => state.tasks.tasksData)

    const tasksRender = <div>
        <Container className={classes.TasksContainer}>
            <h3 className={commonClasses.pageHeader}>Tasks</h3>
            <p>Здесь собраны небольшие работы, не касающиеся социальной сети</p>

            {tasksData1.map( (t, index) => { // проходим каждый элемент в исходном массиве
                return <TasksCommon2
                    key={index} TaskHeader={t.TaskHeader} imgSrc={t.imgSrc} altTitle={t.altTitle}
                    description={t.description} repositoryHref={t.repositoryHref} taskLink={t.taskLink}
                    usedTech={t.usedTech}
                />
            } )}
        </Container>
    </div>
    return <div>
        {tasksRender} {/*отрисовка FriendList*/}
    </div>
}

export default Tasks

